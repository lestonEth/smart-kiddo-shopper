import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, User, Settings, Home, MessageCircle, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AuthContext from "@/context/AuthContext"; // Import AuthContext

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const { user, logout } = useContext(AuthContext); // Get user and logout from context

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setIsOpen(false);
    }, [location.pathname]);

    const navItems = [
        { name: "Home", path: "/", icon: <Home className="h-4 w-4" /> },
        { name: "Dashboard", path: "/dashboard", icon: <ShoppingCart className="h-4 w-4" /> },
        { name: "Chat", path: "/chat", icon: <MessageCircle className="h-4 w-4" /> },
        { name: "Settings", path: "/settings", icon: <Settings className="h-4 w-4" /> },
    ];

    return (
        <motion.nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/80 backdrop-blur-lg shadow-md" : "bg-transparent"
                }`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link to="/" className="flex items-center space-x-2">
                            <motion.div
                                className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white font-bold text-xl"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                SM
                            </motion.div>
                            <motion.span
                                className="font-bold text-xl hidden sm:inline-block bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-coral"
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                Shopmeai
                            </motion.span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex md:items-center md:space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${location.pathname === item.path
                                        ? "text-brand-blue-dark bg-brand-blue/10"
                                        : "text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5"
                                    }`}
                            >
                                {item.icon}
                                <span>{item.name}</span>
                            </Link>
                        ))}
                    </div>

                    {/* User Section */}
                    <div className="hidden md:flex md:items-center md:space-x-4">
                        {user ? (
                            <>
                                <span className="text-gray-700 font-medium">{user.username}</span>
                                <button
                                    onClick={logout}
                                    className="flex items-center space-x-1 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-red-600 hover:bg-red-100"
                                >
                                    <LogOut className="h-4 w-4" />
                                    <span>Logout</span>
                                </button>
                            </>
                        ) : (
                            <Link to="/login">
                                <motion.button className="btn-secondary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    Login
                                </motion.button>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Menu Toggle */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-lg text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5 transition-all"
                        >
                            {isOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="md:hidden glass-panel fixed inset-x-4 top-20 rounded-2xl z-40 shadow-xl overflow-hidden"
                        initial={{ opacity: 0, y: -20, height: 0 }}
                        animate={{ opacity: 1, y: 0, height: "auto" }}
                        exit={{ opacity: 0, y: -20, height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navItems.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.path}
                                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-all duration-200 ${location.pathname === item.path
                                            ? "text-brand-blue-dark bg-brand-blue/10"
                                            : "text-gray-600 hover:text-brand-blue hover:bg-brand-blue/5"
                                        }`}
                                >
                                    {item.icon}
                                    <span>{item.name}</span>
                                </Link>
                            ))}

                            <div className="pt-2 pb-1">
                                {user ? (
                                    <button
                                        onClick={logout}
                                        className="flex items-center justify-center w-full btn-danger py-3"
                                    >
                                        Logout
                                    </button>
                                ) : (
                                    <Link to="/login" className="flex items-center justify-center w-full btn-primary py-3">
                                        Login
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );
};

export default Navbar;
