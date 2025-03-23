import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, UserPlus, ChevronDown, Trash2, Settings, CreditCard, Eye } from 'lucide-react';
import { Child } from '@/types/types';
import ConfirmModal from '@/components/ui/confirmModal';
import ChildDetailView from './ChildDetailView';
import ChildAccountSettings from './ChildAccountSettings';

interface ChildAccountsProps {
    children: Child[];
    selectedChild: string | null;
    onSelectChild: (childId: string) => void;
    onAddChildClick: () => void;
    onTerminateAccount: (childId: string) => void;
    onUpdateChild?: (childId: string, updatedData: Partial<Child>) => void;
}

const ChildAccounts: React.FC<ChildAccountsProps> = ({
    children,
    selectedChild,
    onSelectChild,
    onAddChildClick,
    onTerminateAccount,
    onUpdateChild
}) => {
    const [expandedDropdown, setExpandedDropdown] = useState<string | null>(null);
    const [confirmModalOpen, setConfirmModalOpen] = useState(false);
    const [accountToTerminate, setAccountToTerminate] = useState<string | null>(null);
    const [detailViewOpen, setDetailViewOpen] = useState(false);
    const [selectedChildForDetail, setSelectedChildForDetail] = useState<string | null>(null);
    const [settingsViewOpen, setSettingsViewOpen] = useState(false);
    const [selectedChildForSettings, setSelectedChildForSettings] = useState<string | null>(null);

    const toggleDropdown = (childId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setExpandedDropdown(expandedDropdown === childId ? null : childId);
    };

    const openTerminateConfirmation = (childId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setAccountToTerminate(childId);
        setConfirmModalOpen(true);
        setExpandedDropdown(null); // Close dropdown when opening modal
    };

    const handleConfirmTerminate = () => {
        if (accountToTerminate) {
            onTerminateAccount(accountToTerminate);
            setConfirmModalOpen(false);
            setAccountToTerminate(null);
        }
    };

    const handleCancelTerminate = () => {
        setConfirmModalOpen(false);
        setAccountToTerminate(null);
    };

    const openDetailView = (childId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedChildForDetail(childId);
        setDetailViewOpen(true);
        setExpandedDropdown(null); // Close dropdown when opening detail view
    };

    const closeDetailView = () => {
        setDetailViewOpen(false);
        setSelectedChildForDetail(null);
    };

    const openSettingsView = (childId: string, e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedChildForSettings(childId);
        setSettingsViewOpen(true);
        setExpandedDropdown(null); // Close dropdown when opening settings view
    }
        
    
    const handleUpdateChild = (childId: string, updatedData: Partial<Child>) => {
        if (onUpdateChild) {
            onUpdateChild(childId, updatedData);
        }
    };

    // Find child for the confirmation modal and detail view
    const childToTerminate = children.find(child => child._id === accountToTerminate);
    const childForDetail = children.find(child => child._id === selectedChildForDetail);

    return (
        <section>
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Child Accounts</h2>
                <motion.button
                    className="flex items-center space-x-1 px-3 py-1 bg-brand-blue text-white text-sm rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onAddChildClick}
                >
                    <Plus className="h-4 w-4" />
                    <span>Add Child</span>
                </motion.button>
            </div>

            <div className="space-y-4">
                {children.length > 0 ? (
                    children.map((child, idx) => (
                        <div key={child._id} className="relative">
                            <motion.div
                                className={`glass-card p-4 cursor-pointer transition-all border-2 ${
                                    selectedChild === child._id ? "border-brand-blue" : "border-transparent"
                                }`}
                                onClick={() => onSelectChild(child._id)}
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
                                    <div className="flex items-center space-x-2">
                                        <span className={`inline-block w-3 h-3 rounded-full ${
                                            child.active ? "bg-green-500" : "bg-gray-300"
                                        }`}></span>
                                        <button 
                                            className="p-1 rounded-full hover:bg-gray-100"
                                            onClick={(e) => toggleDropdown(child._id, e)}
                                        >
                                            <ChevronDown className={`h-5 w-5 transition-transform ${expandedDropdown === child._id ? 'rotate-180' : ''}`} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                            
                            {/* Account Actions Dropdown */}
                            {expandedDropdown === child._id && (
                                <motion.div 
                                    className="absolute right-4 mt-2 w-48 bg-white rounded-md shadow-lg z-10 py-1"
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                >
                                    <ul className="divide-y divide-gray-100">
                                        <li>
                                            <button 
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                                onClick={(e) => openDetailView(child._id, e)}
                                            >
                                                <Eye className="h-4 w-4 mr-2" />
                                                View Details
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                                onClick={(e) => openSettingsView(child._id, e)}
                                            >
                                                <Settings className="h-4 w-4 mr-2" />
                                                Account Settings
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <CreditCard className="h-4 w-4 mr-2" />
                                                Manage Card
                                            </button>
                                        </li>
                                        <li>
                                            <button 
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center"
                                                onClick={(e) => openTerminateConfirmation(child._id, e)}
                                            >
                                                <Trash2 className="h-4 w-4 mr-2" />
                                                Terminate Account
                                            </button>
                                        </li>
                                    </ul>
                                </motion.div>
                            )}
                        </div>
                    ))
                ) : (
                    <motion.div 
                        className="glass-card p-6 text-center"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                            <UserPlus className="h-8 w-8 text-gray-400" />
                        </div>
                        <h3 className="font-medium text-gray-700 mb-2">No Child Accounts</h3>
                        <p className="text-gray-500 text-sm mb-4">Get started by adding your first child account</p>
                        <motion.button
                            className="inline-flex items-center space-x-1 px-4 py-2 bg-brand-blue text-white text-sm rounded-lg"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onAddChildClick}
                        >
                            <Plus className="h-4 w-4" />
                            <span>Add First Child</span>
                        </motion.button>
                    </motion.div>
                )}
            </div>

            {/* Detail View Modal */}
            {detailViewOpen && childForDetail && (
                <ChildDetailView 
                    child={childForDetail} 
                    onClose={closeDetailView}
                    onUpdate={handleUpdateChild}
                />
            )}

            {/* Account Settings Modal */}
            {settingsViewOpen && selectedChildForSettings && (
                <ChildAccountSettings 
                    child={children.find(c => c._id === selectedChildForSettings)!}
                    onClose={() => setSettingsViewOpen(false)}
                    onUpdate={handleUpdateChild}
                />
            )}  

            {/* Confirmation Modal */}
            <ConfirmModal
                isOpen={confirmModalOpen}
                title="Terminate Account"
                message={`Are you sure you want to terminate ${childToTerminate?.name}'s account? This action cannot be undone and all account data will be permanently deleted.`}
                confirmText="Terminate Account"
                cancelText="Cancel"
                onConfirm={handleConfirmTerminate}
                onCancel={handleCancelTerminate}
                type="danger"
            />
        </section>
    );
};

export default ChildAccounts;