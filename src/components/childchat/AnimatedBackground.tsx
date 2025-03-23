// @/components/childchat/AnimatedBackground.tsx
import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
    return (
        <>
            <motion.div 
                className="absolute top-20 left-10 w-24 h-24 bg-yellow-300 rounded-full opacity-50"
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
                className="absolute top-40 right-20 w-40 h-24 bg-white rounded-full opacity-60"
                animate={{
                    x: [0, 30, 0, -30, 0],
                    y: [0, -10, 0, -5, 0]
                }}
                transition={{ 
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </>
    );
};

export default AnimatedBackground;