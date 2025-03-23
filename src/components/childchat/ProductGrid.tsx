import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types/types';
import { containerVariants, itemVariants } from './data';

interface ProductGridProps {
    products: Product[];
    balance: number;
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
    handleUserMessage: (text: string) => void;
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
    products, 
    balance, 
    selectedProduct, 
    setSelectedProduct, 
    handleUserMessage 
}) => {
    return (
        <motion.div 
            className="glass-card bg-white bg-opacity-80 rounded-3xl p-6 shadow-xl border-4 border-green-300 overflow-hidden h-[calc(100vh-16rem)]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            variants={containerVariants}
        >
            <h2 className="text-xl font-bold mb-4 text-green-800 font-comic">
                <ShoppingCart className="inline-block mr-2 w-6 h-6" />
                Fun Toys
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto max-h-full py-10">
                <AnimatePresence>
                    {products.map((product) => (
                        <motion.div
                            key={product.id}
                            className={`bg-white rounded-2xl p-4 shadow-md border-2 ${
                                selectedProduct?.id === product.id 
                                    ? 'border-yellow-400 ring-2 ring-yellow-300' 
                                    : 'border-gray-200'
                            }`}
                            variants={itemVariants}
                            whileHover={{ 
                                y: -5,
                                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)"
                            }}
                            onClick={() => setSelectedProduct(product)}
                        >
                            <div className="relative mb-3 bg-gray-100 rounded-xl overflow-hidden h-36 flex items-center justify-center">
                                <img 
                                    src={product.image || `/api/placeholder/150/150`} 
                                    alt={product.name}
                                    className="h-32 w-auto object-contain"
                                />
                                {product.price <= balance && (
                                    <motion.div 
                                        className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full"
                                        animate={{ 
                                            scale: [1, 1.1, 1],
                                            rotate: [0, 5, 0, -5, 0] 
                                        }}
                                        transition={{ duration: 2, repeat: Infinity }}
                                    >
                                        You can buy this!
                                    </motion.div>
                                )}
                            </div>
                            <h3 className="font-bold text-indigo-800 font-comic">{product.name}</h3>
                            <div className="flex items-center mt-1 mb-2">
                                <div className="flex">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i} 
                                            className={`w-4 h-4 ${
                                                i < Math.floor(product.rating) 
                                                    ? 'text-yellow-400 fill-yellow-400' 
                                                    : i < product.rating 
                                                        ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                                                        : 'text-gray-300'
                                            }`} 
                                        />
                                    ))}
                                </div>
                                <span className="text-xs text-gray-600 ml-1">
                                    {product.rating}
                                </span>
                            </div>
                            <p className="text-sm text-gray-600 font-comic">{product.description}</p>
                            <div className="mt-3 flex justify-between items-center">
                                <motion.span 
                                    className="font-bold text-lg text-brand-coral font-comic"
                                    animate={selectedProduct?.id === product.id ? {
                                        scale: [1, 1.1, 1],
                                    } : {}}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    ${product.price.toFixed(2)}
                                </motion.span>
                                <motion.button
                                    className={`px-3 py-1 rounded-full text-sm font-medium font-comic ${
                                        product.price <= balance 
                                            ? 'bg-green-500 text-white' 
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                    whileHover={product.price <= balance ? { scale: 1.05 } : {}}
                                    whileTap={product.price <= balance ? { scale: 0.95 } : {}}
                                    onClick={() => handleUserMessage(`I want to buy the ${product.name}`)}
                                >
                                    {product.price <= balance ? 'Buy This!' : 'Too Expensive'}
                                </motion.button>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
                
                {products.length === 0 && (
                    <motion.div 
                        className="col-span-2 text-center py-8 text-gray-500 font-comic"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        No toys found! Try searching for something else.
                    </motion.div>
                )}
            </div>
        </motion.div>
    );
};

export default ProductGrid;