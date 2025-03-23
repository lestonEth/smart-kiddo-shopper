
import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Clock, AlertTriangle, Bell } from 'lucide-react';

interface ChildAccount {
  _id: string;
  name: string;
  balance: number;
  spendingLimit: number;
  active: boolean;
}

interface ParentControlsProps {
  child: ChildAccount;
  onUpdateBalance: (childId: string, amount: number) => void;
  onUpdateLimit: (childId: string, limit: number) => void;
  onToggleActive: (childId: string, active: boolean) => void;
}

const ParentControls: React.FC<ParentControlsProps> = ({
  child,
  onUpdateBalance,
  onUpdateLimit,
  onToggleActive
}) => {
  const [balanceInput, setBalanceInput] = React.useState(child.balance.toString());
  const [limitInput, setLimitInput] = React.useState(child.spendingLimit.toString());

  const handleBalanceUpdate = () => {
    const amount = parseFloat(balanceInput);
    if (!isNaN(amount)) {
      onUpdateBalance(child._id, amount);
    }
  };

  const handleLimitUpdate = () => {
    const limit = parseFloat(limitInput);
    if (!isNaN(limit)) {
      onUpdateLimit(child._id, limit);
    }
  };

  return (
    <motion.div 
      className="glass-card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">{child.name}'s Account</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">Active</span>
          <button 
            className={`relative w-12 h-6 rounded-full transition-all ${
              child.active ? 'bg-green-500' : 'bg-gray-300'
            }`}
            onClick={() => onToggleActive(child._id, !child.active)}
          >
            <motion.div 
              className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"
              animate={{ 
                x: child.active ? 6 : 0 
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </button>
        </div>
      </div>
      
      <div className="space-y-4 mb-4">
        <div className="flex items-center space-x-3">
          <div className="bg-brand-blue/10 p-2 rounded-full">
            <DollarSign className="h-5 w-5 text-brand-blue" />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-500">Current Balance</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={balanceInput}
                onChange={(e) => setBalanceInput(e.target.value)}
                className="w-24 px-2 py-1 border border-gray-300 rounded"
              />
              <motion.button 
                className="px-3 py-1 bg-brand-blue text-white text-sm rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBalanceUpdate}
              >
                Update
              </motion.button>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-brand-coral/10 p-2 rounded-full">
            <Clock className="h-5 w-5 text-brand-coral" />
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-500">Spending Limit</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={limitInput}
                onChange={(e) => setLimitInput(e.target.value)}
                className="w-24 px-2 py-1 border border-gray-300 rounded"
              />
              <motion.button 
                className="px-3 py-1 bg-brand-coral text-white text-sm rounded-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLimitUpdate}
              >
                Update
              </motion.button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between pt-3 border-t border-gray-200">
        <motion.button 
          className="flex items-center space-x-1 px-3 py-1 bg-red-50 text-red-500 text-sm rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AlertTriangle className="h-4 w-4" />
          <span>Restrict</span>
        </motion.button>
        
        <motion.button 
          className="flex items-center space-x-1 px-3 py-1 bg-purple-50 text-purple-500 text-sm rounded-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell className="h-4 w-4" />
          <span>Alerts</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ParentControls;
