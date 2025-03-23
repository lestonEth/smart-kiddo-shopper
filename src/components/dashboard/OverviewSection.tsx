import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, User, ShoppingBag } from 'lucide-react';

interface OverviewSectionProps {
    totalBalance: number;
    activeChildrenCount: number;
    purchasesThisMonth: number;
}

const OverviewSection: React.FC<OverviewSectionProps> = ({
    totalBalance,
    activeChildrenCount,
    purchasesThisMonth
}) => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Overview</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <motion.div
                    className="glass-card p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="bg-brand-blue/10 p-2 rounded-full">
                            <DollarSign className="h-5 w-5 text-brand-blue" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Total Balance</p>
                    <p className="text-2xl font-bold">${totalBalance.toFixed(2)}</p>
                </motion.div>

                <motion.div
                    className="glass-card p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="bg-green-100 p-2 rounded-full">
                            <User className="h-5 w-5 text-green-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Active Children</p>
                    <p className="text-2xl font-bold">{activeChildrenCount}</p>
                </motion.div>

                <motion.div
                    className="glass-card p-5"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                >
                    <div className="flex justify-between items-start mb-2">
                        <div className="bg-purple-100 p-2 rounded-full">
                            <ShoppingBag className="h-5 w-5 text-purple-600" />
                        </div>
                    </div>
                    <p className="text-sm text-gray-500">Purchases This Month</p>
                    <p className="text-2xl font-bold">{purchasesThisMonth}</p>
                </motion.div>
            </div>
        </section>
    );
};

export default OverviewSection;