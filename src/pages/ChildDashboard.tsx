
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/PageTransition';
import AnimatedAssistant from '@/components/AnimatedAssistant';
import { Coins, ShoppingCart, Gift, GameController } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ChildDashboard = () => {
  const navigate = useNavigate();
  const [balance] = useState(25.75);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <PageTransition>
      <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 to-purple-50">
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-24 h-24 bg-yellow-200 rounded-full opacity-40 animate-bounce-soft" />
        <div className="absolute top-40 right-20 w-16 h-16 bg-pink-200 rounded-full opacity-30 animate-float" />
        <div className="absolute bottom-40 left-1/4 w-32 h-32 bg-green-200 rounded-full opacity-30 animate-pulse-soft" />
        
        {/* Background cartoon images */}
        <motion.img 
          src="https://source.unsplash.com/photo-1535268647677-300dbf3d78d1"
          alt="Cartoon Cat"
          className="absolute -bottom-10 -left-10 w-64 h-64 object-contain opacity-20 z-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        />
        
        <motion.img 
          src="https://source.unsplash.com/photo-1441057206919-63d19fac2369"
          alt="Cartoon Penguin"
          className="absolute -top-10 -right-10 w-64 h-64 object-contain opacity-20 z-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 0.2, x: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
        />
        
        <div className="container mx-auto px-4 py-8 relative z-10">
          {/* Greeting section with animated assistant */}
          <div className="flex flex-col md:flex-row items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 md:mb-0"
            >
              <h1 className="text-4xl font-bold mb-2 text-purple-800">
                Hey Sarah! <motion.span
                  animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
                  className="inline-block"
                >
                  👋
                </motion.span>
              </h1>
              <p className="text-lg text-purple-600">Welcome to your Money Adventure!</p>
            </motion.div>
            
            <div className="flex items-center">
              <AnimatedAssistant variant="small" pulse={true} />
              <motion.div 
                className="ml-4 glass-card px-5 py-3"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <p className="text-lg font-bold text-brand-blue">Your Treasure:</p>
                <p className="text-2xl font-bold text-brand-coral">${balance.toFixed(2)}</p>
              </motion.div>
            </div>
          </div>
          
          {/* Main activity cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Shop Card */}
            <motion.div 
              className="glass-card bg-gradient-to-br from-brand-blue-light to-blue-50 p-6 rounded-3xl shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
              onClick={() => navigate('/chat')}
            >
              <div className="bg-white/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-10 h-10 text-brand-blue" />
              </div>
              <h3 className="text-xl font-bold text-brand-blue-dark mb-2">Shop</h3>
              <p className="text-brand-blue-dark/70">Find awesome things to buy!</p>
            </motion.div>
            
            {/* Savings Card */}
            <motion.div 
              className="glass-card bg-gradient-to-br from-brand-coral-light to-orange-50 p-6 rounded-3xl shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="bg-white/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Coins className="w-10 h-10 text-brand-coral" />
              </div>
              <h3 className="text-xl font-bold text-brand-coral-dark mb-2">Savings</h3>
              <p className="text-brand-coral-dark/70">Watch your money grow!</p>
            </motion.div>
            
            {/* Rewards Card */}
            <motion.div 
              className="glass-card bg-gradient-to-br from-purple-200 to-purple-50 p-6 rounded-3xl shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="bg-white/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <Gift className="w-10 h-10 text-purple-500" />
              </div>
              <h3 className="text-xl font-bold text-purple-700 mb-2">Rewards</h3>
              <p className="text-purple-700/70">Complete tasks for coins!</p>
            </motion.div>
            
            {/* Games Card */}
            <motion.div 
              className="glass-card bg-gradient-to-br from-green-200 to-green-50 p-6 rounded-3xl shadow-xl"
              variants={itemVariants}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
            >
              <div className="bg-white/40 w-16 h-16 rounded-2xl flex items-center justify-center mb-4">
                <GameController className="w-10 h-10 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-green-700 mb-2">Games</h3>
              <p className="text-green-700/70">Learn while having fun!</p>
            </motion.div>
          </motion.div>
          
          {/* Learning section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="glass-card p-8 rounded-3xl bg-gradient-to-r from-indigo-100 to-purple-100 shadow-xl"
          >
            <h2 className="text-2xl font-bold text-indigo-800 mb-4">Today's Money Lesson</h2>
            
            <div className="flex flex-col md:flex-row items-center bg-white/50 rounded-2xl p-6">
              <motion.div 
                className="w-40 h-40 bg-indigo-200 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-6"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <img 
                  src="https://source.unsplash.com/photo-1472396961693-142e6e269027" 
                  alt="Money Lesson" 
                  className="w-36 h-36 object-cover rounded-full"
                />
              </motion.div>
              
              <div>
                <h3 className="text-xl font-bold text-indigo-700">Saving for What You Want</h3>
                <p className="text-indigo-600 mb-4">Learn how to save money for something special you want to buy!</p>
                <motion.button
                  className="bg-indigo-500 text-white px-6 py-2 rounded-lg shadow-md font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Start Learning
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ChildDashboard;
