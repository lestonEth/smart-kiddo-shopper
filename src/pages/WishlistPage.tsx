import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Star,
    Heart,
    Trash2,
    ShoppingCart,
    Share2,
    Filter,
    ArrowLeft,
    Gift,
    AlertTriangle,
    Sparkles
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [itemToDelete, setItemToDelete] = useState(null);
    const [showAddedToCart, setShowAddedToCart] = useState(false);
    const [addedItem, setAddedItem] = useState(null);
    const navigate = useNavigate();

    // Mock categories for filtering
    const categories = [
        { id: 'all', label: 'All Items' },
        { id: 'toys', label: 'Toys' },
        { id: 'books', label: 'Books' },
        { id: 'games', label: 'Games' },
        { id: 'crafts', label: 'Arts & Crafts' }
    ];

    const addToCart = (item) => {
        console.log(`Added ${item.name} to cart!`);
    }

    // Fetch wishlist items (mock data)
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setWishlistItems([
                {
                    id: 'item1',
                    name: 'Magical Unicorn Plush Toy',
                    price: 24.99,
                    image: '/images/unicorn-plush.jpg',
                    category: 'toys',
                    inStock: true,
                    dateAdded: '2025-03-15',
                    priceDropAlert: false,
                    priority: 'high',
                    rating: 4.7
                },
                {
                    id: 'item2',
                    name: 'Space Explorer Science Kit',
                    price: 34.99,
                    image: '/images/science-kit.jpg',
                    category: 'toys',
                    inStock: true,
                    dateAdded: '2025-03-10',
                    priceDropAlert: true,
                    priority: 'medium',
                    originalPrice: 39.99,
                    rating: 4.2
                },
                {
                    id: 'item3',
                    name: 'Dinosaur Encyclopedia',
                    price: 19.99,
                    image: '/images/dino-book.jpg',
                    category: 'books',
                    inStock: true,
                    dateAdded: '2025-03-05',
                    priceDropAlert: false,
                    priority: 'low',
                    rating: 4.9
                },
                {
                    id: 'item4',
                    name: 'Colorful Clay Modeling Set',
                    price: 15.99,
                    image: '/images/clay-set.jpg',
                    category: 'crafts',
                    inStock: false,
                    dateAdded: '2025-03-01',
                    priceDropAlert: false,
                    priority: 'medium',
                    notifyWhenAvailable: true,
                    rating: 3.8
                },
                {
                    id: 'item5',
                    name: 'Adventure Quest Board Game',
                    price: 29.99,
                    image: '/images/board-game.jpg',
                    category: 'games',
                    inStock: true,
                    dateAdded: '2025-02-25',
                    priceDropAlert: true,
                    priority: 'high',
                    originalPrice: 34.99,
                    rating: 4.5
                }
            ]);
            setLoading(false);
        }, 1500);
    }, []);

    // Filter wishlist items by category
    const filteredItems = wishlistItems.filter(item =>
        filter === 'all' || item.category === filter
    );

    // Sort by priority (high first) and then by date (newest first)
    const priorityOrder = { high: 1, medium: 2, low: 3 };
    const sortedItems = [...filteredItems].sort((a, b) => {
        // First sort by priority
        if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        }
        // Then sort by date (newest first)
        return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        exit: {
            scale: 0.8,
            opacity: 0,
            transition: { duration: 0.2 }
        }
    };

    // Handle adding item to cart
    const handleAddToCart = (item) => {
        setAddedItem(item);
        setShowAddedToCart(true);
        // Call actual add to cart function
        if (addToCart) addToCart(item);

        // Hide animation after 2 seconds
        setTimeout(() => {
            setShowAddedToCart(false);
            setAddedItem(null);
        }, 2000);
    };

    // Handle removing item from wishlist
    const handleRemoveItem = (item) => {
        setItemToDelete(item);
        setShowDeleteConfirm(true);
    };

    const confirmDelete = () => {
        setWishlistItems(wishlistItems.filter(item => item.id !== itemToDelete.id));
        setShowDeleteConfirm(false);
        setItemToDelete(null);
    };

    // Item priority badges
    const PriorityBadge = ({ priority }) => {
        let bgColor, textColor, icon;

        switch (priority) {
            case 'high':
                bgColor = 'bg-pink-200';
                textColor = 'text-pink-800';
                icon = <Sparkles className="w-3 h-3 mr-1" />;
                break;
            case 'medium':
                bgColor = 'bg-purple-200';
                textColor = 'text-purple-800';
                icon = <Star className="w-3 h-3 mr-1" />;
                break;
            case 'low':
                bgColor = 'bg-blue-200';
                textColor = 'text-blue-800';
                icon = <Heart className="w-3 h-3 mr-1" />;
                break;
            default:
                bgColor = 'bg-gray-200';
                textColor = 'text-gray-800';
                icon = <Star className="w-3 h-3 mr-1" />;
        }

        return (
            <div className={`flex items-center px-2 py-1 rounded-full ${bgColor} ${textColor} text-xs font-medium`}>
                {icon} {priority.charAt(0).toUpperCase() + priority.slice(1)}
            </div>
        );
    };

    // Calculate how long an item has been on the wishlist
    const getTimeOnWishlist = (dateAdded) => {
        const date = new Date(dateAdded);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return "1 day";
        if (diffDays < 30) return `${diffDays} days`;

        const diffMonths = Math.floor(diffDays / 30);
        if (diffMonths === 1) return "1 month";
        return `${diffMonths} months`;
    };

    // Rating component
    const RatingStars = ({ rating }) => {
        return (
            <div className="flex items-center mt-1">
                <div className="flex">
                    {[...Array(5)].map((_, i) => (
                        <Star 
                            key={i} 
                            className={`w-3 h-3 ${
                                i < Math.floor(rating) 
                                    ? 'text-yellow-400 fill-yellow-400' 
                                    : i < rating 
                                        ? 'text-yellow-400 fill-yellow-400 opacity-50' 
                                        : 'text-gray-300'
                            }`} 
                        />
                    ))}
                </div>
                <span className="text-xs text-gray-600 ml-1">
                    {rating}
                </span>
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-center mb-8"
            >
                <div className="flex items-center mb-4 md:mb-0">
                    <motion.div
                        initial={{ rotate: 0 }}
                        animate={{ rotate: [0, 15, -15, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                        <Star className="w-10 h-10 text-yellow-400 mr-3" />
                    </motion.div>
                    <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 font-comic">
                        Your Wishlist
                    </h1>
                </div>
                <button
                    onClick={() => navigate(-1)}
                    className="px-6 py-3 bg-indigo-500 text-white rounded-full font-comic font-medium shadow-lg hover:bg-indigo-600 transition-colors flex items-center"
                >
                    <ArrowLeft className="mr-2" /> Back Home
                </button>
            </motion.div>

            {/* Category Filter */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-2xl p-4 shadow-md mb-8 overflow-x-auto"
            >
                <div className="flex items-center space-x-3 mb-2">
                    <Filter className="text-indigo-500" />
                    <h3 className="font-comic font-bold text-gray-700">Filter by:</h3>
                </div>
                <div className="flex space-x-2">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setFilter(category.id)}
                            className={`px-4 py-2 rounded-full font-comic whitespace-nowrap ${filter === category.id
                                    ? 'bg-indigo-500 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {category.label}
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Wishlist Items */}
            {loading ? (
                <div className="flex justify-center items-center py-20">
                    <div className="animate-bounce">
                        <Star className="w-12 h-12 text-yellow-300" />
                    </div>
                    <p className="ml-4 font-comic text-xl text-gray-600">Loading your wishlist...</p>
                </div>
            ) : sortedItems.length === 0 ? (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                >
                    <div className="w-64 h-64 flex items-center justify-center">
                        <Gift className="w-32 h-32 text-gray-300" />
                    </div>
                    <h3 className="mt-4 font-comic text-2xl font-bold text-gray-700">Your wishlist is empty</h3>
                    <p className="mt-2 font-comic text-center text-gray-600 max-w-md">
                        {filter !== 'all'
                            ? `You don't have any ${filter} in your wishlist yet`
                            : "Start adding items to your wishlist when you find things you love!"}
                    </p>
                    <button
                        onClick={() => navigate('/ChatShoppingPage')}
                        className="mt-6 px-8 py-4 bg-coral-500 text-white rounded-full font-comic font-medium shadow-lg hover:bg-coral-600 transition-colors text-lg"
                    >
                        Discover Amazing Items
                    </button>
                </motion.div>
            ) : (
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {sortedItems.map((item) => (
                        <motion.div
                            key={item.id}
                            variants={itemVariants}
                            layout
                            className="relative bg-white rounded-3xl p-5 shadow-md border-2 border-gray-200 overflow-hidden"
                            whileHover={{
                                y: -5,
                                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                            }}
                        >
                            {/* Price Drop Alert */}
                            {item.priceDropAlert && (
                                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white rounded-full px-3 py-1 text-xs font-bold font-comic flex items-center">
                                    <AlertTriangle className="w-3 h-3 mr-1" /> Price Drop!
                                </div>
                            )}

                            {/* Out of Stock Overlay */}
                            {!item.inStock && (
                                <div className="absolute inset-0 bg-gray-800/60 z-10 flex flex-col items-center justify-center">
                                    <p className="text-white font-comic font-bold text-xl mb-2">Out of Stock</p>
                                    {item.notifyWhenAvailable && (
                                        <p className="text-white font-comic text-sm">We'll notify you when it's back!</p>
                                    )}
                                </div>
                            )}

                            {/* Item Image */}
                            <div className="relative h-48 mb-4 rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center">
                                {/* Placeholder for item image */}
                                <Gift className="w-16 h-16 text-gray-400" />
                                {/* This would be replaced with an actual image in production */}
                                {/* <img src={item.image} alt={item.name} className="w-full h-full object-cover" /> */}
                            </div>

                            {/* Item Info */}
                            <div className="mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-comic font-bold text-lg text-gray-800 leading-tight">{item.name}</h3>
                                    <PriorityBadge priority={item.priority} />
                                </div>

                                {/* Rating Stars */}
                                <RatingStars rating={item.rating} />

                                <div className="flex items-baseline mt-2">
                                    {item.originalPrice ? (
                                        <>
                                            <p className="font-comic font-bold text-xl text-coral-500">${item.price.toFixed(2)}</p>
                                            <p className="ml-2 font-comic text-sm text-gray-500 line-through">${item.originalPrice.toFixed(2)}</p>
                                            <p className="ml-2 font-comic text-sm text-green-600">
                                                Save ${(item.originalPrice - item.price).toFixed(2)}
                                            </p>
                                        </>
                                    ) : (
                                        <p className="font-comic font-bold text-xl text-coral-500">${item.price.toFixed(2)}</p>
                                    )}
                                </div>

                                <p className="text-sm text-gray-500 font-comic mt-2">
                                    Added {getTimeOnWishlist(item.dateAdded)} ago
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="flex justify-between">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1 mr-2 py-2 px-3 bg-coral-500 text-white rounded-xl font-comic font-medium flex items-center justify-center disabled:bg-gray-300 disabled:cursor-not-allowed"
                                    onClick={() => handleAddToCart(item)}
                                    disabled={!item.inStock}
                                >
                                    <ShoppingCart className="w-4 h-4 mr-1" /> Add to Cart
                                </motion.button>

                                <div className="flex">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-xl mr-2"
                                        onClick={() => {
                                            // Share functionality would go here
                                            alert(`Sharing ${item.name} with friends!`);
                                        }}
                                    >
                                        <Share2 className="w-4 h-4 text-gray-600" />
                                    </motion.button>

                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="w-10 h-10 flex items-center justify-center bg-red-100 hover:bg-red-200 rounded-xl"
                                        onClick={() => handleRemoveItem(item)}
                                    >
                                        <Trash2 className="w-4 h-4 text-red-600" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteConfirm && itemToDelete && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-3xl p-6 shadow-xl max-w-md w-full"
                        >
                            <h3 className="text-xl font-bold text-gray-800 font-comic mb-4">Remove from Wishlist?</h3>
                            <p className="text-gray-600 font-comic mb-6">
                                Do you really want to remove <span className="font-bold">{itemToDelete.name}</span> from your wishlist?
                            </p>

                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setShowDeleteConfirm(false)}
                                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-xl font-comic"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-xl font-comic"
                                >
                                    Remove
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Added to Cart Animation */}
            <AnimatePresence>
                {showAddedToCart && addedItem && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-4 rounded-xl shadow-lg z-50 flex items-center"
                    >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        <p className="font-comic font-medium">
                            {addedItem.name} added to your cart!
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Action Button - Back to Top */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-500 rounded-full shadow-lg flex items-center justify-center"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
                <Star className="w-8 h-8 text-white" />
            </motion.button>
        </div>
    );
};

export default WishlistPage;