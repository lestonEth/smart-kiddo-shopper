// src/components/Chat/MessageItem.jsx
import React from 'react';
import { motion } from 'framer-motion';
import ProductCard from '@/components/ProductCard';
import TypeWriter from './TypeWriter';
import { CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

const MessageItem = ({ 
    message, 
    fullMessage, 
    isActiveTyping, 
    handleTypewriterComplete,
    cartItems,
    handleAddToCart 
}) => {
    return (
        <motion.div
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className={`max-w-[85%] rounded-xl p-4 ${message.sender === 'user'
                        ? 'bg-brand-blue text-white'
                        : 'bg-white border border-gray-200 glass-card'
                    }`}
            >
                {message.sender === 'assistant' && (
                    <div className="glass-card flex items-center space-x-2 mb-2">
                        <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs">
                                S
                            </div>
                        </div>
                        <div className="font-medium">Shopmeai</div>
                    </div>
                )}

                <p className="mb-1">
                    {isActiveTyping ? (
                        <>
                            <TypeWriter 
                                text={fullMessage.text} 
                                speed={60} 
                                onComplete={() => handleTypewriterComplete(message.id)} 
                            />
                            <span className="ml-1 inline-block w-2 h-5 bg-black/60 animate-blink"></span>
                        </>
                    ) : (
                        message.text
                    )}
                </p>

                {message.products && (
                    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {message.products.map(product => (
                            <ProductCard
                                key={product.id}
                                id={product.id}
                                name={product.name}
                                price={product.price}
                                image={product.image}
                                rating={product.rating}
                                description={product.description}
                                onAddToCart={() => handleAddToCart(product.id)}
                                inCart={cartItems.includes(product.id)}
                            />
                        ))}
                    </div>
                )}

                {message.status && (
                    <div className={`mt-3 flex items-center space-x-2 p-3 rounded-lg ${message.status === 'success' ? 'bg-green-50 text-green-700' :
                            message.status === 'warning' ? 'bg-yellow-50 text-yellow-700' :
                                'bg-red-50 text-red-700'
                        }`}>
                        {message.status === 'success' && <CheckCircle className="h-5 w-5" />}
                        {message.status === 'warning' && <AlertCircle className="h-5 w-5" />}
                        {message.status === 'error' && <AlertTriangle className="h-5 w-5" />}
                        <span className="text-sm font-medium">{message.statusMessage}</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default MessageItem;