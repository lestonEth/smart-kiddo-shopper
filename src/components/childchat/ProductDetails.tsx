import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { Product } from '@/types/types';

interface ProductDetailsProps {
    selectedProduct: Product | null;
    setSelectedProduct: (product: Product | null) => void;
    balance: number;
    respondToUser: (text: string) => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
    selectedProduct,
    setSelectedProduct,
    balance,
    respondToUser
}) => {
    if (!selectedProduct) return null;

    return (
        <AnimatePresence>
            {selectedProduct && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="bg-white rounded-3xl p-6 max-w-lg w-full relative"
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        transition={{ type: "spring", damping: 20 }}
                    >
                        <button 
                            className="absolute top-4 right-4 bg-gray-200 rounded-full p-1"
                            onClick={() => setSelectedProduct(null)}
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                        
                        <div className="flex flex-col sm:flex-row items-center mb-4">
                            <div className="w-40 h-40 bg-gray-100 rounded-xl flex items-center justify-center mb-4 sm:mb-0 sm:mr-4">
                                <img 
                                    src={selectedProduct.image || `/api/placeholder/200/200`}
                                    alt={selectedProduct.name}
                                    className="max-h-32 max-w-32 object-contain"
                                />
                            </div>
                            
                            <div>
                                <h2 className="text-xl font-bold text-indigo-800 font-comic">
                                    {selectedProduct.name}
                                </h2>
                                <div className="flex items-center mt-1 mb-2">
                                    <div className="flex">
                                        {[...Array(5)].map((_, i) => (
                                            <Star 
                                                key={i} 
                                                className={`w-4 h-4 ${
                                                    i < Math.floor(selectedProduct.rating) 
                                                        ? 'text-yellow-400 fill-yellow-400' 
                                                        : i < selectedProduct.rating 
                                                            ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                                                            : 'text-gray-300'
                                                }`} 
                                            />
                                        ))}
                                    </div>
                                    <span className="text-xs text-gray-600 ml-1">
                                        {selectedProduct.rating}
                                    </span>
                                </div>
                                <p className="text-gray-600 font-comic">{selectedProduct.description}</p>
                                <motion.p 
                                    className="text-2xl font-bold text-brand-coral mt-2 font-comic"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                >
                                    ${selectedProduct.price.toFixed(2)}
                                </motion.p>
                            </div>
                        </div>
                        
                        {selectedProduct.price <= balance ? (
                            <div className="bg-green-100 rounded-xl p-4 mb-4 border-2 border-green-300">
                                <p className="text-green-800 font-comic">
                                    You have enough money to buy this! You have ${balance.toFixed(2)} and this toy costs ${selectedProduct.price.toFixed(2)}.
                                </p>
                            </div>
                        ) : (
                            <div className="bg-orange-100 rounded-xl p-4 mb-4 border-2 border-orange-300">
                                <p className="text-orange-800 font-comic">
                                    This toy costs ${selectedProduct.price.toFixed(2)}, but you only have ${balance.toFixed(2)}. You need ${(selectedProduct.price - balance).toFixed(2)} more to buy it.
                                </p>
                            </div>
                        )}
                        
                        <div className="flex justify-end space-x-3">
                            <motion.button
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full font-comic"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setSelectedProduct(null)}
                            >
                                Cancel
                            </motion.button>
                            
                            <motion.button
                                className={`px-4 py-2 rounded-full font-comic ${
                                    selectedProduct.price <= balance
                                        ? 'bg-green-500 text-white'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                }`}
                                whileHover={selectedProduct.price <= balance ? { scale: 1.05 } : {}}
                                whileTap={selectedProduct.price <= balance ? { scale: 0.95 } : {}}
                                onClick={() => {
                                    if (selectedProduct.price <= balance) {
                                        respondToUser(`Great choice! The ${selectedProduct.name} will be delivered to you soon. Please ask a parent to help you complete your purchase.`);
                                        setSelectedProduct(null);
                                    }
                                }}
                            >
                                Buy Now
                            </motion.button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default ProductDetails;