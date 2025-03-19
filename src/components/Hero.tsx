import { useEffect, useRef } from 'react';
import { ArrowRight, ShoppingCart, Bot, MessageCircle } from 'lucide-react';

const Hero = () => {
    const observerRef = useRef<IntersectionObserver | null>(null);

    useEffect(() => {
        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        };

        observerRef.current = new IntersectionObserver(observerCallback, {
            threshold: 0.1
        });

        const elements = document.querySelectorAll('.reveal-item');
        elements.forEach(el => observerRef.current?.observe(el));

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, []);

    return (
        <section className="relative min-h-screen pt-32 pb-20 px-6 md:px-12 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 right-0 bottom-0 -z-10">
                <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-blue-50 via-white to-indigo-50 opacity-80"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-200 rounded-full filter blur-[80px] opacity-30 animate-pulse-light"></div>
                <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-indigo-200 rounded-full filter blur-[60px] opacity-30 animate-pulse-light animation-delay-1000"></div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                    {/* Left Content */}
                    <div className="flex flex-col justify-center">
                        <div className="inline-flex items-center px-3 py-1 mb-6 rounded-full bg-blue-100 text-blue-600 font-medium text-sm reveal-item opacity-0 animate-fade-in scale-up">
                            <Bot size={16} className="mr-2" />
                            <span>AI-Powered Shopping Assistant</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight reveal-item opacity-0 animate-fade-in-delay-1 scale-up">
                            Smart Shopping for Kids, <span className="text-gradient">Controlled by Parents</span>
                        </h1>

                        <p className="mt-6 text-lg text-muted-foreground reveal-item opacity-0 animate-fade-in-delay-2">
                            Introducing a revolutionary AI shopping companion that helps children learn about shopping while keeping parents in control of spending, product selections, and safety.
                        </p>

                        <div className="mt-10 flex flex-col sm:flex-row gap-4 reveal-item opacity-0 animate-fade-in-delay-3">
                            <a href="#" className="cta-button px-6 py-3 rounded-full bg-primary text-primary-foreground font-medium shadow-lg hover:shadow-blue-200/50 hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center">
                                <span>Get Started</span>
                                <ArrowRight size={18} className="ml-2" />
                            </a>
                            <a href="#" className="cta-button px-6 py-3 rounded-full bg-white border border-gray-200 text-foreground font-medium shadow hover:shadow-lg hover:translate-y-[-2px] transition-all duration-300 flex items-center justify-center">
                                <MessageCircle size={18} className="mr-2 text-primary" />
                                <span>Chat with AI</span>
                            </a>
                        </div>

                        <div className="mt-12 flex items-center opacity-0 reveal-item animate-fade-in-delay-4">
                            <div className="flex -space-x-3">
                                <div className="w-8 h-8 rounded-full bg-blue-500 border-2 border-white flex items-center justify-center text-white text-xs">JD</div>
                                <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-white flex items-center justify-center text-white text-xs">AR</div>
                                <div className="w-8 h-8 rounded-full bg-purple-500 border-2 border-white flex items-center justify-center text-white text-xs">TK</div>
                            </div>
                            <div className="ml-4 text-sm text-muted-foreground">
                                <span className="font-medium text-foreground">2,000+</span> families already shopping smarter
                            </div>
                        </div>
                    </div>

                    {/* Right Content - AI Bot Visual */}
                    <div className="flex items-center justify-center relative reveal-item opacity-0 animate-fade-in-delay-2 scale-up">
                        <div className="relative">
                            {/* Decorative Element - Orbiting Ring */}
                            <div className="absolute inset-0 rounded-full border-2 border-dashed border-blue-200 animate-[spin_20s_linear_infinite] opacity-70"></div>

                            {/* Main Bot Display */}
                            <div className="relative z-10 bg-white rounded-3xl shadow-2xl p-6 glass-card transform transition-transform duration-500 hover:scale-105 hover:rotate-3">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center">
                                        <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                            <Bot size={20} className="text-white" />
                                        </div>
                                        <div className="ml-3">
                                            <h3 className="font-semibold">ShopMeai AI</h3>
                                            <div className="flex items-center">
                                                <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                                                <span className="text-xs text-muted-foreground">Online</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <ShoppingCart size={18} className="text-muted-foreground" />
                                        <div className="ml-2 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">2</div>
                                    </div>
                                </div>

                                <div className="p-4 rounded-2xl bg-blue-50 mb-3 max-w-[80%]">
                                    <p className="text-sm">Hi there! I'm your ShopMeai AI shopping assistant. What would you like to shop for today?</p>
                                </div>

                                <div className="p-4 rounded-2xl bg-primary/10 mb-3 max-w-[80%] ml-auto">
                                    <p className="text-sm">I want to buy a science kit for my school project.</p>
                                </div>

                                <div className="p-4 rounded-2xl bg-blue-50 mb-3 max-w-[80%] animate-pulse-light">
                                    <p className="text-sm">Great choice! Let me show you some science kits that are approved by your parents and within your budget.</p>
                                </div>

                                <div className="mt-4 flex items-center">
                                    <input
                                        type="text"
                                        placeholder="Type your message..."
                                        className="flex-1 px-4 py-2 rounded-full bg-secondary text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
                                    />
                                    <button className="ml-2 w-9 h-9 rounded-full bg-primary flex items-center justify-center text-white">
                                        <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div>

                            {/* Decorative Floating Bubbles */}
                            <div className="absolute -top-10 -right-8 w-24 h-24 bg-blue-100 rounded-full parent-bubble p-3">
                                <div className="w-full h-full rounded-full border-2 border-blue-200 flex items-center justify-center">
                                    <ShoppingCart className="text-blue-500" size={20} />
                                </div>
                            </div>

                            <div className="absolute -bottom-12 -left-10 w-20 h-20 bg-indigo-100 rounded-full child-bubble p-3">
                                <div className="w-full h-full rounded-full border-2 border-indigo-200 flex items-center justify-center">
                                    <div className="text-xs font-bold text-indigo-500">$25</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center opacity-0 reveal-item animate-fade-in-delay-4">
                <span className="text-xs text-muted-foreground mb-2">Scroll to explore</span>
                <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center">
                    <div className="w-1 h-2 bg-muted-foreground rounded-full mt-2 animate-[bounce_2s_ease-in-out_infinite]"></div>
                </div>
            </div>
        </section>
    );
};

export default Hero;