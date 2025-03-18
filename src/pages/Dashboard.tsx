
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import ParentControls from '@/components/ParentControls';
import { User, Plus, ChevronRight, CreditCard, Clock, DollarSign, AlertOctagon, History, ShoppingBag } from 'lucide-react';

// Sample data
const initialChildren = [
  {
    id: "1",
    name: "Emma",
    avatar: "E",
    balance: 45.50,
    spendingLimit: 20.00,
    active: true,
  },
  {
    id: "2",
    name: "Alex",
    avatar: "A",
    balance: 27.30,
    spendingLimit: 15.00,
    active: true,
  }
];

const recentActivities = [
  {
    id: "1",
    childName: "Emma",
    action: "Purchase",
    item: "LEGO Star Wars Set",
    amount: 19.99,
    date: "2 hours ago",
    status: "Completed"
  },
  {
    id: "2",
    childName: "Alex",
    action: "Balance Added",
    amount: 10.00,
    date: "Yesterday",
    status: "Completed"
  },
  {
    id: "3",
    childName: "Emma",
    action: "Purchase Attempt",
    item: "Headphones",
    amount: 35.99,
    date: "3 days ago",
    status: "Declined (Over limit)"
  },
];

const Dashboard = () => {
  const [children, setChildren] = useState(initialChildren);
  const [activities, setActivities] = useState(recentActivities);
  const [selectedChild, setSelectedChild] = useState<string | null>(null);

  const totalBalance = children.reduce((sum, child) => sum + child.balance, 0);
  
  const handleUpdateBalance = (childId: string, amount: number) => {
    setChildren(children.map(child => 
      child.id === childId ? { ...child, balance: amount } : child
    ));
  };
  
  const handleUpdateLimit = (childId: string, limit: number) => {
    setChildren(children.map(child => 
      child.id === childId ? { ...child, spendingLimit: limit } : child
    ));
  };
  
  const handleToggleActive = (childId: string, active: boolean) => {
    setChildren(children.map(child => 
      child.id === childId ? { ...child, active } : child
    ));
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Parent Dashboard</h1>
            <p className="text-gray-600">Manage your children's accounts and spending</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
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
                    <p className="text-2xl font-bold">{children.filter(c => c.active).length}</p>
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
                    <p className="text-2xl font-bold">7</p>
                  </motion.div>
                </div>
              </section>
              
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Recent Activity</h2>
                  <button className="text-sm text-brand-blue flex items-center">
                    View All <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                
                <motion.div 
                  className="glass-card"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Child</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Activity</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Amount</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Date</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-500">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {activities.map((activity, idx) => (
                          <motion.tr 
                            key={activity.id}
                            className="border-b border-gray-100 last:border-0"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3, delay: idx * 0.1 }}
                          >
                            <td className="px-4 py-3 text-sm">{activity.childName}</td>
                            <td className="px-4 py-3 text-sm">
                              <div>
                                <span className="font-medium">{activity.action}</span>
                                {activity.item && <p className="text-xs text-gray-500">{activity.item}</p>}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm font-medium">
                              {activity.action === "Balance Added" ? (
                                <span className="text-green-600">+${activity.amount.toFixed(2)}</span>
                              ) : (
                                <span className="text-gray-800">-${activity.amount.toFixed(2)}</span>
                              )}
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-500">{activity.date}</td>
                            <td className="px-4 py-3 text-sm">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                activity.status === "Completed" 
                                  ? "bg-green-100 text-green-700" 
                                  : "bg-red-100 text-red-700"
                              }`}>
                                {activity.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </motion.div>
              </section>
            </div>
            
            <div className="space-y-8">
              <section>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Child Accounts</h2>
                  <motion.button 
                    className="flex items-center space-x-1 px-3 py-1 bg-brand-blue text-white text-sm rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Child</span>
                  </motion.button>
                </div>
                
                <div className="space-y-4">
                  {children.map((child, idx) => (
                    <motion.div 
                      key={child.id}
                      className={`glass-card p-4 cursor-pointer transition-all border-2 ${
                        selectedChild === child.id ? "border-brand-blue" : "border-transparent"
                      }`}
                      onClick={() => setSelectedChild(selectedChild === child.id ? null : child.id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: idx * 0.1 }}
                      whileHover={{ y: -2 }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white font-bold">
                          {child.avatar}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{child.name}</h3>
                          <div className="flex items-center space-x-3 mt-1 text-sm">
                            <span className="text-gray-600">
                              Balance: <span className="font-medium">${child.balance.toFixed(2)}</span>
                            </span>
                            <span className="text-gray-600">
                              Limit: <span className="font-medium">${child.spendingLimit.toFixed(2)}</span>
                            </span>
                          </div>
                        </div>
                        <div>
                          <span className={`inline-block w-3 h-3 rounded-full ${
                            child.active ? "bg-green-500" : "bg-gray-300"
                          }`}></span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
              
              {selectedChild && (
                <section>
                  <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                  <ParentControls 
                    child={children.find(c => c.id === selectedChild)!}
                    onUpdateBalance={handleUpdateBalance}
                    onUpdateLimit={handleUpdateLimit}
                    onToggleActive={handleToggleActive}
                  />
                </section>
              )}
              
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
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
