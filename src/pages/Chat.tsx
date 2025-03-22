import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import VoiceCircle from '@/components/VoiceCircle';
import { Send, Mic, MicOff, ShoppingCart, X, CheckCircle, AlertCircle, AlertTriangle, Volume, VolumeX } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import ProductCard from '@/components/ProductCard';
import AuthContext from '@/context/AuthContext';

// Import our new services
import { Message, processUserMessage } from '@/services/chatService';
import { searchProducts, getProductById } from '@/services/productService';
import { initSpeechRecognition, startListening, stopListening } from '@/services/speechService';
import { speakText, setElevenLabsApiKey, hasApiKey } from '@/services/elevenlabs';

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      sender: 'assistant',
      text: "Hi there! I'm your Shopmeai shopping assistant. What would you like to shop for today?",
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [balance, setBalance] = useState(50);
  const [cartItems, setCartItems] = useState<string[]>([]);
  
  // Voice-related states
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { user } = useContext(AuthContext);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    // Initialize speech recognition
    recognitionRef.current = initSpeechRecognition();
    
    // Check if ElevenLabs API key is set
    if (!hasApiKey()) {
      toast({
        title: "Voice Features Limited",
        description: "Set your ElevenLabs API key in settings for enhanced voice capabilities."
      });
    }
    
    return () => {
      if (recognitionRef.current) {
        stopListening(recognitionRef.current);
      }
    };
  }, []);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setIsProcessing(true);
    
    // Stop listening if active
    if (isListening) {
      toggleListening();
    }
    
    try {
      // Process the message and get AI response
      const aiResponse = await processUserMessage(userMessage.text, balance);
      
      setMessages(prev => [...prev, aiResponse]);
      
      // Speak the response if not muted
      if (!isMuted && aiResponse.text) {
        setIsSpeaking(true);
        await speakText(aiResponse.text);
        setIsSpeaking(false);
      }
      
    } catch (error) {
      console.error('Error handling message:', error);
      
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: 'assistant',
        text: "I'm sorry, I encountered an error processing your request. Please try again.",
        timestamp: new Date(),
        status: 'error',
        statusMessage: 'Processing error',
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setIsProcessing(false);
    }
  };
  
  const toggleListening = () => {
    if (!recognitionRef.current) return;
    
    if (isListening) {
      stopListening(recognitionRef.current);
      setIsListening(false);
    } else {
      setInput('');
      
      startListening(
        recognitionRef.current,
        (transcript) => setInput(transcript),
        () => {
          // If it stops listening but we still want it to listen
          if (isListening) {
            startListening(
              recognitionRef.current,
              (transcript) => setInput(transcript)
            );
          }
        }
      );
      
      setIsListening(true);
      
      toast({
        title: "Listening...",
        description: "Speak now. I'm listening to your request.",
      });
    }
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
    
    toast({
      title: isMuted ? "Voice Enabled" : "Voice Muted",
      description: isMuted ? "I'll speak responses again." : "I won't speak responses aloud.",
    });
  };
  
  const handleAddToCart = async (productId: string) => {
    if (!cartItems.includes(productId)) {
      setCartItems([...cartItems, productId]);
      
      // Get product details
      const product = await getProductById(productId);
      
      if (!product) {
        toast({
          title: "Product Not Found",
          description: "Unable to find product details."
        });
        return;
      }
      
      // Check balance
      if (product.price > balance) {
        // Not enough balance
        const warningMessage: Message = {
          id: Date.now().toString(),
          sender: 'assistant',
          text: `I noticed that the ${product.name} costs $${product.price.toFixed(2)}, but your current balance is only $${balance.toFixed(2)}.`,
          timestamp: new Date(),
          status: 'error',
          statusMessage: 'Insufficient balance',
        };
        
        setMessages(prev => [...prev, warningMessage]);
        
        // Speak the message if not muted
        if (!isMuted) {
          setIsSpeaking(true);
          await speakText(warningMessage.text);
          setIsSpeaking(false);
        }
      } else {
        // Successful addition
        const successMessage: Message = {
          id: Date.now().toString(),
          sender: 'assistant',
          text: `Great choice! I've added the ${product.name} to your cart. Your remaining balance would be $${(balance - product.price).toFixed(2)}.`,
          timestamp: new Date(),
          status: 'success',
          statusMessage: 'Item added to cart',
        };
        
        setMessages(prev => [...prev, successMessage]);
        
        // Speak the message if not muted
        if (!isMuted) {
          setIsSpeaking(true);
          await speakText(successMessage.text);
          setIsSpeaking(false);
        }
      }
    }
  };
  
  const renderMessageContent = (message: Message) => {
    return (
      <>
        <p className="mb-1">{message.text}</p>
        
        {message.products && (
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {message.products.map(product => (
              <ProductCard 
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.image}
                rating={product.rating}
                description={product.description}
                onAddToCart={() => handleAddToCart(product.id)}
                inCart={cartItems.includes(product.id)}
              />
            ))}
          </div>
        )}
        
        {message.status && (
          <div className={`mt-3 flex items-center space-x-2 p-3 rounded-lg ${
            message.status === 'success' ? 'bg-green-50 text-green-700' :
            message.status === 'warning' ? 'bg-yellow-50 text-yellow-700' :
            'bg-red-50 text-red-700'
          }`}>
            {message.status === 'success' && <CheckCircle className="h-5 w-5" />}
            {message.status === 'warning' && <AlertCircle className="h-5 w-5" />}
            {message.status === 'error' && <AlertTriangle className="h-5 w-5" />}
            <span className="text-sm font-medium">{message.statusMessage}</span>
          </div>
        )}
      </>
    );
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <div className="max-w-5xl mx-auto">
            <header className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold mb-1">Shopmeai Assistant</h1>
                <p className="text-gray-600">Ask me about products and I'll help you shop!</p>
              </div>
              
              <motion.div 
                className="glass-card px-4 py-2 flex items-center space-x-2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white font-bold">
                  S
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium">Sarah's Account</p>
                  <p className="text-xs text-gray-500">Balance: <span className="font-medium">${balance.toFixed(2)}</span></p>
                </div>
              </motion.div>
            </header>
            
            {/* Voice Circle UI */}
            <div className="flex justify-center mb-6">
              <VoiceCircle 
                isListening={isListening}
                isProcessing={isProcessing}
                isSpeaking={isSpeaking}
                size="large"
              />
            </div>
            
            <div className="flex flex-col h-[calc(100vh-280px)] md:h-[500px]">
              <div className="flex-1 glass-card p-4 overflow-y-auto">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div 
                        className={`max-w-[85%] rounded-xl p-4 ${
                          message.sender === 'user' 
                            ? 'bg-brand-blue text-white' 
                            : 'bg-white border border-gray-200'
                        }`}
                      >
                        {message.sender === 'assistant' && (
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                              <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs">
                                S
                              </div>
                            </div>
                            <div className="font-medium">Shopmeai</div>
                          </div>
                        )}
                        
                        {renderMessageContent(message)}
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      className="flex justify-start"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <div className="max-w-[85%] rounded-xl p-4 bg-white border border-gray-200">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-8 h-8 rounded-full bg-brand-blue/10 flex items-center justify-center">
                            <div className="w-6 h-6 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-xs">
                              S
                            </div>
                          </div>
                          <div className="font-medium">Shopmeai</div>
                        </div>
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce"></div>
                          <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                          <div className="h-2 w-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                  
                  <div ref={messagesEndRef} />
                </div>
              </div>
              
              <div className="mt-4">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder={isListening ? "Listening..." : "Ask about products or type what you're looking for..."}
                    className={`w-full bg-white border border-gray-200 rounded-full pl-5 pr-24 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent ${isListening ? 'bg-brand-blue/5' : ''}`}
                  />
                  
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <motion.button 
                      className={`h-9 w-9 flex items-center justify-center rounded-full ${isMuted ? 'bg-red-100 text-red-500' : 'bg-gray-100 text-gray-500'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleMute}
                    >
                      {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume className="h-5 w-5" />}
                    </motion.button>
                    
                    <motion.button 
                      className={`h-9 w-9 flex items-center justify-center rounded-full ${isListening ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500'}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={toggleListening}
                    >
                      {isListening ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                    </motion.button>
                    
                    <motion.button 
                      className="h-9 w-9 flex items-center justify-center rounded-full bg-brand-blue text-white"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleSendMessage}
                    >
                      <Send className="h-5 w-5" />
                    </motion.button>
                  </div>
                </div>
                
                <div className="text-xs text-gray-500 mt-2 pl-2">
                  {isListening ? "Speak now..." : "Try asking: \"Show me some LEGO sets\" or \"I'm looking for headphones\""}
                </div>
              </div>
            </div>
            
            {cartItems.length > 0 && (
              <motion.div 
                className="glass-card p-4 mt-4 flex items-center justify-between"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center space-x-3">
                  <div className="bg-brand-blue/10 p-2 rounded-full">
                    <ShoppingCart className="h-5 w-5 text-brand-blue" />
                  </div>
                  <div>
                    <p className="font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in cart</p>
                    <p className="text-sm text-gray-500">Items pending parent approval</p>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <motion.button 
                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCartItems([])}
                  >
                    <X className="h-4 w-4" />
                    <span>Clear</span>
                  </motion.button>
                  
                  <motion.button 
                    className="px-4 py-2 bg-brand-blue text-white rounded-lg text-sm font-medium flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Checkout</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Chat;
