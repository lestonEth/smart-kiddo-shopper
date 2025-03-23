
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Check } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  image: string;
  rating: number;
  description: string;
  onAddToCart?: () => void;
  inCart?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  price,
  image,
  rating,
  description,
  onAddToCart,
  inCart = false
}) => {
  return (
    <motion.div 
      className="glass-card overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
    >
      <div className="relative aspect-square overflow-hidden">
        <motion.img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform"
          whileHover={{ scale: 1.05 }}
        />
        <div className="absolute top-2 right-2">
          <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg flex items-center space-x-1 text-sm font-medium text-yellow-600">
            <Star className="h-3 w-3 fill-yellow-500 text-yellow-500" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-medium text-lg line-clamp-1">{name}</h3>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        
        <div className="mt-3 flex items-center justify-between">
          <span className="font-bold text-lg">${price.toFixed(2)}</span>
          
          <motion.button
            className={`px-3 py-2 rounded-lg flex items-center space-x-1 ${
              inCart 
                ? 'bg-green-500 text-white' 
                : 'bg-brand-blue text-white'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddToCart}
            disabled={inCart}
          >
            {inCart ? (
              <>
                <Check className="h-4 w-4" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4" />
                <span>Add</span>
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
