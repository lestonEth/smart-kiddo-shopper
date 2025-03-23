import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Package,
    Truck,
    CheckCircle,
    Calendar,
    ArrowLeft,
    Search,
    ShoppingBag,
    Stars
} from 'lucide-react';
import Lottie from 'react-lottie';
import confettiAnimation from '@/components/animations/confetti.json';
import deliveryTruckAnimation from '@/components/animations/delivery-truck.json';
import emptyBoxAnimation from '@/components/animations/empty-box.json';
import searchingAnimation from '@/components/animations/empty-box.json';
import { useNavigate } from 'react-router-dom';

const OrdersPage = () => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // Animation options for Lottie
    const defaultOptions = {
        loop: true,
        autoplay: true,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const confettiOptions = {
        ...defaultOptions,
        animationData: confettiAnimation,
    };

    const truckOptions = {
        ...defaultOptions,
        animationData: deliveryTruckAnimation,
    };

    const emptyBoxOptions = {
        ...defaultOptions,
        animationData: emptyBoxAnimation,
    };

    const searchingOptions = {
        ...defaultOptions,
        animationData: searchingAnimation,
    };

    // Mock data - in a real app, this would come from an API
    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setOrders([
                {
                    id: 'ORD123456',
                    date: '2025-03-20',
                    status: 'delivered',
                    items: [
                        { id: 1, name: 'Super Robot Action Figure', price: 24.99, image: '/images/robot-toy.jpg' },
                        { id: 2, name: 'Dinosaur Coloring Book', price: 12.50, image: '/images/dino-book.jpg' }
                    ],
                    total: 37.49,
                    deliveryDate: '2025-03-22',
                    trackingNumber: 'TRK78901234'
                },
                {
                    id: 'ORD789012',
                    date: '2025-03-15',
                    status: 'shipped',
                    items: [
                        { id: 3, name: 'Magic Science Kit', price: 35.99, image: '/images/science-kit.jpg' }
                    ],
                    total: 35.99,
                    deliveryDate: '2025-03-25',
                    trackingNumber: 'TRK45678901'
                },
                {
                    id: 'ORD345678',
                    date: '2025-03-10',
                    status: 'processing',
                    items: [
                        { id: 4, name: 'Space Rocket Building Blocks', price: 42.99, image: '/images/rocket-blocks.jpg' },
                        { id: 5, name: 'Astronaut Helmet', price: 28.50, image: '/images/astronaut-helmet.jpg' }
                    ],
                    total: 71.49,
                    deliveryDate: 'Estimated: 2025-03-28',
                    trackingNumber: 'Processing'
                }
            ]);
            setLoading(false);
        }, 1500);
    }, []);

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
            order.items.some(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesFilter = filterStatus === 'all' || order.status === filterStatus;

        return matchesSearch && matchesFilter;
    });

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.2
            }
        },
        exit: {
            opacity: 0,
            transition: { when: "afterChildren" }
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
        },
        hover: {
            scale: 1.05,
            boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
            y: -5
        }
    };

    const StatusBadge = ({ status }) => {
        let icon, bgColor, textColor, label;

        switch (status) {
            case 'processing':
                icon = <Stars className="mr-1 w-4 h-4" />;
                bgColor = 'bg-purple-200';
                textColor = 'text-purple-800';
                label = 'Getting Ready';
                break;
            case 'shipped':
                icon = <Truck className="mr-1 w-4 h-4" />;
                bgColor = 'bg-blue-200';
                textColor = 'text-blue-800';
                label = 'On the Way';
                break;
            case 'delivered':
                icon = <CheckCircle className="mr-1 w-4 h-4" />;
                bgColor = 'bg-green-200';
                textColor = 'text-green-800';
                label = 'Delivered';
                break;
            default:
                icon = <Package className="mr-1 w-4 h-4" />;
                bgColor = 'bg-gray-200';
                textColor = 'text-gray-800';
                label = status;
        }

        return (
            <div className={`flex items-center px-3 py-1 rounded-full ${bgColor} ${textColor} font-medium text-sm`}>
                {icon} {label}
            </div>
        );
    };

    const OrderDetail = ({ order, onBack }) => {
        return (
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                className="bg-white rounded-3xl p-6 shadow-xl border-4 border-brand-blue-light"
            >
                <div className="flex justify-between items-center mb-6">
                    <button
                        onClick={onBack}
                        className="flex items-center text-brand-blue-dark font-comic text-lg"
                    >
                        <ArrowLeft className="mr-2" /> Back to Orders
                    </button>

                    <div className="flex items-center space-x-4">
                        <p className="font-comic text-lg text-gray-600">Order ID: <span className="font-bold text-brand-blue-dark">{order.id}</span></p>
                        <StatusBadge status={order.status} />
                    </div>
                </div>

                {order.status === 'delivered' && (
                    <div className="relative h-20 mb-6">
                        <Lottie options={confettiOptions} height={200} width={200} style={{ position: 'absolute', top: -80, left: '50%', transform: 'translateX(-50%)' }} />
                        <div className="bg-green-100 rounded-2xl p-4 text-center">
                            <p className="font-comic text-xl text-green-800 font-bold">Yay! Your order has arrived! 🎉</p>
                        </div>
                    </div>
                )}

                {order.status === 'shipped' && (
                    <div className="relative h-60 mb-6">
                        <Lottie options={truckOptions} height={150} width={200} />
                        <div className="bg-blue-100 rounded-2xl p-4 text-center mt-4">
                            <p className="font-comic text-xl text-blue-800 font-bold">Your package is on its way! 🚚</p>
                        </div>
                    </div>
                )}

                {order.status === 'processing' && (
                    <div className="bg-purple-100 rounded-2xl p-4 text-center mb-6">
                        <p className="font-comic text-xl text-purple-800 font-bold">We're preparing your awesome items! ✨</p>
                    </div>
                )}

                <div className="mb-6">
                    <h3 className="font-comic font-bold text-xl text-brand-blue-dark mb-4">Order Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-blue-50 rounded-2xl p-4">
                            <div className="flex items-center mb-2">
                                <Calendar className="mr-2 text-brand-blue" />
                                <h4 className="font-comic font-bold text-brand-blue-dark">Order Date</h4>
                            </div>
                            <p className="font-comic text-gray-700">{new Date(order.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</p>
                        </div>

                        <div className="bg-blue-50 rounded-2xl p-4">
                            <div className="flex items-center mb-2">
                                <Truck className="mr-2 text-brand-blue" />
                                <h4 className="font-comic font-bold text-brand-blue-dark">Delivery Info</h4>
                            </div>
                            <p className="font-comic text-gray-700">
                                {typeof order.deliveryDate === 'string' && order.deliveryDate.includes('Estimated')
                                    ? order.deliveryDate
                                    : `Delivery Date: ${new Date(order.deliveryDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}`
                                }
                            </p>
                            <p className="font-comic text-gray-700">Tracking: {order.trackingNumber}</p>
                        </div>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="font-comic font-bold text-xl text-brand-blue-dark mb-4">Items</h3>
                    <div className="space-y-4">
                        {order.items.map((item) => (
                            <motion.div
                                key={item.id}
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring" }}
                                className="flex items-center p-4 bg-white rounded-2xl shadow-md border-2 border-gray-200"
                            >
                                <div className="w-16 h-16 bg-gray-200 rounded-xl mr-4 overflow-hidden flex items-center justify-center">
                                    {/* Placeholder for item image */}
                                    <ShoppingBag size={30} className="text-gray-400" />
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-comic font-bold text-gray-800">{item.name}</h4>
                                    <p className="font-comic text-brand-coral font-bold">${item.price.toFixed(2)}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="mt-8 bg-brand-blue-light/20 rounded-2xl p-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-comic font-bold text-xl text-brand-blue-dark">Total</h3>
                        <p className="font-comic font-bold text-2xl text-brand-coral">${order.total.toFixed(2)}</p>
                    </div>
                </div>
            </motion.div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col md:flex-row justify-between items-center mb-8"
            >
                <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-dark font-comic mb-4 md:mb-0">
                    Your Awesome Orders
                </h1>
                <button
                    onClick={() => navigate('/child-dashboard')}
                    className="px-6 py-3 bg-brand-blue text-white rounded-full font-comic font-medium shadow-lg hover:bg-brand-blue-dark transition-colors flex items-center"
                >
                    <ArrowLeft className="mr-2" /> Back Home
                </button>
            </motion.div>

            <AnimatePresence mode="wait">
                {selectedOrder ? (
                    <OrderDetail
                        key="orderDetail"
                        order={selectedOrder}
                        onBack={() => setSelectedOrder(null)}
                    />
                ) : (
                    <motion.div
                        key="ordersList"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        <div className="bg-white rounded-3xl p-6 shadow-lg border-4 border-brand-blue-light mb-8">
                            <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                                <div className="relative flex-grow">
                                    <input
                                        type="text"
                                        placeholder="Search your orders..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-12 pr-4 py-3 rounded-full bg-gray-100 focus:bg-white border-2 border-gray-200 focus:border-brand-blue-light focus:outline-none font-comic text-gray-700"
                                    />
                                    <Search className="absolute left-4 top-3.5 text-gray-400" />
                                </div>

                                <div className="flex space-x-2">
                                    {['all', 'processing', 'shipped', 'delivered'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => setFilterStatus(status)}
                                            className={`px-4 py-2 rounded-full font-comic ${filterStatus === status
                                                    ? 'bg-brand-blue text-white shadow-md'
                                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                                }`}
                                        >
                                            {status === 'all' ? 'All Orders' :
                                                status === 'processing' ? 'Getting Ready' :
                                                    status === 'shipped' ? 'On the Way' : 'Delivered'}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Lottie options={searchingOptions} height={200} width={200} />
                                <p className="mt-4 font-comic text-xl text-gray-600">Looking for your orders...</p>
                            </div>
                        ) : filteredOrders.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12">
                                <Lottie options={emptyBoxOptions} height={200} width={200} />
                                <h3 className="mt-4 font-comic text-2xl font-bold text-gray-700">No orders found</h3>
                                <p className="mt-2 font-comic text-gray-600">
                                    {searchQuery ? "We couldn't find any orders matching your search" : "You haven't placed any orders yet"}
                                </p>
                                <button
                                    onClick={() => navigate('/ChatShoppingPage')}
                                    className="mt-6 px-6 py-3 bg-brand-coral text-white rounded-full font-comic font-medium shadow-lg hover:bg-brand-coral-dark transition-colors"
                                >
                                    Start Shopping Now
                                </button>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-6">
                                {filteredOrders.map((order) => (
                                    <motion.div
                                        key={order.id}
                                        variants={itemVariants}
                                        whileHover="hover"
                                        onClick={() => setSelectedOrder(order)}
                                        className="bg-white rounded-2xl p-6 shadow-md border-2 border-gray-200 cursor-pointer"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                                            <div className="mb-4 md:mb-0">
                                                <div className="flex items-center mb-2">
                                                    <Package className="mr-2 text-brand-blue" />
                                                    <h3 className="font-comic font-bold text-lg text-gray-800">{order.id}</h3>
                                                </div>
                                                <p className="font-comic text-gray-600">
                                                    {new Date(order.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </p>
                                            </div>

                                            <div className="flex flex-col md:flex-row md:items-center space-y-3 md:space-y-0 md:space-x-4">
                                                <StatusBadge status={order.status} />
                                                <p className="font-comic font-bold text-lg text-brand-coral">${order.total.toFixed(2)}</p>
                                            </div>
                                        </div>

                                        <div className="mt-4 pt-4 border-t border-gray-100">
                                            <p className="font-comic text-gray-700 mb-2">Items:</p>
                                            <div className="flex flex-wrap gap-2">
                                                {order.items.map((item) => (
                                                    <div key={item.id} className="bg-gray-100 rounded-full px-3 py-1 text-sm font-comic text-gray-700">
                                                        {item.name}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <motion.div
                                            className="mt-4 text-brand-blue font-comic font-medium flex items-center"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 5 }}
                                        >
                                            View Order Details →
                                        </motion.div>
                                    </motion.div>
                                ))}
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default OrdersPage;