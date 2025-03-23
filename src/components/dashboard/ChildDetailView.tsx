import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, CreditCard, Calendar, ArrowDownRight, ArrowUpRight, Settings, Save, Edit, User, Mail, Lock, AlertTriangle } from 'lucide-react';
import ConfirmModal from '../ui/ConfirmModal';
import { Child } from '@/types/types';

interface ChildDetailViewProps {
    child: Child;
    onClose: () => void;
    onUpdate?: (childId: string, updatedData: Partial<Child>) => void;
}

const ChildDetailView: React.FC<ChildDetailViewProps> = ({ child, onClose, onUpdate }) => {
    // Edit mode state
    const [isEditing, setIsEditing] = useState(false);

    // Form states for editable fields
    const [formData, setFormData] = useState({
        name: child.name,
        email: child.email,
        age: child.age,
        spendingLimit: child.spendingLimit,
        active: child.active,
        password: '',
        confirmPassword: ''
    });

    // Error handling
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [showPasswordChange, setShowPasswordChange] = useState(false);

    // Reset form data when child changes
    useEffect(() => {
        setFormData({
            name: child.name,
            email: child.email,
            age: child.age,
            spendingLimit: child.spendingLimit,
            active: child.active,
            password: '',
            confirmPassword: ''
        });
        setIsEditing(false);
        setShowPasswordChange(false);
        setErrors({});
    }, [child]);

    // Mock transaction data for the child
    const transactions = [
        { id: 1, date: '2025-03-20', amount: -12.99, merchant: 'GameStop', type: 'purchase' },
        { id: 2, date: '2025-03-18', amount: 25.00, merchant: 'Allowance', type: 'deposit' },
        { id: 3, date: '2025-03-15', amount: -8.50, merchant: 'McDonalds', type: 'purchase' },
        { id: 4, date: '2025-03-12', amount: -15.75, merchant: 'Movie Theater', type: 'purchase' },
        { id: 5, date: '2025-03-10', amount: 10.00, merchant: 'Birthday Gift', type: 'deposit' },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked :
                name === 'age' || name === 'spendingLimit' ? parseFloat(value) || 0 : value
        }));

        // Clear error when field is changed
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (!formData.name.trim()) newErrors.name = 'Name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(formData.email)) newErrors.email = 'Invalid email format';
        if (formData.age <= 0) newErrors.age = 'Age must be positive';
        if (formData.spendingLimit < 0) newErrors.spendingLimit = 'Spending limit cannot be negative';

        if (showPasswordChange) {
            if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
            if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (!validate()) return;

        const updates: Partial<Child> = {
            name: formData.name,
            email: formData.email,
            age: formData.age,
            spendingLimit: formData.spendingLimit,
            active: formData.active
        };

        if (showPasswordChange && formData.password) {
            updates.password = formData.password;
        }

        if (onUpdate) {
            onUpdate(child._id, updates);
        }

        setIsEditing(false);
        setShowPasswordChange(false);
    };

    return (
        <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-y-auto m-4"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white text-xl font-bold">
                                {formData.name.charAt(0)}
                            </div>
                            <div>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={`text-2xl font-semibold bg-gray-50 border rounded px-2 py-1 w-full ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                                    />
                                ) : (
                                    <h2 className="text-2xl font-semibold">{child.name}</h2>
                                )}
                                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                                <p className="text-gray-500 mt-1">Account Details</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            {!isEditing ? (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-2 rounded-full hover:bg-gray-100 text-brand-blue"
                                >
                                    <Edit className="h-5 w-5" />
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    className="p-2 rounded-full bg-brand-blue text-white hover:bg-opacity-90"
                                >
                                    <Save className="h-5 w-5" />
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="p-2 rounded-full hover:bg-gray-100"
                            >
                                <X className="h-5 w-5 text-gray-500" />
                            </button>
                        </div>
                    </div>

                    <div className="mb-8">
                        {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className={`pl-10 w-full px-3 py-2 border rounded-md ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <User className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            name="age"
                                            value={formData.age}
                                            onChange={handleChange}
                                            className={`pl-10 w-full px-3 py-2 border rounded-md ${errors.age ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    {errors.age && <p className="text-red-500 text-xs mt-1">{errors.age}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Spending Limit ($)</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <DollarSign className="h-4 w-4 text-gray-400" />
                                        </div>
                                        <input
                                            type="number"
                                            name="spendingLimit"
                                            value={formData.spendingLimit}
                                            onChange={handleChange}
                                            step="0.01"
                                            className={`pl-10 w-full px-3 py-2 border rounded-md ${errors.spendingLimit ? 'border-red-500' : 'border-gray-300'}`}
                                        />
                                    </div>
                                    {errors.spendingLimit && <p className="text-red-500 text-xs mt-1">{errors.spendingLimit}</p>}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Account Status</label>
                                    <div className="flex items-center space-x-2 h-10">
                                        <input
                                            type="checkbox"
                                            name="active"
                                            checked={formData.active}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-brand-blue focus:ring-brand-blue rounded"
                                        />
                                        <span>Active Account</span>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="glass-card p-4 flex flex-col items-center justify-center">
                                    <DollarSign className="h-8 w-8 text-brand-blue mb-2" />
                                    <p className="text-sm text-gray-500">Current Balance</p>
                                    <p className="text-xl font-semibold">${child.balance.toFixed(2)}</p>
                                </div>
                                <div className="glass-card p-4 flex flex-col items-center justify-center">
                                    <CreditCard className="h-8 w-8 text-brand-blue mb-2" />
                                    <p className="text-sm text-gray-500">Spending Limit</p>
                                    <p className="text-xl font-semibold">${child.spendingLimit.toFixed(2)}</p>
                                </div>
                                <div className="glass-card p-4 flex flex-col items-center justify-center">
                                    <Calendar className="h-8 w-8 text-brand-blue mb-2" />
                                    <p className="text-sm text-gray-500">Account Status</p>
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-block w-3 h-3 rounded-full ${child.active ? "bg-green-500" : "bg-gray-300"
                                            }`}></span>
                                        <p className="text-lg font-medium">{child.active ? "Active" : "Inactive"}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {isEditing && (
                        <div className="mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <h3 className="text-lg font-medium">Change Password</h3>
                                <button
                                    type="button"
                                    onClick={() => setShowPasswordChange(!showPasswordChange)}
                                    className="text-sm text-brand-blue hover:underline"
                                >
                                    {showPasswordChange ? 'Cancel' : 'Change Password'}
                                </button>
                            </div>

                            {showPasswordChange && (
                                <div className="glass-card p-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                    className={`pl-10 w-full px-3 py-2 border rounded-md ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                            <div className="relative">
                                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                    <Lock className="h-4 w-4 text-gray-400" />
                                                </div>
                                                <input
                                                    type="password"
                                                    name="confirmPassword"
                                                    value={formData.confirmPassword}
                                                    onChange={handleChange}
                                                    className={`pl-10 w-full px-3 py-2 border rounded-md ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                                                />
                                            </div>
                                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-start">
                                        <AlertTriangle className="h-5 w-5 text-amber-500 mr-2 flex-shrink-0 mt-0.5" />
                                        <p className="text-sm text-gray-600">
                                            Changing the password will require the child to log in again with the new password.
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {!isEditing && (
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold mb-4">Recent Transactions</h3>
                            <div className="glass-card divide-y divide-gray-100">
                                {transactions.length > 0 ? (
                                    transactions.map(transaction => (
                                        <div key={transaction.id} className="p-4 flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${transaction.type === 'deposit' ? 'bg-green-100' : 'bg-red-100'
                                                    }`}>
                                                    {transaction.type === 'deposit' ?
                                                        <ArrowDownRight className="h-5 w-5 text-green-600" /> :
                                                        <ArrowUpRight className="h-5 w-5 text-red-600" />
                                                    }
                                                </div>
                                                <div>
                                                    <p className="font-medium">{transaction.merchant}</p>
                                                    <div className="flex items-center text-xs text-gray-500 space-x-2">
                                                        <Calendar className="h-3 w-3" />
                                                        <span>{transaction.date}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <p className={`font-semibold ${transaction.type === 'deposit' ? 'text-green-600' : 'text-red-600'
                                                }`}>
                                                {transaction.type === 'deposit' ? '+' : '-'}${Math.abs(transaction.amount).toFixed(2)}
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-6 text-center text-gray-500">
                                        No transactions yet
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    <div className="flex space-x-3 justify-end">
                        <button
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                            onClick={onClose}
                        >
                            {isEditing ? 'Cancel' : 'Close'}
                        </button>
                        {isEditing ? (
                            <button
                                className="px-4 py-2 text-sm bg-brand-blue text-white hover:bg-opacity-90 rounded-lg flex items-center space-x-1"
                                onClick={handleSubmit}
                            >
                                <Save className="h-4 w-4" />
                                <span>Save Changes</span>
                            </button>
                        ) : (
                            <button
                                className="px-4 py-2 text-sm bg-brand-blue text-white hover:bg-opacity-90 rounded-lg flex items-center space-x-1"
                                onClick={() => setIsEditing(true)}
                            >
                                <Edit className="h-4 w-4" />
                                <span>Edit Account</span>
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ChildDetailView;