// src/components/Chat/CartSummary.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, X } from 'lucide-react';

const CartSummary = ({ cartItems, setCartItems }) => {
    return (
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
    );
};

export default CartSummary;