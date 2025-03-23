import React, { useEffect, useState } from 'react';
import Navbar from '@/components/landingApp/Navbar';
import PageTransition from '@/components/landingApp/PageTransition';
import ParentControls from '@/components/landingApp/ParentControls';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import OverviewSection from '@/components/dashboard/OverviewSection';
import ActivityTable from '@/components/dashboard/ActivityTable';
import ChildAccounts from '@/components/dashboard/ChildAccounts';
import QuickActions from '@/components/dashboard/QuickActions';
import AddChildForm from '@/components/dashboard/AddChildForm';
import { registerChild } from '@/api/child_api';
import { getChildren, deleteChild } from '@/api/parent_api';
import { Child, Activity, FormData } from '@/types/types';
import { useToast, toast } from '@/hooks/use-toast';
// Sample data
const initialChildren: Child[] = [];

const recentActivities: Activity[] = [
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

// Sample parent ID for the current logged-in parent
const PARENT_ID = "parent_123456";

const Dashboard: React.FC = () => {
    const [children, setChildren] = useState<Child[]>(initialChildren);
    const [activities] = useState<Activity[]>(recentActivities);
    const [selectedChild, setSelectedChild] = useState<string | null>(null);
    const [showAddChildForm, setShowAddChildForm] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const totalBalance = children.reduce((sum, child) => sum + child.balance, 0);
    const activeChildrenCount = children.filter(c => c.active).length;
    const purchasesThisMonth = 7; // Hardcoded value from original component

    useEffect(() => {
        // Fetch children data from the API
        const fetchChildren = async () => {
            try {
                const response = await getChildren();
                if (response && response.children) {
                    console.log(response.children);
                    setChildren(response.children);
                }
            } catch (err: any) {
                toast( {title: 'Error', description: err?.message || "Failed to fetch children data"});
                setError(err?.message || "Failed to fetch children data");
            }
        };

        fetchChildren();
    }, []);


    const handleAddChild = () => {
        setShowAddChildForm(true);
        setError(null);
    };

    const handleCancelAddChild = () => {
        setShowAddChildForm(false);
        setError(null);
    };

    const handleSubmitAddChild = async (formData: FormData) => {
        try {
            setIsSubmitting(true);
            setError(null);
            
            // Prepare data for API
            const childApiData = {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                age: Number(formData.age),
                spending_limit: Number(formData.spending_limit)
            };
            
            // Call the API to register the child
            const response = await registerChild(childApiData);
            // // If successful, create a new child object with data from the response
            if (response && response.child._id) {
                // Create avatar from first letter of name
                const avatar = formData.name.charAt(0).toUpperCase();
                
                // Create a new child object
                const newChild: Child = {
                    id: response._id, // Use the ID from the API response
                    name: formData.name,
                    avatar: avatar,
                    balance: 0, // Start with zero balance
                    spendingLimit: Number(formData.spending_limit),
                    active: true // Newly added child is active by default
                };

                // Add the new child to the list
                setChildren([...children, newChild]);

                // Close the form
                setShowAddChildForm(false);

                // Select the newly added child
                setSelectedChild(response._id);
                toast( {title: 'Success', description: 'Child account registered successfully'});
            } else {
                throw new Error("Failed to register child account");
            }
        } catch (err: any) {
            toast( {title: 'Error', description: err?.message || "Failed to register child account"});
            setError(err?.message || "Failed to register child account");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleUpdateBalance = (childId: string, amount: number) => {
        setChildren(children.map(child =>
            child._id === childId ? { ...child, balance: amount } : child
        ));
    };

    const handleUpdateLimit = (childId: string, limit: number) => {
        setChildren(children.map(child =>
            child._id === childId ? { ...child, spendingLimit: limit } : child
        ));
    };

    const handleToggleActive = (childId: string, active: boolean) => {
        setChildren(children.map(child =>
            child._id === childId ? { ...child, active } : child
        ));
    };

    const handleSelectChild = (childId: string) => {
        setSelectedChild(selectedChild === childId ? null : childId);
    };

    const handleTerminateChildAccount = (childId: string) => {
        try {
            // Call the API to delete the child account
            deleteChild(childId);
            
            // Remove the child from the list
            setChildren(children.filter(child => child._id !== childId));
            setSelectedChild(null);
            toast( {title: 'Success', description: 'Child account terminated successfully'});
        }
        catch (err: any) {
            toast( {title: 'Error', description: err?.message || "Failed to terminate child account"});
            setError(err?.message || "Failed to terminate child account");
        }
    };

    return (
        <PageTransition>
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <main className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
                    <DashboardHeader
                        title="Parent Dashboard"
                        subtitle="Manage your children's accounts and spending"
                    />

                    {error && (
                        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
                            {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-8">
                            <OverviewSection
                                totalBalance={totalBalance}
                                activeChildrenCount={activeChildrenCount}
                                purchasesThisMonth={purchasesThisMonth}
                            />

                            <ActivityTable activities={activities} />
                        </div>

                        <div className="space-y-8">
                            {showAddChildForm ? (
                                <AddChildForm
                                    onSubmit={handleSubmitAddChild}
                                    onCancel={handleCancelAddChild}
                                    parentId={PARENT_ID}
                                    isSubmitting={isSubmitting}
                                />
                            ) : (
                                <>
                                    <ChildAccounts
                                        children={children}
                                        selectedChild={selectedChild}
                                        onSelectChild={handleSelectChild}
                                        onAddChildClick={handleAddChild}
                                        onTerminateAccount={handleTerminateChildAccount}
                                    />

                                    {selectedChild && (
                                        <section>
                                            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
                                            <ParentControls
                                                child={children.find(c => c._id === selectedChild)!}
                                                onUpdateBalance={handleUpdateBalance}
                                                onUpdateLimit={handleUpdateLimit}
                                                onToggleActive={handleToggleActive}
                                            />
                                        </section>
                                    )}

                                    <QuickActions />
                                </>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </PageTransition>
    );
};

export default Dashboard;