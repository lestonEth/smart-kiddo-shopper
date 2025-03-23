import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, PackageCheck, Star, BookOpen } from 'lucide-react';

const ActionCards = ({ navigate }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <ActionCard 
                icon={<ShoppingCart className="w-10 h-10 text-brand-blue" />}
                title="Shop"
                description="Find awesome things to buy!"
                bgClass="from-brand-blue-light to-blue-50"
                borderClass="border-blue-400"
                iconClass="text-brand-blue"
                textClass="text-brand-blue-dark"
                onClick={() => navigate('/ChatShoppingPage')}
                variants={itemVariants}
            />

            <ActionCard 
                icon={<PackageCheck className="w-10 h-10 text-brand-coral" />}
                title="Orders"
                description="See your purchases history!"
                bgClass="from-brand-coral-light to-orange-50"
                borderClass="border-orange-400"
                iconClass="text-brand-coral"
                textClass="text-brand-coral-dark"
                iconAnimation={{ 
                    y: [0, -5, 0],
                    scale: [1, 1.1, 1]
                }}
                iconTransition={{ duration: 1.5, repeat: Infinity }}
                variants={itemVariants}
                onClick={() => navigate('/OrdersPage')}
            />

            <ActionCard 
                icon={<Star className="w-10 h-10 text-purple-500" />}
                title="Wish List"
                description="Save items for later!"
                bgClass="from-purple-200 to-purple-50"
                borderClass="border-purple-400"
                iconClass="text-purple-500"
                textClass="text-purple-700"
                iconAnimation={{ 
                    rotate: [0, 20, -20, 0]
                }}
                iconTransition={{ duration: 2, repeat: Infinity }}
                variants={itemVariants}
                onClick={() => navigate('/WishListPage')}
            />

            <ActionCard 
                icon={<BookOpen className="w-10 h-10 text-green-500" />}
                title="Learn"
                description="Discover how things work!"
                bgClass="from-green-200 to-green-50"
                borderClass="border-green-400"
                iconClass="text-green-500"
                textClass="text-green-700"
                iconAnimation={{ 
                    scale: [1, 1.2, 1]
                }}
                iconTransition={{ duration: 1.5, repeat: Infinity }}
                variants={itemVariants}
                onClick={() => navigate('/LearnPage')}
            />
        </motion.div>
    );
};

// Individual Action Card Component
const ActionCard = ({ 
    icon, 
    title, 
    description, 
    bgClass, 
    borderClass,
    textClass,
    iconAnimation = { rotate: [0, 10, -10, 0] },
    iconTransition = { duration: 4, repeat: Infinity },
    onClick,
    variants
}) => {
    return (
        <motion.div
            className={`glass-card bg-gradient-to-br ${bgClass} p-6 rounded-3xl shadow-xl border-4 ${borderClass}`}
            variants={variants}
            whileHover={{ 
                y: -15, 
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                rotate: [0, 2, -2, 0],
                transition: {
                    rotate: {
                        duration: 0.5,
                        repeat: 2
                    }
                }
            }}
            onClick={onClick}
        >
            <motion.div 
                className="bg-white/40 w-16 h-16 rounded-full flex items-center justify-center mb-4"
                animate={iconAnimation}
                transition={iconTransition}
            >
                {icon}
            </motion.div>
            <h3 className={`text-xl font-bold ${textClass} mb-2 font-comic`}>{title}</h3>
            <p className={`${textClass}/70 font-comic`}>{description}</p>
        </motion.div>
    );
};

export default ActionCards;