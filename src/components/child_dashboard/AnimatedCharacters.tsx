import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedCharacters = ({ characters, activeCharacter }) => {
    const characterVariants = {
        hidden: { y: 100, opacity: 0 },
        visible: { 
            y: 0, 
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        },
        hover: {
            y: -10,
            transition: {
                duration: 0.3,
                yoyo: Infinity
            }
        },
        bounce: {
            y: [0, -15, 0],
            transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
            }
        },
        wave: {
            rotate: [0, 10, -5, 10, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
            }
        }
    };

    return (
        <AnimatePresence>
            {characters.map((character, index) => (
                <motion.div
                    key={character.name}
                    className={`absolute ${character.position} ${character.size} z-10`}
                    initial="hidden"
                    animate={index === activeCharacter ? 
                        ["visible", "bounce"] : 
                        "visible"
                    }
                    exit={{ opacity: 0, y: 100 }}
                    variants={characterVariants}
                    whileHover="hover"
                >
                    <img 
                        src={`/assets/penny.png`} 
                        alt={character.name}
                        className="w-full h-full object-contain"
                    />
                    <motion.div 
                        className="absolute bottom-0 left-0 right-0 text-center font-bold text-indigo-800 bg-white bg-opacity-70 rounded-full px-2 py-1"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        {character.name}
                    </motion.div>
                </motion.div>
            ))}
        </AnimatePresence>
    );
};

export default AnimatedCharacters;