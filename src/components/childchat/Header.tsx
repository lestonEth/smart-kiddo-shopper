// @/components/childchat/Header.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { NavigateFunction } from 'react-router-dom';

interface HeaderProps {
    balance: number;
    navigate: NavigateFunction;
}

const Header: React.FC<HeaderProps> = ({ balance, navigate }) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <motion.button
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-purple-600 text-white px-4 py-2 rounded-full flex items-center shadow-md"
                onClick={() => navigate(-1)}
            >
                <span className="mr-2">←</span> Back
            </motion.button>

            <motion.div
                className="glass-card px-5 py-3 bg-white bg-opacity-70 rounded-2xl border-4 border-yellow-400"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
            >
                <p className="text-lg font-bold text-brand-blue font-comic">Your Treasure:</p>
                <motion.p 
                    className="text-2xl font-bold text-brand-coral font-comic"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                >
                    ${balance.toFixed(2)}
                </motion.p>
            </motion.div>
        </div>
    );
};

export default Header;