
import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedAssistantProps {
  variant?: 'large' | 'medium' | 'small';
  className?: string;
  animate?: boolean;
  pulse?: boolean;
}

const AnimatedAssistant: React.FC<AnimatedAssistantProps> = ({ 
  variant = 'medium',
  className = '',
  animate = true,
  pulse = false
}) => {
  const sizeClasses = {
    large: 'w-72 h-72',
    medium: 'w-48 h-48',
    small: 'w-24 h-24'
  };

  return (
    <motion.div 
      className={`relative ${sizeClasses[variant]} ${className}`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Background glow effect */}
      <motion.div 
        className="absolute inset-0 bg-gradient-radial from-brand-blue/30 to-transparent rounded-full"
        animate={pulse ? { 
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.9, 0.7],
        } : {}}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      
      {/* Robot character */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-brand-blue to-brand-blue-dark rounded-full overflow-hidden border-4 border-white flex items-center justify-center"
        animate={animate ? { y: [0, -10, 0] } : {}}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      >
        {/* Robot face */}
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-4">
            <motion.div 
              className="w-6 h-6 bg-white rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse"
              }}
            />
            <motion.div 
              className="w-6 h-6 bg-white rounded-full"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "reverse",
                delay: 0.5
              }}
            />
          </div>
          
          {/* Mouth */}
          <motion.div 
            className="w-12 h-1 bg-white rounded-full mt-4"
            animate={{ width: ["3rem", "2rem", "3rem"] }}
            transition={{
              duration: 3,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          
          {/* Antenna */}
          <motion.div 
            className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: [-5, 5, -5] }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          >
            <div className="w-1 h-5 bg-white rounded-full" />
            <div className="w-3 h-3 bg-brand-coral rounded-full mx-auto -mt-1" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AnimatedAssistant;
