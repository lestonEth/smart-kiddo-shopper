// src/components/Chat/ChatInput.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Volume, VolumeX } from 'lucide-react';
import SuggestionChips from './SuggestionChips';

const ChatInput = ({ 
    input, 
    setInput, 
    handleSendMessage, 
    isListening, 
    isMuted, 
    toggleListening, 
    toggleMute,
    handleShowRecommendations
}) => {
    return (
        <div className="mt-4">
            <div className="relative">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isListening ? "Listening..." : "Ask about products or type what you're looking for..."}
                    className={`w-full bg-white border border-gray-200 rounded-full pl-5 pr-24 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent ${isListening ? 'bg-brand-blue/5' : ''}`}
                />

                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <motion.button
                        className={`h-9 w-9 flex items-center justify-center rounded-full ${isMuted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleMute}
                    >
                        {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume className="h-5 w-5" />}
                    </motion.button>

                    <motion.button
                        className={`h-9 w-9 flex items-center justify-center rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleListening}
                    >
                        {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </motion.button>

                    <motion.button
                        className="h-9 w-9 flex items-center justify-center rounded-full bg-brand-blue text-white"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSendMessage}
                    >
                        <Send className="h-5 w-5" />
                    </motion.button>
                </div>
            </div>

            <SuggestionChips 
                setInput={setInput}
                isListening={isListening}
                handleShowRecommendations={handleShowRecommendations}
            />
        </div>
    );
};

export default ChatInput;