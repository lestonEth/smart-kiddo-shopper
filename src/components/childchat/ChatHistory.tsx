// @/components/childchat/ChatHistory.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Radio, Volume2 } from 'lucide-react';
import { Message } from '@/types/types';

interface ChatHistoryProps {
    messages: Message[];
    isListening: boolean;
    transcript: string;
    toggleListening: () => void;
    isBackgroundListening?: boolean;
    wakeWordDetected?: boolean;
}

const ChatHistory: React.FC<ChatHistoryProps> = ({ 
    messages, 
    isListening, 
    transcript, 
    toggleListening,
    isBackgroundListening = false,
    wakeWordDetected = false
}) => {
    return (
        <motion.div 
            className="bg-white bg-opacity-80 rounded-3xl p-6 mb-4 h-96 shadow-xl border-4 border-blue-300 overflow-hidden flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
        >
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-indigo-800 font-comic">Chat with Penny</h2>
                
                {/* Background listening indicator */}
                {isBackgroundListening && !isListening && (
                    <motion.div 
                        className="flex items-center text-xs text-indigo-600 bg-indigo-100 px-3 py-1 rounded-full"
                        animate={{ 
                            opacity: [0.7, 1, 0.7],
                            scale: [0.98, 1.02, 0.98]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <Volume2 size={14} className="mr-1 animate-pulse" />
                        <span>Listening for "Hey Penny"</span>
                    </motion.div>
                )}
                
                {/* Wake word detected animation */}
                {wakeWordDetected && (
                    <motion.div 
                        className="text-sm font-medium text-green-600 bg-green-100 px-3 py-1 rounded-full"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.8, opacity: 0 }}
                    >
                        <span className="flex items-center">
                            <Radio size={14} className="mr-1 animate-pulse" />
                            Wake word detected!
                        </span>
                    </motion.div>
                )}
            </div>
            
            <div className="overflow-y-auto flex-1 pr-2 mb-4 min-h-0">
                <AnimatePresence>
                    {messages.map((message, index) => (
                        <motion.div
                            key={index}
                            className={`mb-4 flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={`rounded-2xl px-4 py-3 max-w-xs ${
                                message.sender === 'user' 
                                    ? 'bg-purple-500 text-white' 
                                    : 'bg-indigo-100 text-indigo-800'
                            }`}>
                                <p className="font-comic">{message.text}</p>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
            
            {/* Voice input area */}
            <div className="flex items-center mt-auto">
                <motion.button
                    className={`w-14 h-14 rounded-full flex items-center justify-center shadow-md ${
                        isListening ? 'bg-red-500' : 'bg-indigo-500'
                    }`}
                    whileTap={{ scale: 0.9 }}
                    animate={isListening ? {
                        scale: [1, 1.1, 1],
                        boxShadow: [
                            "0px 0px 0px 0px rgba(79, 70, 229, 0.4)",
                            "0px 0px 0px 10px rgba(79, 70, 229, 0.2)",
                            "0px 0px 0px 0px rgba(79, 70, 229, 0)"
                        ]
                    } : {}}
                    transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
                    onClick={toggleListening}
                >
                    {isListening ? (
                        <MicOff className="w-6 h-6 text-white" />
                    ) : (
                        <Mic className="w-6 h-6 text-white" />
                    )}
                </motion.button>
                
                <div className="ml-4 flex-1 bg-gray-100 rounded-full px-4 py-2 font-comic">
                    {isListening ? (
                        <div className="text-gray-600">
                            {transcript || "Listening..."}
                            <motion.span 
                                className="inline-flex"
                                animate={{ opacity: [0, 1, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            >
                                ...
                            </motion.span>
                        </div>
                    ) : (
                        <div className="text-gray-400">
                            {isBackgroundListening 
                                ? "Just say \"Hey Penny\" to start shopping!" 
                                : "Press mic and speak to shop!"}
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default ChatHistory;