// @/services/speechService.ts
// Enhanced speech recognition service with continuous listening capabilities

// Type definition for the speech recognition callback
type SpeechRecognitionCallback = (transcript: string) => void;

/**
 * Initialize a new speech recognition instance
 */
export const initSpeechRecognition = (): SpeechRecognition | null => {
  // Check browser compatibility
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (!SpeechRecognition) {
    console.error("Speech recognition not supported in this browser");
    return null;
  }
  
  const recognition = new SpeechRecognition();
  
  // Configure speech recognition settings
  recognition.continuous = true;      // Keep listening even after results
  recognition.interimResults = true;  // Get results while still speaking
  recognition.lang = 'en-US';         // Set language
  
  return recognition;
};

/**
 * Start listening with a speech recognition instance
 * @param recognition - The SpeechRecognition instance
 * @param onTranscriptUpdate - Callback to handle updated transcript
 * @param onRecognitionEnd - Callback when recognition ends
 * @returns boolean indicating if listening started successfully
 */
export const startListening = (
  recognition: SpeechRecognition | null,
  onTranscriptUpdate: SpeechRecognitionCallback,
  onRecognitionEnd: () => void
): boolean => {
  if (!recognition) {
    console.error("No speech recognition instance provided");
    return false;
  }
  
  try {
    // Clear any previous event handlers
    recognition.onresult = null;
    recognition.onend = null;
    recognition.onerror = null;
    
    // Set up event handlers
    recognition.onresult = (event) => {
      let transcript = '';
      // Combine all results into a single transcript
      for (let i = 0; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          transcript += event.results[i][0].transcript + ' ';
        }
      }
      onTranscriptUpdate(transcript.trim());
    };
    
    recognition.onend = () => {
      console.log("Speech recognition ended");
      onRecognitionEnd();
      
      // Auto-restart for continuous background listening
      // We'll add a brief timeout to prevent excessive CPU usage
      setTimeout(() => {
        if (recognition && !recognition.recognizing) {
          try {
            recognition.start();
          } catch (e) {
            console.log("Auto-restart failed, recognition already running");
          }
        }
      }, 300);
    };
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      
      // Don't trigger end callback for no-speech error
      if (event.error !== 'no-speech') {
        onRecognitionEnd();
      }
    };
    
    // Start listening
    recognition.start();
    recognition.recognizing = true;
    
    return true;
  } catch (error) {
    console.error("Error starting speech recognition:", error);
    return false;
  }
};

/**
 * Stop listening with a speech recognition instance
 * @param recognition - The SpeechRecognition instance to stop
 */
export const stopListening = (recognition: SpeechRecognition | null): void => {
  if (!recognition) return;
  
  try {
    recognition.stop();
    recognition.recognizing = false;
  } catch (error) {
    console.error("Error stopping speech recognition:", error);
  }
};

/**
 * Create and initialize a continuous background listener specifically for wake word detection
 * @param wakeWords - Array of wake words to listen for
 * @param onWakeWordDetected - Callback when wake word is detected
 * @returns The SpeechRecognition instance
 */
export const createWakeWordListener = (
  wakeWords: string[],
  onWakeWordDetected: (detectedPhrase: string) => void
): SpeechRecognition | null => {
  const recognition = initSpeechRecognition();
  
  if (!recognition) return null;
  
  // Lower restart threshold for wake word detection
  recognition.continuous = true;
  
  // Handle results to detect wake words
  recognition.onresult = (event) => {
    let transcript = '';
    
    // Get the latest result
    if (event.results.length > 0) {
      const latestResult = event.results[event.results.length - 1];
      if (latestResult.isFinal) {
        transcript = latestResult[0].transcript.toLowerCase().trim();
        
        // Check if transcript contains any wake words
        const detectedWakeWord = wakeWords.find(word => 
          transcript.includes(word.toLowerCase())
        );
        
        if (detectedWakeWord) {
          onWakeWordDetected(transcript);
        }
      }
    }
  };
  
  // Auto-restart on end for continuous wake word detection
  recognition.onend = () => {
    console.log("Wake word listener ended, restarting...");
    setTimeout(() => {
      try {
        recognition.start();
      } catch (e) {
        console.error("Failed to restart wake word listener");
      }
    }, 300);
  };
  
  // Handle errors without stopping
  recognition.onerror = (event) => {
    console.error("Wake word listener error:", event.error);
    // Don't stop for no-speech errors
  };
  
  // Start listening immediately
  try {
    recognition.start();
    return recognition;
  } catch (error) {
    console.error("Failed to start wake word listener:", error);
    return null;
  }
};

// Add to window to ensure proper type recognition
declare global {
  interface Window {
    SpeechRecognition?: typeof window.SpeechRecognition;
    webkitSpeechRecognition?: typeof window.SpeechRecognition;
  }
  
  interface SpeechRecognition {
    recognizing?: boolean;
  }
}