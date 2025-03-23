import React from 'react';
import { motion } from 'framer-motion';

const BackgroundElements = () => {
    // Cloud animation
    const cloudVariants = {
        float: {
            x: [0, 30, 0, -30, 0],
            y: [0, -10, 0, -5, 0],
            transition: {
                duration: 15,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <>
            {/* Animated background elements */}
            <motion.div 
                className="absolute top-20 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-60"
                animate={{ 
                    y: [0, -20, 0], 
                    scale: [1, 1.1, 1]
                }}
                transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className="absolute top-40 right-20 w-40 h-24 bg-white rounded-full opacity-80"
                variants={cloudVariants}
                animate="float"
            />
            
            <motion.div 
                className="absolute bottom-40 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-60"
                animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, 0, -10, 0]
                }}
                transition={{ 
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
            
            <motion.div 
                className="absolute top-1/4 right-1/4 w-36 h-20 bg-white rounded-full opacity-70"
                variants={cloudVariants}
                animate="float"
                transition={{
                    duration: 12,
                    delay: 2,
                    repeat: Infinity
                }}
            />
            
            {/* Sun */}
            <motion.div 
                className="absolute top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-80"
                animate={{ 
                    rotate: 360,
                    scale: [1, 1.1, 1]
                }}
                transition={{ 
                    rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    },
                    scale: {
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }
                }}
            />
            
            {/* Rainbow arc */}
            <motion.div 
                className="absolute -top-40 left-1/4 w-1/2 h-80 border-t-8 border-red-500 border-l-0 border-r-0 border-b-0 rounded-t-full opacity-40"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 8, repeat: Infinity }}
            />
            <motion.div 
                className="absolute -top-36 left-1/4 w-1/2 h-80 border-t-8 border-yellow-500 border-l-0 border-r-0 border-b-0 rounded-t-full opacity-40"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div 
                className="absolute -top-32 left-1/4 w-1/2 h-80 border-t-8 border-green-500 border-l-0 border-r-0 border-b-0 rounded-t-full opacity-40"
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 0.4 }}
            />
            <motion.div 
                className="absolute -top-28 left-1/4 w-1/2 h-80 border-t-8 border-blue-500 border-l-0 border-r-0 border-b-0 rounded-t-full opacity-40"
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 0.6 }}
            />
            <motion.div 
                className="absolute -top-24 left-1/4 w-1/2 h-80 border-t-8 border-purple-500 border-l-0 border-r-0 border-b-0 rounded-t-full opacity-40"
                animate={{ y: [0, 2, 0] }}
                transition={{ duration: 8, repeat: Infinity, delay: 0.8 }}
            />
        </>
    );
};

export default BackgroundElements;