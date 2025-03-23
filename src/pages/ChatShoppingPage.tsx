// @/components/childchat/ChatShoppingPage.tsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import PageTransition from '@/components/landingApp/PageTransition';
import AnimatedBackground from '@/components/childchat/AnimatedBackground';
import Header from '@/components/childchat/Header';
import AssistantSection from '@/components/childchat/AssistantSection';
import ChatHistory from '@/components/childchat/ChatHistory';
import SearchBar from '@/components/childchat/SearchBar';
import ProductGrid from '@/components/childchat/ProductGrid';
import ProductDetails from '@/components/childchat/ProductDetails';
import { Product, Message } from '@/types/types';
import { sampleProducts } from '@/components/childchat/data';
import { 
    initSpeechRecognition, 
    startListening, 
    stopListening, 
    createWakeWordListener 
} from '@/services/speechService';
import { speakText } from '@/services/elevenlabs';

const ChatShoppingPage = () => {
    const navigate = useNavigate();
    const [balance] = useState(25.75);
    const [isListening, setIsListening] = useState(false);
    const [isBackgroundListening, setIsBackgroundListening] = useState(true);
    const [transcript, setTranscript] = useState('');
    const [messages, setMessages] = useState<Message[]>([
        { 
            sender: 'assistant', 
            text: "Hi there! I'm Penny, your shopping helper! Just say 'Hey Penny' when you want to talk to me!",
            audio: '/assets/audio/welcome.mp3'
        }
    ]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isAnimating, setIsAnimating] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const recognitionRef = useRef<SpeechRecognition | null>(null);
    const wakeWordRecognitionRef = useRef<SpeechRecognition | null>(null);
    const [wakeWordDetected, setWakeWordDetected] = useState(false);
    const [isProcessingWakeWord, setIsProcessingWakeWord] = useState(false);
    
    // List of wake words that can activate Penny
    const wakeWords = ['hey penny', 'hi penny', 'hello penny', 'okay penny'];

    // Set up main speech recognition for active listening
    useEffect(() => {
        recognitionRef.current = initSpeechRecognition();
        
        return () => {
            if (recognitionRef.current && isListening) {
                stopListening(recognitionRef.current);
            }
        };
    }, []);

    // Set up dedicated wake word detection that runs continuously
    useEffect(() => {
        // Initialize wake word listener
        wakeWordRecognitionRef.current = createWakeWordListener(
            wakeWords,
            (detectedPhrase) => {
                console.log("Wake word detected in phrase:", detectedPhrase);
                handleWakeWordDetection();
            }
        );
        
        // Set background listening state based on initialization success
        setIsBackgroundListening(!!wakeWordRecognitionRef.current);
        
        return () => {
            // Clean up wake word listener on component unmount
            if (wakeWordRecognitionRef.current) {
                stopListening(wakeWordRecognitionRef.current);
            }
        };
    }, []);

    // Initialize product data
    useEffect(() => {
        setProducts(sampleProducts);
    }, []);

    // Handle wake word detection and transition to active listening
    const handleWakeWordDetection = () => {
        // Prevent duplicate processing
        if (isProcessingWakeWord || isListening) return;
        
        setIsProcessingWakeWord(true);
        setWakeWordDetected(true);
        
        // Stop wake word listener while we're processing
        if (wakeWordRecognitionRef.current) {
            stopListening(wakeWordRecognitionRef.current);
        }
        
        // Give visual/audio feedback that wake word was detected
        respondToUser("I'm listening! How can I help you shop today?");
        
        // Short delay for visual feedback, then start active listening
        setTimeout(() => {
            setWakeWordDetected(false);
            startActiveListening();
            setIsProcessingWakeWord(false);
        }, 1000);
    };

    // Start active listening mode (after wake word or button press)
    const startActiveListening = () => {
        if (recognitionRef.current && !isListening) {
            const success = startListening(
                recognitionRef.current,
                (newTranscript) => {
                    setTranscript(newTranscript);
                },
                () => {
                    // This runs when active listening ends
                    finishActiveListening();
                }
            );
            
            if (success) {
                setIsListening(true);
            }
        }
    };

    // End active listening and process the transcript
    const finishActiveListening = () => {
        setIsListening(false);
        
        // Process the final transcript if it exists
        if (transcript) {
            handleUserMessage(transcript);
            setTranscript('');
        }
        
        // Restart wake word detection after a short delay
        setTimeout(() => {
            if (wakeWordRecognitionRef.current && !isProcessingWakeWord) {
                // Re-initialize the wake word listener
                wakeWordRecognitionRef.current = createWakeWordListener(
                    wakeWords,
                    (detectedPhrase) => {
                        console.log("Wake word detected in phrase:", detectedPhrase);
                        handleWakeWordDetection();
                    }
                );
                setIsBackgroundListening(true);
            }
        }, 500);
    };

    // Function for manual microphone button
    const toggleListening = () => {
        if (isListening) {
            // Stop active listening
            if (recognitionRef.current) {
                stopListening(recognitionRef.current);
            }
            finishActiveListening();
        } else {
            // Start active listening
            startActiveListening();
        }
    };

    // Animated assistant talking effect
    useEffect(() => {
        // Start animation when the latest message is from the assistant
        if (messages.length > 0 && messages[messages.length - 1].sender === 'assistant') {
            setIsAnimating(true);
            
            // Play audio if available
            if (messages[messages.length - 1].audio && audioRef.current) {
                audioRef.current.src = messages[messages.length - 1].audio;
                audioRef.current.play();
                
                // Listen for audio end to stop animation
                audioRef.current.onended = () => setIsAnimating(false);
            } else {
                // Text-to-speech fallback with more natural settings
                if ('speechSynthesis' in window) {
                    const speech = new SpeechSynthesisUtterance(messages[messages.length - 1].text);
                    
                    // Use a more natural voice if available
                    const voices = window.speechSynthesis.getVoices();
                    if (voices.length > 0) {
                        // Try to find a natural sounding voice
                        const preferredVoice = voices.find(voice => 
                            voice.name.includes('Natural') || 
                            voice.name.includes('Premium') ||
                            voice.name.includes('Enhanced')
                        );
                        
                        if (preferredVoice) {
                            speech.voice = preferredVoice;
                        }
                    }
                    
                    // Use the elevenlabs service to speak text
                    speakText(messages[messages.length - 1].text)
                      .then(() => setIsAnimating(false))
                      .catch(() => {
                        // Fallback to browser's speech synthesis if elevenlabs fails
                        speech.onend = () => setIsAnimating(false);
                        speechSynthesis.speak(speech);
                      });
                } else {
                    // If TTS not available, just animate for a few seconds
                    setTimeout(() => setIsAnimating(false), 3000);
                }
            }
        }
    }, [messages]);

    const handleUserMessage = (text: string) => {
        // Add user message
        const newMessages: Message[] = [
            ...messages,
            { sender: 'user', text: text, audio: '' }
        ];
        setMessages(newMessages);
        
        // Process user input (in a real app, this would connect to an AI backend)
        setTimeout(() => {
            processUserInput(text);
        }, 1000);
    };

    const processUserInput = (input: string) => {
        const lowerInput = input.toLowerCase();
        
        // Simple keyword matching for demo purposes
        if (lowerInput.includes('toy') || lowerInput.includes('robot')) {
            searchProducts('robot');
            respondToUser("I found some cool robot toys! Take a look!");
        } else if (lowerInput.includes('dinosaur') || lowerInput.includes('dino')) {
            searchProducts('dinosaur');
            respondToUser("Rawr! Here are some awesome dinosaur puzzles!");
        } else if (lowerInput.includes('art') || lowerInput.includes('draw')) {
            searchProducts('art');
            respondToUser("Let's get creative! Check out these art supplies!");
        } else if (lowerInput.includes('science')) {
            searchProducts('science');
            respondToUser("Science is so fun! Look at this cool science kit!");
        } else if (lowerInput.includes('show all') || lowerInput.includes('everything')) {
            setProducts(sampleProducts);
            respondToUser("Here's everything in our toy shop!");
        } else if (lowerInput.includes('how much') || lowerInput.includes('money') || lowerInput.includes('balance')) {
            respondToUser(`You have $${balance.toFixed(2)} in your account. What would you like to buy?`);
        } else if (lowerInput.includes('buy') || lowerInput.includes('purchase')) {
            handlePurchaseIntent(lowerInput);
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi')) {
            respondToUser("Hi there! What toys would you like to look at today?");
        } else {
            respondToUser("I'm not sure what you're looking for. Try asking about toys, art supplies, or science kits!");
        }
    };

    const handlePurchaseIntent = (input: string) => {
        // Very simple product matching
        const matchedProduct = products.find(product => 
            input.toLowerCase().includes(product.name.toLowerCase())
        );
        
        if (matchedProduct) {
            if (balance >= matchedProduct.price) {
                respondToUser(`Great choice! The ${matchedProduct.name} costs $${matchedProduct.price.toFixed(2)}. To buy it, please ask your parent to help you complete the purchase.`);
                setSelectedProduct(matchedProduct);
            } else {
                respondToUser(`I'm sorry, the ${matchedProduct.name} costs $${matchedProduct.price.toFixed(2)}, but you only have $${balance.toFixed(2)}. Would you like to look at something else?`);
            }
        } else {
            respondToUser("Which item would you like to buy? Just tell me the name of the toy!");
        }
    };

    const respondToUser = (text: string) => {
        setMessages(prevMessages => [
            ...prevMessages,
            { sender: 'assistant', text: text }
        ]);
    };

    const searchProducts = (term: string) => {
        setSearchTerm(term);
        const filtered = sampleProducts.filter(
            product => product.name.toLowerCase().includes(term.toLowerCase()) ||
                      product.description.toLowerCase().includes(term.toLowerCase())
        );
        setProducts(filtered.length > 0 ? filtered : sampleProducts);
    };

    const handleSearchSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        searchProducts(searchTerm);
    };

    return (
        <PageTransition>
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-purple-200 to-pink-200">
                <AnimatedBackground />
                
                <audio ref={audioRef} style={{ display: 'none' }} />

                <div className="container mx-auto px-4 py-8 relative z-20">
                    <Header balance={balance} navigate={navigate} />

                    <div className="flex flex-col md:flex-row gap-6">
                        {/* Left side: Chat & Assistant */}
                        <div className="flex-1 flex flex-col">
                            <AssistantSection 
                                isAnimating={isAnimating} 
                                isListening={isListening || wakeWordDetected}
                                lastMessage={messages.length > 0 ? messages[messages.length - 1] : null} 
                            />

                            <ChatHistory 
                                messages={messages} 
                                isListening={isListening} 
                                transcript={transcript} 
                                toggleListening={toggleListening} 
                                isBackgroundListening={isBackgroundListening}
                                wakeWordDetected={wakeWordDetected}
                            />
                        </div>

                        {/* Right side: Products */}
                        <div className="flex-1">
                            <SearchBar 
                                searchTerm={searchTerm} 
                                setSearchTerm={setSearchTerm} 
                                handleSearchSubmit={handleSearchSubmit} 
                            />

                            <ProductGrid 
                                products={products} 
                                balance={balance} 
                                selectedProduct={selectedProduct} 
                                setSelectedProduct={setSelectedProduct} 
                                handleUserMessage={handleUserMessage} 
                            />
                        </div>
                    </div>
                </div>
                
                {/* Selected product popup */}
                <ProductDetails 
                    selectedProduct={selectedProduct} 
                    setSelectedProduct={setSelectedProduct} 
                    balance={balance} 
                    respondToUser={respondToUser} 
                />
            </div>
        </PageTransition>
    );
};

export default ChatShoppingPage;