// src/components/Chat/Chat.jsx
import React, { useState, useEffect, useRef, useContext } from 'react';
import PageTransition from '@/components/PageTransition';
import VoiceCircle from '@/components/VoiceCircle';
import { toast } from '@/components/ui/use-toast';
import AuthContext from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import ChatHeader from './ChatHeader';
import MessageList from './MessageList';
import ChatInput from './ChatInput';
import CartSummary from './CartSummary';

// Import services
import { Message, processUserMessage } from '@/services/chatService';
import { searchProducts, getProductById } from '@/services/productService';
import { initSpeechRecognition, startListening, stopListening } from '@/services/speechService';
import { speakText, setElevenLabsApiKey, hasApiKey } from '@/services/elevenlabs';

// Define default product data with keywords
const defaultProducts = [
    {
        id: 'p1',
        name: 'LEGO Star Wars AT-AT',
        price: 169.99,
        image: '/products/lego-at-at.jpg',
        rating: 4.8,
        description: 'Build the iconic AT-AT from Star Wars: The Empire Strikes Back with this 1,267-piece set.',
        keywords: ['lego', 'star wars', 'toys', 'building blocks', 'at-at', 'kids']
    },
];

// Function to find products based on keywords in a message
const findProductsByKeywords = (message) => {
    const messageLower = message.toLowerCase();
    return defaultProducts.filter(product => 
        product.keywords.some(keyword => messageLower.includes(keyword))
    );
};

const Chat = () => {
    const [messages, setMessages] = useState([
        {
            id: '1',
            sender: 'assistant',
            text: "Hi there! I'm your Shopmeai shopping assistant. What would you like to shop for today?",
            timestamp: new Date(),
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [balance, setBalance] = useState(150);
    const [cartItems, setCartItems] = useState([]);

    // Voice-related states
    const [isListening, setIsListening] = useState(false);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    
    // TypeWriter related states
    const [typingMessageId, setTypingMessageId] = useState(null);
    const [displayedMessages, setDisplayedMessages] = useState([]);

    const messagesEndRef = useRef(null);
    const recognitionRef = useRef(null);
    const { user } = useContext(AuthContext);

    // FIXED: Split the effect into two separate ones with proper dependencies
    // First effect: Update displayedMessages when messages or typingMessageId changes
    useEffect(() => {
        const messagesToDisplay = messages.filter(msg => {
            if (msg.sender === 'user') return true;
            return msg.id !== typingMessageId || displayedMessages.some(m => m.id === msg.id);
        });
        
        setDisplayedMessages(messagesToDisplay);
    }, [messages, typingMessageId]);
    
    // Second effect: Set typingMessageId for new assistant messages
    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (
            lastMessage && 
            lastMessage.sender === 'assistant' && 
            !typingMessageId && 
            !displayedMessages.some(m => m.id === lastMessage.id)
        ) {
            setTypingMessageId(lastMessage.id);
        }
    }, [messages, typingMessageId, displayedMessages]);

    // Improved scroll effect
    useEffect(() => {
        // Add a small delay to ensure DOM has updated
        const scrollTimer = setTimeout(() => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100);
        
        return () => clearTimeout(scrollTimer);
    }, [displayedMessages, typingMessageId, isTyping]);

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

    // Enhanced scrollToBottom function
    const scrollToBottom = () => {
        // Force immediate scroll without animation in certain scenarios
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'auto' });
        }
    };

    const handleSendMessage = async () => {
        if (!input.trim()) return;

        // Add user message
        const userMessage = {
            id: Date.now().toString(),
            sender: 'user',
            text: input,
            timestamp: new Date(),
        };

        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);
        setIsProcessing(true);
        
        // Force immediate scroll after user sends message
        setTimeout(scrollToBottom, 50);

        // Stop listening if active
        if (isListening) {
            toggleListening();
        }

        try {
            // Look for products based on keywords in the user's message
            const matchedProducts = findProductsByKeywords(userMessage.text);
            
            // Process the message and get AI response
            const aiResponse = await processUserMessage(userMessage.text, balance);
            
            // If products were found, add them to the AI response
            if (matchedProducts.length > 0) {
                aiResponse.products = matchedProducts;
                
                // Add a note about found products to the response
                const productNames = matchedProducts.map(p => p.name).join(', ');
                const numProducts = matchedProducts.length;
                
                aiResponse.text = `I found ${numProducts} ${numProducts === 1 ? 'product' : 'products'} that might interest you: ${productNames}. ${aiResponse.text}`;
            } else if (userMessage.text.toLowerCase().includes('show me') || 
                      userMessage.text.toLowerCase().includes('looking for') ||
                      userMessage.text.toLowerCase().includes('find')) {
                // If user is explicitly looking for something but no specific matches were found
                aiResponse.text = `I couldn't find specific products matching your request. Here are some popular items you might like:`;
                aiResponse.products = defaultProducts.slice(0, 3); // Show first 3 products as suggestions
            }

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
            const errorMessage = {
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

    const handleAddToCart = async (productId) => {
        if (!cartItems.includes(productId)) {
            setCartItems([...cartItems, productId]);

            // Get product details - use default products if available
            const product = defaultProducts.find(p => p.id === productId) || await getProductById(productId);

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
                const warningMessage = {
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
                const successMessage = {
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

    const handleTypewriterComplete = (messageId) => {
        setTypingMessageId(null);
        // Once typing is complete, make sure this message is in our displayed messages
        setDisplayedMessages(prev => {
            // Only add the message if it's not already in the displayed messages
            if (!prev.some(m => m.id === messageId)) {
                const message = messages.find(m => m.id === messageId);
                if (message) {
                    return [...prev, message];
                }
            }
            return prev;
        });
        
        // Also scroll to bottom when typewriter completes
        setTimeout(scrollToBottom, 50);
    };

    // Function to show featured products when user asks for recommendations
    const handleShowRecommendations = () => {
        const recommendationMessage = {
            id: Date.now().toString(),
            sender: 'assistant',
            text: "Here are some featured products you might like:",
            timestamp: new Date(),
            products: defaultProducts.slice(0, 4) // Show first 4 default products
        };

        setMessages(prev => [...prev, recommendationMessage]);
        
        // Force scroll after adding recommendations
        setTimeout(scrollToBottom, 50);

        // Speak the message if not muted
        if (!isMuted) {
            setIsSpeaking(true);
            speakText(recommendationMessage.text).then(() => setIsSpeaking(false));
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
                    <div className="max-w-5xl mx-auto">
                        <ChatHeader balance={balance} />

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
                            <MessageList 
                                displayedMessages={displayedMessages}
                                messages={messages}
                                typingMessageId={typingMessageId}
                                isTyping={isTyping}
                                handleTypewriterComplete={handleTypewriterComplete}
                                cartItems={cartItems}
                                handleAddToCart={handleAddToCart}
                                messagesEndRef={messagesEndRef}
                            />

                            <ChatInput
                                input={input} 
                                setInput={setInput}
                                handleSendMessage={handleSendMessage}
                                isListening={isListening}
                                isMuted={isMuted}
                                toggleListening={toggleListening}
                                toggleMute={toggleMute}
                                handleShowRecommendations={handleShowRecommendations}
                            />
                        </div>

                        {cartItems.length > 0 && (
                            <CartSummary 
                                cartItems={cartItems} 
                                setCartItems={setCartItems} 
                            />
                        )}
                    </div>
                </main>
            </div>
        </PageTransition>
    );
};

export default Chat;