
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VoiceCircleProps {
  isListening: boolean;
  isProcessing: boolean;
  isSpeaking: boolean;
  size?: 'small' | 'medium' | 'large';
}

const VoiceCircle: React.FC<VoiceCircleProps> = ({
  isListening,
  isProcessing,
  isSpeaking,
  size = 'medium'
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  
  const sizeMap = {
    small: { circle: 60, wave: 40 },
    medium: { circle: 100, wave: 70 },
    large: { circle: 150, wave: 100 }
  };
  
  const dimensions = sizeMap[size];
  
  // Animation for speaking
  useEffect(() => {
    if (!canvasRef.current || !isSpeaking) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = dimensions.wave;
    const waveCount = 5;
    let phase = 0;
    
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Draw sound waves
      phase += 0.05;
      for (let i = 0; i < waveCount; i++) {
        const wavePhase = phase + i * (Math.PI / waveCount);
        const amplitude = Math.sin(wavePhase) * 0.3 + 0.7;
        const radius = maxRadius * amplitude;
        
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.strokeStyle = `rgba(66, 153, 225, ${0.8 - i * 0.15})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isSpeaking, dimensions.wave]);
  
  return (
    <div className="relative flex items-center justify-center">
      {/* Background Circle */}
      <motion.div 
        className="absolute rounded-full bg-gradient-to-r from-brand-blue to-brand-coral"
        style={{ 
          width: dimensions.circle, 
          height: dimensions.circle,
          opacity: isProcessing ? 0.7 : 1
        }}
        animate={isProcessing ? {
          scale: [1, 1.1, 1],
          opacity: [0.7, 0.9, 0.7],
        } : isListening ? {
          scale: [1, 1.05, 1],
          opacity: [0.9, 1, 0.9],
        } : {}}
        transition={{
          duration: isProcessing ? 1.5 : 1,
          ease: "easeInOut",
          repeat: Infinity,
        }}
      />
      
      {/* Inner Circle - Brand Logo or Microphone Icon */}
      <motion.div 
        className="absolute z-10 rounded-full bg-white flex items-center justify-center"
        style={{ 
          width: dimensions.circle * 0.7, 
          height: dimensions.circle * 0.7,
        }}
      >
        <span className="text-brand-blue font-bold text-xl">S</span>
      </motion.div>
      
      {/* Voice Wave Canvas */}
      {isSpeaking && (
        <canvas 
          ref={canvasRef} 
          width={dimensions.circle * 1.5} 
          height={dimensions.circle * 1.5}
          className="absolute z-5"
        />
      )}
    </div>
  );
};

export default VoiceCircle;
