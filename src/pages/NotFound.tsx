import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Ghost, Home, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4"
    >
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 20,
            repeat: Infinity,
            repeatType: "reverse",
            duration: 2
          }}
          className="flex justify-center mb-6"
        >
          <Ghost size={80} className="text-brand-blue" />
        </motion.div>
        
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 shadow-xl border-4 border-brand-blue-light text-center"
        >
          <h1 className="text-6xl font-comic font-bold text-brand-coral mb-2">
            404
          </h1>
          
          <h2 className="text-2xl font-comic font-bold text-brand-blue-dark mb-6">
            Oops! Page not found
          </h2>
          
          <p className="text-gray-600 font-comic mb-8">
            We looked everywhere but couldn't find the page you're looking for!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-brand-blue text-white rounded-full font-comic font-medium shadow-lg hover:bg-brand-blue-dark transition-colors flex items-center justify-center"
            >
              <Home className="mr-2" size={18} />
              Return to Home
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-white text-brand-blue border-2 border-brand-blue rounded-full font-comic font-medium hover:bg-blue-50 transition-colors flex items-center justify-center"
            >
              <ArrowLeft className="mr-2" size={18} />
              Go Back
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NotFound;