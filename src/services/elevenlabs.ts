
import { toast } from '@/components/ui/use-toast';

// This key should be stored securely - in production you'd use Supabase/environment variables
let ELEVENLABS_API_KEY = '';

const API_URL = 'https://api.elevenlabs.io/v1';

// Set the API key - called from your login/initialization code
export const setElevenLabsApiKey = (apiKey: string) => {
  ELEVENLABS_API_KEY = apiKey;
  localStorage.setItem('elevenlabs_api_key', apiKey);
};

// Get saved API key from localStorage
export const getElevenLabsApiKey = (): string => {
  if (!ELEVENLABS_API_KEY) {
    ELEVENLABS_API_KEY = localStorage.getItem('elevenlabs_api_key') || '';
  }
  return ELEVENLABS_API_KEY;
};

// Check if API key is set
export const hasApiKey = (): boolean => {
  return !!getElevenLabsApiKey();
};

// Text to speech conversion
export const textToSpeech = async (
  text: string, 
  voiceId: string = 'EXAVITQu4vr4xnSDxMaL', // Sarah's voice ID by default
  modelId: string = 'eleven_turbo_v2'
): Promise<ArrayBuffer | null> => {
  if (!hasApiKey()) {
    toast({
      title: "API Key Required",
      description: "Please set your ElevenLabs API key in settings to use voice features.",
      variant: "destructive",
    });
    return null;
  }

  try {
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
        }
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.detail?.message || 'Failed to convert text to speech');
    }

    return await response.arrayBuffer();
  } catch (error) {
    console.error('ElevenLabs API error:', error);
    toast({
      title: "Voice Synthesis Failed",
      description: error instanceof Error ? error.message : "Failed to generate voice response",
      variant: "destructive",
    });
    return null;
  }
};

// Play audio from ArrayBuffer
export const playAudio = async (audioData: ArrayBuffer): Promise<void> => {
  const audioContext = new AudioContext();
  const audioBuffer = await audioContext.decodeAudioData(audioData);
  
  const source = audioContext.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioContext.destination);
  source.start(0);
  
  return new Promise((resolve) => {
    source.onended = () => resolve();
  });
};

// Speak text using ElevenLabs
export const speakText = async (
  text: string, 
  voiceId?: string,
  modelId?: string
): Promise<boolean> => {
  try {
    const audioData = await textToSpeech(text, voiceId, modelId);
    if (!audioData) return false;
    
    await playAudio(audioData);
    return true;
  } catch (error) {
    console.error('Error in speak text:', error);
    return false;
  }
};
