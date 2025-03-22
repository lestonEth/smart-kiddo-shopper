
import { toast } from '@/components/ui/use-toast';

// Initialize speech recognition
export const initSpeechRecognition = (): SpeechRecognition | null => {
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    
    return recognition;
  } else {
    toast({
      title: "Speech Recognition Not Supported",
      description: "Your browser doesn't support speech recognition. Please try using Chrome.",
      variant: "destructive",
    });
    return null;
  }
};

// Start listening for speech
export const startListening = (
  recognition: SpeechRecognition | null,
  onResult: (transcript: string) => void,
  onEnd?: () => void
): boolean => {
  if (!recognition) return false;
  
  recognition.onresult = (event) => {
    const transcript = Array.from(event.results)
      .map(result => result[0])
      .map(result => result.transcript)
      .join('');
    
    onResult(transcript);
  };
  
  if (onEnd) {
    recognition.onend = onEnd;
  }
  
  try {
    recognition.start();
    return true;
  } catch (error) {
    console.error('Error starting speech recognition:', error);
    return false;
  }
};

// Stop listening for speech
export const stopListening = (recognition: SpeechRecognition | null): boolean => {
  if (!recognition) return false;
  
  try {
    recognition.stop();
    return true;
  } catch (error) {
    console.error('Error stopping speech recognition:', error);
    return false;
  }
};
