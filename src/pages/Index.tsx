
import React, { useEffect, useRef} from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ArrowRight, ShoppingCart, Shield, Zap, MessageSquare, Users, CreditCard, User, Home, Bot, MessageCircle } from 'lucide-react';

import Navbar from '@/components/Navbar';
import AnimatedAssistant from '@/components/AnimatedAssistant';
import PageTransition from '@/components/PageTransition';
import Footer from '@/components/Footer';
import ParentalControls from '@/components/ParentalControls';
import ProductCarousel from '@/components/ProductCarousel';
import Features from '@/components/Features';
import Hero from '@/components/Hero';


const Index = () => {
    return (
        <PageTransition>
            <div className="min-h-screen">
                <Navbar />

                <Hero />
                <Features />
                <HowItWorks />
                <ProductCarousel />
                <Testimonials />
                <CTASection />
                <ParentalControls />
                <Footer />
            </div>
        </PageTransition>
    );
};

const HowItWorks = () => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const steps = [
        {
            number: "01",
            title: "Parents create accounts",
            description: "Set up profiles for your kids and configure their spending limits"
        },
        {
            number: "02",
            title: "Kids chat with AI assistant",
            description: "The AI helps find products tailored to their interests and needs"
        },
        {
            number: "03",
            title: "Select items for purchase",
            description: "Items are checked against available balance and parental rules"
        },
        {
            number: "04",
            title: "Complete secure checkout",
            description: "Parents can approve purchases and track delivery status"
        },
    ];

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="absolute top-1/4 right-0 w-96 h-96 bg-brand-blue/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-coral/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        How <span className="gradient-text">Shopmeai</span> Works
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        A simple process designed for both parents and children
                    </motion.p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="relative"
                            variants={itemVariants}
                        >
                            <div className="glass-card p-6 h-full">
                                <div className="text-5xl font-bold text-brand-blue/10 mb-4">{step.number}</div>
                                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-1/2 left-full -translate-y-1/2 w-12 z-10">
                                    <ArrowRight className="w-6 h-6 text-brand-blue/30" />
                                </div>
                            )}
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    const testimonials = [
        {
            quote: "Shopmeai has taught my 10-year-old more about budgeting than any allowance system we've tried before.",
            author: "Amanda K.",
            role: "Mother of two"
        },
        {
            quote: "The parental controls give me complete peace of mind, while my kids love chatting with the AI assistant.",
            author: "Michael T.",
            role: "Father of three"
        },
        {
            quote: "My daughter is learning financial responsibility in a fun and engaging way. It's been transformative!",
            author: "Sarah L.",
            role: "Mother of one"
        }
    ];

    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.2,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1]
            }
        }
    };

    return (
        <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        What Parents Are <span className="gradient-text">Saying</span>
                    </motion.h2>
                    <motion.p
                        className="text-lg text-gray-600"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Join thousands of families already using Shopmeai
                    </motion.p>
                </div>

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-8"
                    ref={ref}
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="glass-card p-6"
                            variants={itemVariants}
                        >
                            <div className="mb-4 text-brand-blue">
                                <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.33333 22.6667H16L18.6667 17.3333V9.33333H5.33333V17.3333H12L9.33333 22.6667ZM21.3333 22.6667H28L30.6667 17.3333V9.33333H17.3333V17.3333H24L21.3333 22.6667Z" fill="currentColor" />
                                </svg>
                            </div>
                            <p className="text-gray-700 mb-4">{testimonial.quote}</p>
                            <div>
                                <p className="font-medium">{testimonial.author}</p>
                                <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

const CTASection = () => {
    return (
        <section className="py-20 bg-white relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/5 to-brand-coral/5" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className="max-w-4xl mx-auto text-center glass-card p-10 backdrop-blur-sm">
                    <motion.h2
                        className="text-3xl sm:text-4xl font-bold mb-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        Ready to Transform How Your Kids <span className="gradient-text">Shop Online?</span>
                    </motion.h2>

                    <motion.p
                        className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Join thousands of families teaching their children financial responsibility while making online shopping safe and fun.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <Link to="/dashboard">
                            <motion.button
                                className="btn-primary"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                Get Started Free
                            </motion.button>
                        </Link>

                        <Link to="/chat">
                            <motion.button
                                className="btn-secondary"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                            >
                                See Demo
                            </motion.button>
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default Index;
