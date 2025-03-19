
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import AnimatedAssistant from '@/components/AnimatedAssistant';
import ProductCard from '@/components/ProductCard';
import { Send, Mic, ShoppingCart, X, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

// Sample product data
const sampleProducts = [
  {
    id: "1",
    name: "LEGO Star Wars AT-ST Raider Building Kit",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1518946222227-364f22132616?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bGVnb3xlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.8,
    description: "Build an AT-ST from the hit Star Wars TV series The Mandalorian with this building kit for kids and adults."
  },
  {
    id: "2",
    name: "Kids Smart Watch with GPS Tracker",
    price: 35.99,
    image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    rating: 4.5,
    description: "GPS tracking, SOS call, two-way calling, and waterproof features in a kid-friendly design."
  },
  {
    id: "3",
    name: "Wireless Bluetooth Headphones for Kids",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGhlYWRwaG9uZXN8ZW58MHx8MHx8fDA%3D",
    rating: 4.2,
    description: "Volume limiting headphones with 85dB protection, Bluetooth connectivity, and comfortable design for children."
  },
];

// Message types
interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  timestamp: Date;
  products?: typeof sampleProducts;
  status?: 'success' | 'warning' | 'error';
  statusMessage?: string;
}

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
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = () => {
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
    
    // Simulate AI response
    setTimeout(() => {
      let aiResponse: Message;
      
      // Sample responses based on input
      if (input.toLowerCase().includes('lego') || input.toLowerCase().includes('toy')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "I found some great LEGO sets that you might like! Here are some options:",
          timestamp: new Date(),
          products: [sampleProducts[0]],
        };
      } else if (input.toLowerCase().includes('watch') || input.toLowerCase().includes('tracker')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "Here's a popular smart watch for kids with GPS tracking:",
          timestamp: new Date(),
          products: [sampleProducts[1]],
        };
      } else if (input.toLowerCase().includes('headphone') || input.toLowerCase().includes('music')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "These headphones are designed specifically for kids with volume limiting technology:",
          timestamp: new Date(),
          products: [sampleProducts[2]],
        };
      } else if (input.toLowerCase().includes('buy') || input.toLowerCase().includes('purchase')) {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "I'll help you purchase that! Before we proceed, let me check your balance and get parental approval.",
          timestamp: new Date(),
          status: 'warning',
          statusMessage: 'Waiting for parent approval',
        };
      } else {
        aiResponse = {
          id: (Date.now() + 1).toString(),
          sender: 'assistant',
          text: "I can help you find products on Amazon. Try asking me about toys, electronics, books, or clothes for kids!",
          timestamp: new Date(),
        };
      }
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleAddToCart = (productId: string) => {
    if (!cartItems.includes(productId)) {
      setCartItems([...cartItems, productId]);
      
      // Find product
      const product = sampleProducts.find(p => p.id === productId);
      
      // Check balance
      if (product && product.price > balance) {
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
      } else if (product) {
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
        
        // Update balance (in a real app, this would happen at checkout)
        // setBalance(prevBalance => prevBalance - product.price);
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
            
            <div className="flex flex-col h-[calc(100vh-200px)] md:h-[600px]">
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
                                K
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
                              K
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
                    placeholder="Ask about products or type what you're looking for..."
                    className="w-full bg-white border border-gray-200 rounded-full pl-5 pr-14 py-3 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                  />
                  
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <motion.button 
                      className="h-9 w-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-500"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Mic className="h-5 w-5" />
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
                  Try asking: "Show me some LEGO sets" or "I'm looking for headphones"
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
