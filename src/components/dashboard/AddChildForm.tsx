import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, DollarSign, Mail, Lock, Calendar, X } from 'lucide-react';

interface FormData {
    name: string;
    email: string;
    password: string;
    dob: string;
    age: number | string;
    parent_id: string;
    spending_limit: number | string;
}

interface ErrorState {
    name?: string;
    email?: string;
    password?: string;
    dob?: string;
    spending_limit?: string;
}

interface AddChildFormProps {
    onSubmit: (data: FormData) => void;
    onCancel: () => void;
    parentId: string;
    isSubmitting?: boolean;
}

const AddChildForm: React.FC<AddChildFormProps> = ({ onSubmit, onCancel, parentId, isSubmitting = false }) => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        password: '',
        dob: '',
        age: '',
        parent_id: parentId || '',
        spending_limit: 0
    });

    const [errors, setErrors] = useState<ErrorState>({});

    // Calculate age whenever DOB changes
    useEffect(() => {
        if (formData.dob) {
            const today = new Date();
            const birthDate = new Date(formData.dob);
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            
            // Adjust age if birthday hasn't occurred yet this year
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            
            setFormData(prevData => ({
                ...prevData,
                age: age
            }));
        }
    }, [formData.dob]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'spending_limit' ?
                (value === '' ? '' : Number(value)) :
                value
        });

        // Clear error when field is being edited
        if (errors[name as keyof ErrorState]) {
            setErrors({
                ...errors,
                [name]: undefined
            });
        }
    };

    const validate = (): boolean => {
        const newErrors: ErrorState = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        if (!formData.password) newErrors.password = "Password is required";
        else if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
        
        if (!formData.dob) newErrors.dob = "Date of birth is required";
        else {
            const age = Number(formData.age);
            if (age < 5 || age > 17) newErrors.dob = "Child must be between 5 and 17 years old";
        }
        
        const spendingLimit = Number(formData.spending_limit);
        if (spendingLimit < 0) newErrors.spending_limit = "Spending limit cannot be negative";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            onSubmit({
                ...formData,
                parent_id: parentId || formData.parent_id
            });
        }
    };

    // Calculate max date (minimum age of 5 years)
    const getMaxDate = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 5);
        return date.toISOString().split('T')[0];
    };

    // Calculate min date (maximum age of 17 years)
    const getMinDate = () => {
        const date = new Date();
        date.setFullYear(date.getFullYear() - 18);
        return date.toISOString().split('T')[0];
    };

    return (
        <motion.div
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
        >
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold">Add Child Account</h2>
                <motion.button
                    onClick={onCancel}
                    className="text-gray-500 hover:text-gray-700"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    disabled={isSubmitting}
                >
                    <X className="h-5 w-5" />
                </motion.button>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <User className="h-5 w-5" />
                            </div>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`pl-10 pr-3 py-2 w-full rounded-lg border ${errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent`}
                                placeholder="Child's full name"
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Mail className="h-5 w-5" />
                            </div>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`pl-10 pr-3 py-2 w-full rounded-lg border ${errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent`}
                                placeholder="Child's email address"
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                        <div className="relative">
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                <Lock className="h-5 w-5" />
                            </div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`pl-10 pr-3 py-2 w-full rounded-lg border ${errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                    } focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent`}
                                placeholder="Create a password"
                                disabled={isSubmitting}
                            />
                        </div>
                        {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                        <p className="mt-1 text-xs text-gray-500">Password must be at least 6 characters long</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <Calendar className="h-5 w-5" />
                                </div>
                                <input
                                    type="date"
                                    name="dob"
                                    value={formData.dob}
                                    onChange={handleChange}
                                    className={`pl-10 pr-3 py-2 w-full rounded-lg border ${errors.dob ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent`}
                                    min={getMinDate()}
                                    max={getMaxDate()}
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.dob && <p className="mt-1 text-sm text-red-600">{errors.dob}</p>}
                            {formData.age && <p className="mt-1 text-xs text-gray-500">Age: {formData.age} years</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Spending Limit ($)</label>
                            <div className="relative">
                                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                                    <DollarSign className="h-5 w-5" />
                                </div>
                                <input
                                    type="number"
                                    name="spending_limit"
                                    value={formData.spending_limit}
                                    onChange={handleChange}
                                    className={`pl-10 pr-3 py-2 w-full rounded-lg border ${errors.spending_limit ? 'border-red-300 bg-red-50' : 'border-gray-300'
                                        } focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent`}
                                    placeholder="Spending limit"
                                    min="0"
                                    step="0.01"
                                    disabled={isSubmitting}
                                />
                            </div>
                            {errors.spending_limit && <p className="mt-1 text-sm text-red-600">{errors.spending_limit}</p>}
                        </div>
                    </div>

                    {!parentId && (
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Parent ID</label>
                            <input
                                type="text"
                                name="parent_id"
                                value={formData.parent_id}
                                onChange={handleChange}
                                className="px-3 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                                placeholder="Parent account ID"
                                readOnly={!!parentId}
                                disabled={isSubmitting}
                            />
                            <p className="mt-1 text-xs text-gray-500">This field is auto-filled when adding from parent dashboard</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 space-x-4 flex">
                    <motion.button
                        type="submit"
                        className={`px-4 py-2 ${isSubmitting ? 'bg-gray-400' : 'bg-brand-blue'} text-white rounded-lg flex-grow font-medium`}
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Creating Account...' : 'Create Account'}
                    </motion.button>

                    <motion.button
                        type="button"
                        onClick={onCancel}
                        className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg"
                        whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                        whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                        disabled={isSubmitting}
                    >
                        Cancel
                    </motion.button>
                </div>
            </form>
        </motion.div>
    );
};

export default AddChildForm;