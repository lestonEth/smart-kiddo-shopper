import { Bot, Heart, Twitter, Facebook, Instagram, Youtube, Github } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-16 px-6 md:px-12">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2">
                        <div className="flex items-center space-x-2 mb-4">
                            <Bot size={28} className="text-primary" />
                            <span className="font-bold text-xl">ShopMeai Assistant</span>
                        </div>
                        <p className="text-gray-400 mb-6 max-w-md">
                            An AI-powered shopping assistant that helps children learn about shopping while keeping parents in control.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Twitter size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-primary transition-colors">
                                <Youtube size={18} />
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Product</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Features</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pricing</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Company</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Press</a></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-semibold text-lg mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Help Center</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact Us</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 text-sm mb-4 md:mb-0">
                        &copy; {new Date().getFullYear()} ShopMeai Assistant. All rights reserved.
                    </p>
                    <div className="flex items-center text-gray-500 text-sm">
                        <span>Made with</span>
                        <Heart size={14} className="mx-1 text-red-500" />
                        <span>by ShopMeai Team</span>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;