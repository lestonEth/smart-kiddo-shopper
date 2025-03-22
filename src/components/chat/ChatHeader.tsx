
// src/components/Chat/ChatHeader.jsx
import React from 'react';
import { motion } from 'framer-motion';
import AccountInfo from './AccountInfo';

const ChatHeader = ({ balance }) => {
    return (
        <header className="flex items-center justify-between mb-6">
            <div>
                <h1 className="text-3xl font-bold mb-1">Shopmeai Assistant</h1>
                <p className="text-gray-600">Ask me about products and I'll help you shop!</p>
            </div>

            <AccountInfo balance={balance} />
        </header>
    );
};

export default ChatHeader;
