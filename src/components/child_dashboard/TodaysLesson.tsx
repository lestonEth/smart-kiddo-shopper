import React from 'react';
import { motion } from 'framer-motion';

const TodaysLesson = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass-card p-8 rounded-3xl bg-gradient-to-r from-indigo-200 to-purple-200 shadow-xl border-4 border-indigo-400"
        >
            <h2 className="text-2xl font-bold text-indigo-800 mb-4 font-comic">Today's Money Lesson</h2>

            <div className="flex flex-col md:flex-row items-center bg-white/70 rounded-2xl p-6">
                <motion.div
                    className="w-40 h-40 bg-indigo-300 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6 border-4 border-indigo-500 overflow-hidden"
                    animate={{ 
                        rotate: 360,
                        boxShadow: ["0px 0px 8px rgba(79, 70, 229, 0.5)", "0px 0px 16px rgba(79, 70, 229, 0.8)", "0px 0px 8px rgba(79, 70, 229, 0.5)"]
                    }}
                    transition={{ 
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        boxShadow: { duration: 2, repeat: Infinity }
                    }}
                >
                    <img
                        src="/assets/image.png"
                        alt="Money Lesson"
                        className="w-36 h-36 object-cover rounded-full"
                    />
                </motion.div>

                <div>
                    <h3 className="text-xl font-bold text-indigo-700 font-comic">Saving for What You Want</h3>
                    <p className="text-indigo-600 mb-4 font-comic">Learn how to save money for something special you want to buy!</p>
                    <motion.button
                        className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md font-medium font-comic"
                        whileHover={{ 
                            scale: 1.05,
                            background: "linear-gradient(90deg, #6366F1, #A78BFA)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        animate={{
                            y: [0, -3, 0],
                            boxShadow: ["0px 4px 0px rgba(79, 70, 229, 1)", "0px 6px 0px rgba(79, 70, 229, 1)", "0px 4px 0px rgba(79, 70, 229, 1)"]
                        }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            repeatType: "loop"
                        }}
                    >
                        Start Learning
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default TodaysLesson;