import { toast } from '@/components/ui/use-toast';

const API_KEY="tts-1d8d1f887432e8810fff6fc9781fa74d";   
// Use environment variable for default API key
const DEFAULT_API_KEY = import.meta.env.VITE_ELEVENLABS_API_KEY || 'sk_191b2e3c85d71f28fed9a5bfcf8db344fccf048d4f256b21';

const API_URL = import.meta.env.VITE_ELEVENLABS_API_URL || 'https://api.elevenlabs.io/v1';

// Consistent key for localStorage
const STORAGE_KEY = 'elevenlabs_api_key';

export const setElevenLabsApiKey = (apiKey: string) => {
  localStorage.setItem(STORAGE_KEY, apiKey);
};

export const getElevenLabsApiKey = (): string => {
  return localStorage.getItem(STORAGE_KEY) || DEFAULT_API_KEY;
};

export const hasApiKey = (): boolean => {
  return !!getElevenLabsApiKey();
};

export const textToSpeech = async (
  text: string,
  voiceId: string = 'EXAVITQu4vr4xnSDxMaL',
  modelId: string = 'eleven_multilingual_v2'
): Promise<ArrayBuffer | null> => {
  if (!hasApiKey()) {
    toast({
      title: "API Key Required",
      description: "Please set your ElevenLabs API key in settings.",
      variant: "destructive",
    });
    return null;
  }

  try {
    // Using the standard fetch approach since we're having issues with the SDK
    const response = await fetch(`${API_URL}/text-to-speech/${voiceId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': getElevenLabsApiKey(),
      },
      body: JSON.stringify({
        text,
        model_id: modelId,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.75,
        },
        output_format: "mp3_44100_128" // Add the output format parameter from the SDK approach
      }),
    });

    if (!response.ok) {
      let errorMessage = 'Failed to convert text to speech';
      try {
        const errorData = await response.json();
        errorMessage = errorData.detail?.message || errorMessage;
      } catch (_e) {}
      
      if (response.status === 401) {
        toast({
          title: "Authentication Failed",
          description: "Your ElevenLabs API key appears to be invalid. Please check your settings.",
          variant: "destructive",
        });
        setElevenLabsApiKey(''); // Clear invalid key
      }
      
      throw new Error(errorMessage);
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('ElevenLabs API error:', error);
    toast({
      title: "Voice Synthesis Failed",
      description: error instanceof Error ? error.message : "API request failed",
      variant: "destructive",
    });
    return null;
  }
};

export const playAudio = async (audioData: ArrayBuffer): Promise<void> => {
  try {
    // Browsers require user interaction to play audio
    const audioContext = new AudioContext();
    await audioContext.resume(); // Handle suspended state
    
    const audioBuffer = await audioContext.decodeAudioData(audioData);
    const source = audioContext.createBufferSource();
    source.buffer = audioBuffer;
    source.connect(audioContext.destination);
    
    return new Promise((resolve, reject) => {
      source.onended = () => {
        audioContext.close();
        resolve();
      };
      source.start(0);
    });
  } catch (error) {
    console.error('Audio playback error:', error);
    throw new Error('Failed to play audio');
  }
};

const getPreferredVoice = (): SpeechSynthesisVoice | undefined => {
  const voices = window.speechSynthesis.getVoices();
  
  // Prefer female voices across platforms
  const preferredNames = [
    'Microsoft Zira', // Windows
    'Microsoft Hazel', // Windows
    'Karen', // macOS
    'Samantha', // macOS
    'Google UK English Female', // Chrome
  ];

  return (
    voices.find(v => preferredNames.includes(v.name)) ||
    voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('female')) ||
    voices[0]
  );
};

export const useBrowserTTS = async (text: string): Promise<boolean> => {
  return new Promise((resolve) => {
    if (!window.speechSynthesis) {
      console.error('Browser TTS not supported');
      resolve(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    const handleVoices = () => {
      const voice = getPreferredVoice();
      if (voice) {
        utterance.voice = voice;
        window.speechSynthesis.speak(utterance);
      } else {
        resolve(false);
      }
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.addEventListener('voiceschanged', handleVoices, { once: true });
    } else {
      handleVoices();
    }

    utterance.onend = () => resolve(true);
    utterance.onerror = () => resolve(false);
  });
};

export const speakText = async (
  text: string,
  voiceId?: string,
  modelId?: string
): Promise<boolean> => {
  try {
    // Try ElevenLabs first
    const audioData = await textToSpeech(text, voiceId, modelId);
    if (audioData) {
      await playAudio(audioData);
      return true;
    }
  } catch (error) {
    console.error('ElevenLabs failed:', error);
  }

  // Fallback to browser TTS
  toast({
    title: "Using System Voice",
    description: "Falling back to browser text-to-speech",
  });
  
  try {
    return await useBrowserTTS(text);
  } catch (error) {
    console.error('Browser TTS failed:', error);
    toast({
      title: "Voice Synthesis Failed",
      description: "Both ElevenLabs and browser TTS failed",
      variant: "destructive",
    });
    return false;
  }
};