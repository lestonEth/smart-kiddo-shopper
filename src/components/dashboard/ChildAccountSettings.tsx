import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, DollarSign, Calendar, Bell, Shield, Clock, ChevronRight, Save, AlertTriangle } from 'lucide-react';
import { Child } from '@/types/types';
import ConfirmModal from '../ui/ConfirmModal';

interface ChildAccountSettingsProps {
    child: Child;
    onClose: () => void;
    onUpdate?: (childId: string, updatedData: Partial<Child>) => void;
}

const ChildAccountSettings: React.FC<ChildAccountSettingsProps> = ({
    child,
    onClose,
    onUpdate
}) => {
    // Settings states
    const [settings, setSettings] = useState({
        dailySpendingLimit: child.spendingLimit,
        notificationsEnabled: child.notificationsEnabled || true,
        parentApprovalRequired: child.parentApprovalRequired || false,
        restrictedMerchants: child.restrictedMerchants || [],
        scheduledAllowance: child.scheduledAllowance || {
            enabled: false,
            amount: 0,
            frequency: 'weekly', // weekly, biweekly, monthly
            dayOfWeek: 1, // 0-6 (Sunday-Saturday)
            dayOfMonth: 1, // 1-31
        }
    });

    // New merchant to add
    const [newMerchant, setNewMerchant] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [settingsChanged, setSettingsChanged] = useState(false);

    // Reset settings when child changes
    useEffect(() => {
        setSettings({
            dailySpendingLimit: child.spendingLimit,
            notificationsEnabled: child.notificationsEnabled || true,
            parentApprovalRequired: child.parentApprovalRequired || false,
            restrictedMerchants: child.restrictedMerchants || [],
            scheduledAllowance: child.scheduledAllowance || {
                enabled: false,
                amount: 0,
                frequency: 'weekly',
                dayOfWeek: 1,
                dayOfMonth: 1,
            }
        });
        setSettingsChanged(false);
    }, [child]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        // Handle checkbox inputs
        if (type === 'checkbox') {
            const checked = (e.target as HTMLInputElement).checked;
            setSettings(prev => ({
                ...prev,
                [name]: checked
            }));
        }
        // Handle numeric inputs
        else if (type === 'number') {
            setSettings(prev => ({
                ...prev,
                [name]: parseFloat(value) || 0
            }));
        }
        // Handle all other inputs
        else {
            setSettings(prev => ({
                ...prev,
                [name]: value
            }));
        }

        setSettingsChanged(true);

        // Clear error when field is changed
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleAllowanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : null;

        setSettings(prev => ({
            ...prev,
            scheduledAllowance: {
                ...prev.scheduledAllowance,
                [name]: checked !== null ? checked :
                    type === 'number' ? parseFloat(value) || 0 : value
            }
        }));

        setSettingsChanged(true);
    };

    const handleAddMerchant = () => {
        if (newMerchant.trim() === '') {
            setErrors(prev => ({ ...prev, newMerchant: 'Merchant name cannot be empty' }));
            return;
        }

        if (settings.restrictedMerchants.includes(newMerchant.trim())) {
            setErrors(prev => ({ ...prev, newMerchant: 'Merchant already in the list' }));
            return;
        }

        setSettings(prev => ({
            ...prev,
            restrictedMerchants: [...prev.restrictedMerchants, newMerchant.trim()]
        }));

        setNewMerchant('');
        setErrors(prev => ({ ...prev, newMerchant: '' }));
        setSettingsChanged(true);
    };

    const handleRemoveMerchant = (merchant: string) => {
        setSettings(prev => ({
            ...prev,
            restrictedMerchants: prev.restrictedMerchants.filter(m => m !== merchant)
        }));
        setSettingsChanged(true);
    };

    const validate = () => {
        const newErrors: { [key: string]: string } = {};

        if (settings.dailySpendingLimit < 0) {
            newErrors.dailySpendingLimit = 'Spending limit cannot be negative';
        }

        if (settings.scheduledAllowance.enabled && settings.scheduledAllowance.amount <= 0) {
            newErrors.allowanceAmount = 'Allowance amount must be greater than zero';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = () => {
        if (!validate()) return;

        if (onUpdate) {
            onUpdate(child._id, {
                spendingLimit: settings.dailySpendingLimit,
                notificationsEnabled: settings.notificationsEnabled,
                parentApprovalRequired: settings.parentApprovalRequired,
                restrictedMerchants: settings.restrictedMerchants,
                scheduledAllowance: settings.scheduledAllowance
            });
        }

        setSettingsChanged(false);
        onClose();
    };

    const handleCancel = () => {
        if (settingsChanged) {
            setConfirmModalOpen(true);
        } else {
            onClose();
        }
    };

    const getDayLabel = () => {
        if (settings.scheduledAllowance.frequency === 'weekly') {
            const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
            return `Day of week: ${days[settings.scheduledAllowance.dayOfWeek]}`;
        } else if (settings.scheduledAllowance.frequency === 'monthly') {
            return `Day of month: ${settings.scheduledAllowance.dayOfMonth}`;
        }
        return '';
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
                className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
                onClick={e => e.stopPropagation()}
            >
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white font-bold">
                                {child.name.charAt(0)}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{child.name}</h2>
                                <p className="text-gray-500 text-sm">Account Settings</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCancel}
                            className="p-2 rounded-full hover:bg-gray-100"
                        >
                            <X className="h-5 w-5 text-gray-500" />
                        </button>
                    </div>

                    <div className="space-y-6">
                        {/* Spending Limits Section */}
                        <div className="glass-card p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <DollarSign className="h-5 w-5 text-brand-blue" />
                                <h3 className="text-lg font-medium">Spending Limits</h3>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">
                                        Daily Spending Limit ($)
                                    </label>
                                    <input
                                        type="number"
                                        name="dailySpendingLimit"
                                        value={settings.dailySpendingLimit}
                                        onChange={handleChange}
                                        step="0.01"
                                        className={`w-full px-3 py-2 border rounded-md ${errors.dailySpendingLimit ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                    />
                                    {errors.dailySpendingLimit && (
                                        <p className="text-red-500 text-xs mt-1">{errors.dailySpendingLimit}</p>
                                    )}
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="parentApprovalRequired"
                                        name="parentApprovalRequired"
                                        checked={settings.parentApprovalRequired}
                                        onChange={handleChange}
                                        className="h-4 w-4 text-brand-blue focus:ring-brand-blue rounded"
                                    />
                                    <label htmlFor="parentApprovalRequired" className="ml-2 block text-sm text-gray-700">
                                        Require parent approval for purchases over spending limit
                                    </label>
                                </div>
                            </div>
                        </div>

                        {/* Scheduled Allowance Section */}
                        <div className="glass-card p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <Calendar className="h-5 w-5 text-brand-blue" />
                                <h3 className="text-lg font-medium">Scheduled Allowance</h3>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center mb-2">
                                    <input
                                        type="checkbox"
                                        id="allowanceEnabled"
                                        name="enabled"
                                        checked={settings.scheduledAllowance.enabled}
                                        onChange={handleAllowanceChange}
                                        className="h-4 w-4 text-brand-blue focus:ring-brand-blue rounded"
                                    />
                                    <label htmlFor="allowanceEnabled" className="ml-2 block text-sm text-gray-700">
                                        Enable scheduled allowance
                                    </label>
                                </div>

                                {settings.scheduledAllowance.enabled && (
                                    <div className="pl-6 space-y-4 border-l-2 border-gray-100">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Amount ($)
                                            </label>
                                            <input
                                                type="number"
                                                name="amount"
                                                value={settings.scheduledAllowance.amount}
                                                onChange={handleAllowanceChange}
                                                step="0.01"
                                                className={`w-full px-3 py-2 border rounded-md ${errors.allowanceAmount ? 'border-red-500' : 'border-gray-300'
                                                    }`}
                                            />
                                            {errors.allowanceAmount && (
                                                <p className="text-red-500 text-xs mt-1">{errors.allowanceAmount}</p>
                                            )}
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Frequency
                                            </label>
                                            <select
                                                name="frequency"
                                                value={settings.scheduledAllowance.frequency}
                                                onChange={handleAllowanceChange}
                                                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                            >
                                                <option value="weekly">Weekly</option>
                                                <option value="biweekly">Biweekly</option>
                                                <option value="monthly">Monthly</option>
                                            </select>
                                        </div>

                                        {settings.scheduledAllowance.frequency === 'weekly' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Day of Week
                                                </label>
                                                <select
                                                    name="dayOfWeek"
                                                    value={settings.scheduledAllowance.dayOfWeek}
                                                    onChange={handleAllowanceChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                >
                                                    <option value={0}>Sunday</option>
                                                    <option value={1}>Monday</option>
                                                    <option value={2}>Tuesday</option>
                                                    <option value={3}>Wednesday</option>
                                                    <option value={4}>Thursday</option>
                                                    <option value={5}>Friday</option>
                                                    <option value={6}>Saturday</option>
                                                </select>
                                            </div>
                                        )}

                                        {settings.scheduledAllowance.frequency === 'monthly' && (
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                                    Day of Month
                                                </label>
                                                <select
                                                    name="dayOfMonth"
                                                    value={settings.scheduledAllowance.dayOfMonth}
                                                    onChange={handleAllowanceChange}
                                                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                                                >
                                                    {[...Array(31)].map((_, i) => (
                                                        <option key={i} value={i + 1}>
                                                            {i + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )}

                                        <div className="bg-blue-50 p-3 rounded-md flex items-start">
                                            <Clock className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                                            <p className="text-sm text-blue-700">
                                                Next allowance: $
                                                {settings.scheduledAllowance.amount.toFixed(2)} on{' '}
                                                {new Date().toLocaleDateString('en-US', {
                                                    weekday: 'long',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Restricted Merchants Section */}
                        <div className="glass-card p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <Shield className="h-5 w-5 text-brand-blue" />
                                <h3 className="text-lg font-medium">Restricted Merchants</h3>
                            </div>

                            <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                    Add merchants that will be blocked from making transactions with this account.
                                </p>

                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={newMerchant}
                                        onChange={(e) => setNewMerchant(e.target.value)}
                                        className={`flex-1 px-3 py-2 border rounded-md ${errors.newMerchant ? 'border-red-500' : 'border-gray-300'
                                            }`}
                                        placeholder="Enter merchant name"
                                    />
                                    <button
                                        onClick={handleAddMerchant}
                                        className="px-4 py-2 bg-brand-blue text-white rounded-md hover:bg-opacity-90"
                                    >
                                        Add
                                    </button>
                                </div>
                                {errors.newMerchant && (
                                    <p className="text-red-500 text-xs">{errors.newMerchant}</p>
                                )}

                                <div className="max-h-40 overflow-y-auto">
                                    {settings.restrictedMerchants.length > 0 ? (
                                        <ul className="divide-y divide-gray-100">
                                            {settings.restrictedMerchants.map((merchant, index) => (
                                                <li key={index} className="py-2 flex justify-between items-center">
                                                    <span className="text-sm">{merchant}</span>
                                                    <button
                                                        onClick={() => handleRemoveMerchant(merchant)}
                                                        className="text-red-500 hover:text-red-700 text-sm"
                                                    >
                                                        Remove
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-gray-500 py-2">No restricted merchants</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Notifications Section */}
                        <div className="glass-card p-4">
                            <div className="flex items-center space-x-3 mb-4">
                                <Bell className="h-5 w-5 text-brand-blue" />
                                <h3 className="text-lg font-medium">Notifications</h3>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            id="notificationsEnabled"
                                            name="notificationsEnabled"
                                            checked={settings.notificationsEnabled}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-brand-blue focus:ring-brand-blue rounded"
                                        />
                                        <label htmlFor="notificationsEnabled" className="ml-2 block text-sm text-gray-700">
                                            Enable transaction notifications
                                        </label>
                                    </div>
                                    <ChevronRight className="h-5 w-5 text-gray-400" />
                                </div>

                                {settings.notificationsEnabled && (
                                    <p className="text-sm text-gray-500 ml-6">
                                        You'll receive notifications for all transactions made with this account.
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="mt-6 flex space-x-3 justify-end">
                        <button
                            className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg"
                            onClick={handleCancel}
                        >
                            Cancel
                        </button>
                        <button
                            className="px-4 py-2 text-sm bg-brand-blue text-white hover:bg-opacity-90 rounded-lg flex items-center space-x-1"
                            onClick={handleSave}
                        >
                            <Save className="h-4 w-4" />
                            <span>Save Settings</span>
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Confirmation Modal for unsaved changes */}
            <ConfirmModal
                isOpen={confirmModalOpen}
                title="Unsaved Changes"
                message="You have unsaved changes. Are you sure you want to leave without saving?"
                confirmText="Leave"
                cancelText="Stay"
                onConfirm={() => {
                    setConfirmModalOpen(false);
                    onClose();
                }}
                onCancel={() => setConfirmModalOpen(false)}
                type="warning"
            />
        </motion.div>
    );
};

export default ChildAccountSettings;