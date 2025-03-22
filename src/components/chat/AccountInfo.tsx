// src/components/Chat/AccountInfo.jsx
import React from 'react';
import { motion } from 'framer-motion';

const AccountInfo = ({ balance }) => {
    return (
        <motion.div
            className="glass-card px-4 py-2 flex items-center space-x-2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
        >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white font-bold">
                S
            </div>
            <div className="text-left">
                <p className="text-sm font-medium">Sarah's Account</p>
                <p className="text-xs text-gray-500">Balance: <span className="font-medium">${balance.toFixed(2)}</span></p>
            </div>
        </motion.div>
    );
};

export default AccountInfo;