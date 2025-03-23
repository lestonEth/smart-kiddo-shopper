import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    confirmButtonClass?: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmationIcon?: React.ReactNode;
    type?: 'warning' | 'danger' | 'info';
    children?: React.ReactNode; // Added children support
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    confirmButtonClass,
    onConfirm,
    onCancel,
    confirmationIcon,
    type = 'warning',
    children // Added children prop
}) => {
    // Determine button and icon styles based on type
    const getTypeStyles = () => {
        switch (type) {
            case 'danger':
                return {
                    buttonClass: 'bg-red-600 hover:bg-red-700 text-white',
                    iconClass: 'text-red-600',
                    bgClass: 'bg-red-50'
                };
            case 'info':
                return {
                    buttonClass: 'bg-blue-600 hover:bg-blue-700 text-white',
                    iconClass: 'text-blue-600',
                    bgClass: 'bg-blue-50'
                };
            case 'warning':
            default:
                return {
                    buttonClass: 'bg-amber-600 hover:bg-amber-700 text-white',
                    iconClass: 'text-amber-600',
                    bgClass: 'bg-amber-50'
                };
        }
    };

    const typeStyles = getTypeStyles();
    const buttonClass = confirmButtonClass || typeStyles.buttonClass;

    // Handle ESC key press
    React.useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && isOpen) {
                onCancel();
            }
        };

        window.addEventListener('keydown', handleEsc);
        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, [isOpen, onCancel]);

    // When modal is open, prevent body scrolling
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    {/* Backdrop */}
                    <motion.div
                        className="fixed inset-0 bg-black bg-opacity-40"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onCancel}
                    />

                    {/* Modal */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <motion.div
                            className="relative w-full max-w-md overflow-hidden rounded-lg bg-white shadow-xl"
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Close button */}
                            <button
                                className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-gray-500"
                                onClick={onCancel}
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="p-6">
                                {/* Icon */}
                                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${typeStyles.bgClass} mb-4`}>
                                    {confirmationIcon || (
                                        <AlertTriangle className={`h-6 w-6 ${typeStyles.iconClass}`} />
                                    )}
                                </div>

                                {/* Content */}
                                <div className="text-center">
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">{title}</h3>
                                    <p className="text-sm text-gray-500">{message}</p>
                                </div>

                                {/* Custom content (form inputs, etc.) */}
                                {children}

                                {/* Buttons */}
                                <div className="mt-6 flex justify-center space-x-3">
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                                        onClick={onCancel}
                                    >
                                        {cancelText}
                                    </button>
                                    <button
                                        type="button"
                                        className={`inline-flex justify-center rounded-md px-4 py-2 text-sm font-medium shadow-sm ${buttonClass}`}
                                        onClick={onConfirm}
                                    >
                                        {confirmText}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ConfirmModal;