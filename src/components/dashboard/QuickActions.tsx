import React from 'react';
import { motion } from 'framer-motion';
import { CreditCard, History, AlertOctagon } from 'lucide-react';

const QuickActions: React.FC = () => {
    return (
        <section>
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-3">
                <motion.button
                    className="w-full glass-card p-4 flex items-center space-x-3 text-left"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                >
                    <div className="bg-green-100 p-2 rounded-full">
                        <CreditCard className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                        <h3 className="font-medium">Add Funds</h3>
                        <p className="text-sm text-gray-500">Top up your child's balance</p>
                    </div>
                </motion.button>

                <motion.button
                    className="w-full glass-card p-4 flex items-center space-x-3 text-left"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                >
                    <div className="bg-purple-100 p-2 rounded-full">
                        <History className="h-5 w-5 text-purple-600" />
                    </div>
                    <div>
                        <h3 className="font-medium">Transaction History</h3>
                        <p className="text-sm text-gray-500">View all past transactions</p>
                    </div>
                </motion.button>

                <motion.button
                    className="w-full glass-card p-4 flex items-center space-x-3 text-left"
                    whileHover={{ y: -2 }}
                    whileTap={{ y: 0 }}
                >
                    <div className="bg-red-100 p-2 rounded-full">
                        <AlertOctagon className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                        <h3 className="font-medium">Restriction Settings</h3>
                        <p className="text-sm text-gray-500">Set purchase restrictions</p>
                    </div>
                </motion.button>
            </div>
        </section>
    );
};

export default QuickActions;