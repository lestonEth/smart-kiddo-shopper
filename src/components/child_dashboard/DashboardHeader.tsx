import React from 'react';
import { motion } from 'framer-motion';
import AnimatedAssistant from '@/components/landingApp/AnimatedAssistant';
import { LogOut } from 'lucide-react';

const DashboardHeader = ({ balance, onLogout }) => {
    return (
        <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-6 md:mb-0"
            >
                <h1 className="text-4xl font-bold mb-2 text-purple-800 font-comic">
                    Hey Sarah! <motion.span
                        animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1 }}
                        className="inline-block"
                    >
                        👋
                    </motion.span>
                </h1>
                <p className="text-lg text-purple-600 font-comic">Welcome to your Money Adventure!</p>
            </motion.div>

            <div className="flex items-center">
                <AnimatedAssistant variant="small" pulse={true} />
                <motion.div
                    className="ml-4 glass-card px-5 py-3 bg-white bg-opacity-70 rounded-2xl border-4 border-yellow-400"
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

                <motion.button
                    onClick={onLogout}
                    className="ml-4 glass-card px-4 py-3 bg-red-400 bg-opacity-20 hover:bg-blue-500 hover:bg-opacity-70 rounded-2xl border-4 border-red-500 text-blue-800 hover:text-white font-comic shadow-md transition-colors flex items-center gap-2"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <LogOut size={20} />
                    <span className="hidden sm:inline">Logout</span>
                </motion.button>
            </div>
        </div>
    );
};

export default DashboardHeader;