
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingCartoonProps {
  src: string;
  alt: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const FloatingCartoon: React.FC<FloatingCartoonProps> = ({ 
  src, 
  alt, 
  className = "", 
  delay = 0, 
  duration = 4 
}) => {
  return (
    <motion.div
      className={`absolute ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        transition: {
          delay,
          duration: 0.8
        }
      }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-contain"
        animate={{ 
          y: [0, -15, 0],
          rotate: [-2, 2, -2]
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  );
};

export default FloatingCartoon;
