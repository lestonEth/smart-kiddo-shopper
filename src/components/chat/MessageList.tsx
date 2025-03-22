// src/components/Chat/MessageList.jsx
import React from 'react';
import { motion } from 'framer-motion';
import MessageItem from './MessageItem';

const MessageList = ({ 
    displayedMessages, 
    messages, 
    typingMessageId, 
    isTyping, 
    handleTypewriterComplete,
    cartItems,
    handleAddToCart,
    messagesEndRef
}) => {
    return (
        <div className="flex-1 glass-card p-4 overflow-y-auto">
            <div className="space-y-6">
                {displayedMessages.map((message) => (
                    <MessageItem 
                        key={message.id}
                        message={message}
                        fullMessage={messages.find(m => m.id === message.id)}
                        isActiveTyping={message.id === typingMessageId}
                        handleTypewriterComplete={handleTypewriterComplete}
                        cartItems={cartItems}
                        handleAddToCart={handleAddToCart}
                    />
                ))}

                {/* Show typing indicator when AI is processing */}
                {isTyping && !typingMessageId && (
                    <motion.div
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="max-w-[85%] rounded-xl p-4 bg-white border border-gray-200">
                            <div className="flex items-center space-x-2 mb-2">
                                <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                                    <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs">
                                        S
                                    </div>
                                </div>
                                <div className="font-medium">Shopmeai</div>
                            </div>
                            <div className="flex space-x-2">
                                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
                                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                                <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                            </div>
                        </div>
                    </motion.div>
                )}

                <div ref={messagesEndRef} />
            </div>
        </div>
    );
};

export default MessageList;