
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import { Bell, CreditCard, Eye, EyeOff, Lock, Mail, Shield, User, Clock, DollarSign, AlertOctagon, Maximize, CheckCircle } from 'lucide-react';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  
  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        
        <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
          <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">Settings</h1>
            <p className="text-gray-600">Manage your account and preferences</p>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="glass-card overflow-hidden">
                <nav className="flex flex-col">
                  {[
                    { id: 'profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
                    { id: 'security', label: 'Security', icon: <Lock className="h-5 w-5" /> },
                    { id: 'payment', label: 'Payment Methods', icon: <CreditCard className="h-5 w-5" /> },
                    { id: 'parental', label: 'Parental Controls', icon: <Shield className="h-5 w-5" /> },
                    { id: 'notifications', label: 'Notifications', icon: <Bell className="h-5 w-5" /> },
                  ].map(tab => (
                    <motion.button
                      key={tab.id}
                      className={`flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                        activeTab === tab.id 
                          ? 'bg-brand-blue text-white' 
                          : 'hover:bg-brand-blue/5 text-gray-700'
                      }`}
                      onClick={() => setActiveTab(tab.id)}
                      whileHover={{ x: activeTab !== tab.id ? 5 : 0 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {tab.icon}
                      <span>{tab.label}</span>
                    </motion.button>
                  ))}
                </nav>
              </div>
            </div>
            
            <div className="lg:col-span-3">
              <div className="glass-card p-6">
                {activeTab === 'profile' && <ProfileSettings />}
                {activeTab === 'security' && <SecuritySettings />}
                {activeTab === 'payment' && <PaymentSettings />}
                {activeTab === 'parental' && <ParentalControls />}
                {activeTab === 'notifications' && <NotificationSettings />}
              </div>
            </div>
          </div>
        </main>
      </div>
    </PageTransition>
  );
};

const ProfileSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Profile Settings</h2>
      
      <form className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-8">
          <div className="sm:w-64 flex flex-col items-center">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white text-4xl font-bold">
              J
            </div>
            <motion.button 
              className="mt-4 px-4 py-2 bg-brand-blue/10 text-brand-blue rounded-lg text-sm"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Change Avatar
            </motion.button>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                  defaultValue="John"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input 
                  type="text" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                  defaultValue="Doe"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input 
                type="email" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                defaultValue="john.doe@example.com"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input 
                type="tel" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                defaultValue="+1 (555) 123-4567"
              />
            </div>
          </div>
        </div>
        
        <motion.button 
          className="px-6 py-2 bg-brand-blue text-white rounded-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Save Changes
        </motion.button>
      </form>
    </div>
  );
};

const SecuritySettings = () => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Security Settings</h2>
      
      <form className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Change Password</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Current Password
              </label>
              <div className="relative">
                <input 
                  type={showCurrentPassword ? "text" : "password"} 
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                  placeholder="Enter current password"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword 
                    ? <EyeOff className="h-5 w-5 text-gray-400" /> 
                    : <Eye className="h-5 w-5 text-gray-400" />
                  }
                </button>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <input 
                  type={showNewPassword ? "text" : "password"} 
                  className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                  placeholder="Enter new password"
                />
                <button 
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  {showNewPassword 
                    ? <EyeOff className="h-5 w-5 text-gray-400" /> 
                    : <Eye className="h-5 w-5 text-gray-400" />
                  }
                </button>
              </div>
              <p className="mt-1 text-sm text-gray-500">
                Password must be at least 8 characters and include a mix of letters, numbers, and symbols.
              </p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <input 
                type="password" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                placeholder="Confirm new password"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Two-Factor Authentication</h3>
          
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
            <div>
              <p className="font-medium">Text Message Authentication</p>
              <p className="text-sm text-gray-500">Receive a code via SMS when you sign in</p>
            </div>
            
            <div className="flex items-center">
              <label className="inline-flex relative items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
              </label>
            </div>
          </div>
        </div>
        
        <motion.button 
          className="px-6 py-2 bg-brand-blue text-white rounded-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Save Security Settings
        </motion.button>
      </form>
    </div>
  );
};

const PaymentSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Payment Methods</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Your Payment Methods</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 p-2 rounded-full">
                  <CreditCard className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium">Visa ending in 4242</p>
                  <p className="text-sm text-gray-500">Expires 12/2025</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">Default</span>
                <motion.button 
                  className="text-gray-500 hover:text-brand-blue"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Maximize className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-purple-100 p-2 rounded-full">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="font-medium">Mastercard ending in 5555</p>
                  <p className="text-sm text-gray-500">Expires 08/2024</p>
                </div>
              </div>
              
              <div>
                <motion.button 
                  className="text-gray-500 hover:text-brand-blue"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Maximize className="h-5 w-5" />
                </motion.button>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <motion.button 
              className="flex items-center space-x-2 px-4 py-2 border border-brand-blue text-brand-blue rounded-lg"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <span>Add Payment Method</span>
            </motion.button>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Billing Address</h3>
          
          <div className="p-4 border border-gray-200 rounded-lg bg-white">
            <p className="font-medium">John Doe</p>
            <p className="text-gray-600">123 Main Street</p>
            <p className="text-gray-600">Apt 4B</p>
            <p className="text-gray-600">San Francisco, CA 94103</p>
            <p className="text-gray-600">United States</p>
            
            <div className="mt-4">
              <motion.button 
                className="text-brand-blue hover:underline"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Edit Address
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ParentalControls = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Parental Controls</h2>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-medium mb-4">Purchase Restrictions</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-red-100 p-2 rounded-full">
                  <AlertOctagon className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <p className="font-medium">Purchase Approval</p>
                  <p className="text-sm text-gray-500">Require approval for all purchases</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                </label>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="bg-green-100 p-2 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="font-medium">Content Filtering</p>
                  <p className="text-sm text-gray-500">Filter age-inappropriate products</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <label className="inline-flex relative items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Spending Limits</h3>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-brand-blue/10 p-2 rounded-full">
                  <DollarSign className="h-6 w-6 text-brand-blue" />
                </div>
                <div>
                  <p className="font-medium">Maximum Purchase Amount</p>
                  <p className="text-sm text-gray-500">Set the maximum amount per purchase</p>
                </div>
              </div>
              
              <div className="ml-12">
                <div className="flex items-center space-x-4">
                  <input 
                    type="number" 
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                    defaultValue="25"
                  />
                  <span className="text-gray-500">USD</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 border border-gray-200 rounded-lg bg-white">
              <div className="flex items-center space-x-4 mb-4">
                <div className="bg-brand-coral/10 p-2 rounded-full">
                  <Clock className="h-6 w-6 text-brand-coral" />
                </div>
                <div>
                  <p className="font-medium">Weekly Spending Limit</p>
                  <p className="text-sm text-gray-500">Set a weekly budget for all child accounts</p>
                </div>
              </div>
              
              <div className="ml-12">
                <div className="flex items-center space-x-4">
                  <input 
                    type="number" 
                    className="w-24 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent" 
                    defaultValue="100"
                  />
                  <span className="text-gray-500">USD per week</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Category Restrictions</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Electronics', 'Toys', 'Clothing', 'Media', 'Food', 'Other'].map(category => (
              <div key={category} className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between">
                <p className="font-medium">{category}</p>
                
                <div className="flex items-center">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={category !== 'Other'} />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <motion.button 
          className="px-6 py-2 bg-brand-blue text-white rounded-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Save Control Settings
        </motion.button>
      </div>
    </div>
  );
};

const NotificationSettings = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6">Notification Settings</h2>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
          
          <div className="space-y-3">
            {[
              { title: 'Purchase Requests', description: 'When your child requests to buy something' },
              { title: 'Purchase Confirmations', description: 'When a purchase is completed' },
              { title: 'Balance Updates', description: 'When your child\'s balance changes' },
              { title: 'Security Alerts', description: 'Important security notifications' },
              { title: 'Marketing', description: 'Tips, offers, and product updates' },
            ].map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                
                <div className="flex items-center">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked={index !== 4} />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
          
          <div className="space-y-3">
            {[
              { title: 'Real-time Purchase Requests', description: 'Get notified immediately when your child wants to buy' },
              { title: 'Balance Alerts', description: 'When balance is low or reaches a threshold' },
              { title: 'New Devices', description: 'When your account is accessed from a new device' },
            ].map((item, index) => (
              <div key={index} className="p-4 border border-gray-200 rounded-lg bg-white flex items-center justify-between">
                <div>
                  <p className="font-medium">{item.title}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
                
                <div className="flex items-center">
                  <label className="inline-flex relative items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-12 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-6 peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-blue"></div>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <motion.button 
          className="px-6 py-2 bg-brand-blue text-white rounded-lg"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          Save Notification Settings
        </motion.button>
      </div>
    </div>
  );
};

export default Settings;
