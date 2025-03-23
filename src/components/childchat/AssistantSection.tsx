// @/components/childchat/AssistantSection.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedAssistant from '@/components/landingApp/AnimatedAssistant';
import { Message } from '@/types/types';

// Define emotion types
export type EmotionType = 'neutral' | 'happy' | 'excited' | 'sad' | 'thinking' | 'surprised' | 'laughing';

// Enhanced character variants with emotions - fixed animation issues
const characterVariants = {
  idle: {
    y: [0, -5, 0],
    transition: {
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  talking: {
    scale: [1, 1.02, 1],
    transition: {
      scale: {
        duration: 0.3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  listening: {
    rotate: [-1, 1, -1],
    transition: {
      rotate: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  happy: {
    y: [0, -8, 0],
    scale: [1, 1.05, 1],
    transition: {
      y: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      scale: {
        duration: 0.8,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  excited: {
    y: [0, -12, 0],
    scale: [1, 1.1, 1],
    rotate: [-2, 2, -2],
    transition: {
      y: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      scale: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      rotate: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  sad: {
    y: [0, -2, 0],
    scale: [1, 0.97, 1],
    rotate: [0, -1, 0],
    transition: {
      y: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      scale: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      rotate: {
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  thinking: {
    rotate: [0, 3, 0],
    y: [0, -3, 0],
    transition: {
      rotate: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      y: {
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  surprised: {
    scale: [1, 1.15, 1],
    transition: {
      scale: {
        duration: 0.5,
        repeat: 1,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  },
  laughing: {
    rotate: [-2, 2, -2],
    y: [0, -5, 0],
    scale: [1, 1.08, 1],
    transition: {
      rotate: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      y: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      },
      scale: {
        duration: 0.4,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }
    }
  }
};

// Emotion styles for the assistant
const emotionStyles = {
  neutral: {
    filter: "brightness(1)",
    backgroundColor: "transparent"
  },
  happy: {
    filter: "brightness(1.1)",
    backgroundColor: "rgba(255, 255, 150, 0.2)"
  },
  excited: {
    filter: "brightness(1.2) saturate(1.2)",
    backgroundColor: "rgba(255, 200, 100, 0.25)"
  },
  sad: {
    filter: "brightness(0.9) saturate(0.9)",
    backgroundColor: "rgba(100, 150, 255, 0.15)"
  },
  thinking: {
    filter: "brightness(1) saturate(0.95)",
    backgroundColor: "rgba(200, 200, 255, 0.2)"
  },
  surprised: {
    filter: "brightness(1.1) saturate(1.1)",
    backgroundColor: "rgba(255, 150, 255, 0.2)"
  },
  laughing: {
    filter: "brightness(1.15) saturate(1.1)",
    backgroundColor: "rgba(255, 220, 100, 0.25)"
  }
};

// Emotion detection based on message text
const detectEmotion = (text: string): EmotionType => {
  const lowerText = text.toLowerCase();
  
  if (/\b(haha|lol|funny|laugh|joke|😂|🤣)\b/.test(lowerText)) {
    return 'laughing';
  }
  if (/\b(wow|amazing|awesome|cool|whoa|great|incredible)\b/.test(lowerText) || lowerText.includes('!')) {
    return 'excited';
  }
  if (/\b(sorry|unfortunately|sad|disappointed|can't help)\b/.test(lowerText)) {
    return 'sad';
  }
  if (/\b(hmm|let me think|thinking|let's see)\b/.test(lowerText) || lowerText.includes('?')) {
    return 'thinking';
  }
  if (/\b(happy|glad|pleased|enjoy|wonderful)\b/.test(lowerText)) {
    return 'happy';
  }
  if (/\b(oh|what|really|surprise|unexpected)\b/.test(lowerText) && lowerText.includes('!')) {
    return 'surprised';
  }
  
  return 'neutral';
};

// Speech bubble variations based on emotion
const speechBubbleVariants = {
  happy: { backgroundColor: "#F9F5FF", borderColor: "#D8B4FE" },
  excited: { backgroundColor: "#FEF9C3", borderColor: "#FDE68A" },
  sad: { backgroundColor: "#EFF6FF", borderColor: "#BFDBFE" },
  thinking: { backgroundColor: "#F3F4F6", borderColor: "#E5E7EB" },
  surprised: { backgroundColor: "#FCE7F3", borderColor: "#FBCFE8" },
  laughing: { backgroundColor: "#ECFDF5", borderColor: "#A7F3D0" },
  neutral: { backgroundColor: "#FFFFFF", borderColor: "#E5E7EB" },
};

interface AssistantSectionProps {
    isAnimating: boolean;
    isListening: boolean;
    lastMessage: Message | null;
}

const AssistantSection: React.FC<AssistantSectionProps> = ({ isAnimating, isListening, lastMessage }) => {
    const [currentEmotion, setCurrentEmotion] = useState<EmotionType>('neutral');
    const [emotionTimeoutId, setEmotionTimeoutId] = useState<NodeJS.Timeout | null>(null);
    const [isInitialRender, setIsInitialRender] = useState(true);
    
    // Set an initial state and then allow animations to trigger
    useEffect(() => {
        if (isInitialRender) {
            setTimeout(() => setIsInitialRender(false), 100);
        }
    }, [isInitialRender]);
    
    // Detect emotion from message text
    useEffect(() => {
        if (lastMessage && lastMessage.text) {
            const emotion = detectEmotion(lastMessage.text);
            setCurrentEmotion(emotion);
            
            // Reset emotion to neutral after a delay
            if (emotionTimeoutId) {
                clearTimeout(emotionTimeoutId);
            }
            
            const timeoutId = setTimeout(() => {
                setCurrentEmotion('neutral');
            }, 4000);
            
            setEmotionTimeoutId(timeoutId);
        }
        
        return () => {
            if (emotionTimeoutId) {
                clearTimeout(emotionTimeoutId);
            }
        };
    }, [lastMessage]);
    
    // Determine the animation state
    const getAnimationState = () => {
        if (isInitialRender) return 'idle';
        if (isAnimating) return 'talking';
        if (isListening) return 'listening';
        return currentEmotion === 'neutral' ? 'idle' : currentEmotion;
    };

    // Dynamic styles based on emotion
    const dynamicStyles = emotionStyles[currentEmotion];
    const speechBubbleStyle = speechBubbleVariants[currentEmotion];
    
    return (
        <motion.div 
            className="bg-gradient-to-br from-purple-300 to-indigo-200 rounded-3xl p-6 mb-4 flex justify-center items-center shadow-xl border-4 border-purple-400 h-80 overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <motion.div
                className="w-64 h-64 relative"
                key={getAnimationState()} // Add key to force re-render when animation state changes
                variants={characterVariants}
                animate={getAnimationState()}
                initial={false}
            >
                <motion.div
                    className="rounded-full absolute inset-0 z-0 transition-colors duration-500"
                    animate={{
                        backgroundColor: dynamicStyles.backgroundColor
                    }}
                    transition={{ duration: 0.5 }}
                />
                
                <motion.div
                    className="relative z-10"
                    animate={{
                        filter: dynamicStyles.filter
                    }}
                    transition={{ duration: 0.5 }}
                >
                    <AnimatedAssistant pulse={isAnimating} />
                </motion.div>
                
                {/* Emotion indicator */}
                <AnimatePresence mode="wait">
                    {currentEmotion !== 'neutral' && !isAnimating && (
                        <motion.div
                            className="absolute -top-2 -right-2 rounded-full px-2 py-1 text-xs font-bold z-30"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                backgroundColor: speechBubbleStyle.backgroundColor,
                                borderColor: speechBubbleStyle.borderColor,
                                borderWidth: 2
                            }}
                        >
                            {currentEmotion === 'happy' && '😊'}
                            {currentEmotion === 'excited' && '🤩'}
                            {currentEmotion === 'sad' && '😔'}
                            {currentEmotion === 'thinking' && '🤔'}
                            {currentEmotion === 'surprised' && '😲'}
                            {currentEmotion === 'laughing' && '😂'}
                        </motion.div>
                    )}
                </AnimatePresence>
                
                {/* Speech bubble when talking */}
                <AnimatePresence mode="wait">
                    {isAnimating && lastMessage && lastMessage.text && (
                        <motion.div
                            className="absolute right-0 top-0 rounded-2xl px-4 py-3 shadow-md max-w-xs border-2 z-20"
                            style={{
                                backgroundColor: speechBubbleStyle.backgroundColor,
                                borderColor: speechBubbleStyle.borderColor
                            }}
                            initial={{ opacity: 0, scale: 0, x: -20 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ type: "spring", damping: 20 }}
                        >
                            <div 
                                className="absolute left-0 bottom-4 w-4 h-4 transform rotate-45 -translate-x-2 z-20"
                                style={{ 
                                    backgroundColor: speechBubbleStyle.backgroundColor,
                                    borderLeft: `2px solid ${speechBubbleStyle.borderColor}`,
                                    borderBottom: `2px solid ${speechBubbleStyle.borderColor}`
                                }}
                            ></div>
                            <p className="text-purple-800 font-comic text-sm">
                                {lastMessage.text}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </motion.div>
    );
};

export default AssistantSection;