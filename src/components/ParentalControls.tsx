
import { useState } from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import {
    CircleDollarSign,
    ShieldCheck,
    Clock,
    Bell,
    Gift,
    CreditCard,
    ShoppingBag
} from "lucide-react";

const ParentalControls = () => {
    const [spendingLimit, setSpendingLimit] = useState<number>(50);
    const [notifications, setNotifications] = useState<boolean>(true);
    const [autoApprove, setAutoApprove] = useState<boolean>(false);
    const [safeSearch, setSafeSearch] = useState<boolean>(true);

    return (
        <section id="parental-controls" className="py-20 px-4 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-950">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-14 reveal-item">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient">
                        Secure Shopping for the Whole Family
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-3xl mx-auto text-lg">
                        Our advanced parental controls give you peace of mind while empowering your children to learn financial responsibility.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="reveal-item">
                        <Tabs defaultValue="controls" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-6">
                                <TabsTrigger value="controls">Parental Controls</TabsTrigger>
                                <TabsTrigger value="security">Security Features</TabsTrigger>
                            </TabsList>

                            <TabsContent value="controls" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <CircleDollarSign className="mr-2 h-5 w-5 text-blue-500" />
                                            Spending Controls
                                        </CardTitle>
                                        <CardDescription>
                                            Set spending limits and approve purchases
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Daily Spending Limit</span>
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="range"
                                                    min="0"
                                                    max="100"
                                                    value={spendingLimit}
                                                    onChange={(e) => setSpendingLimit(parseInt(e.target.value))}
                                                    className="accent-blue-500"
                                                />
                                                <span className="w-12 text-right">${spendingLimit}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Purchase Approval</span>
                                            <Switch
                                                checked={autoApprove}
                                                onCheckedChange={setAutoApprove}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Purchase Notifications</span>
                                            <Switch
                                                checked={notifications}
                                                onCheckedChange={setNotifications}
                                            />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="text-sm text-gray-500">
                                        Changes are saved automatically
                                    </CardFooter>
                                </Card>
                            </TabsContent>

                            <TabsContent value="security" className="space-y-6">
                                <Card>
                                    <CardHeader>
                                        <CardTitle className="flex items-center">
                                            <ShieldCheck className="mr-2 h-5 w-5 text-blue-500" />
                                            Security Settings
                                        </CardTitle>
                                        <CardDescription>
                                            Configure safety and privacy settings
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Safe Search</span>
                                            <Switch
                                                checked={safeSearch}
                                                onCheckedChange={setSafeSearch}
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Age-Appropriate Content</span>
                                            <Switch
                                                checked={true}
                                                disabled
                                            />
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-medium">Biometric Authentication</span>
                                            <Switch />
                                        </div>
                                    </CardContent>
                                    <CardFooter className="text-sm text-gray-500">
                                        Advanced security settings applied to all accounts
                                    </CardFooter>
                                </Card>
                            </TabsContent>
                        </Tabs>
                    </div>

                    <div className="parent-bubble p-4 relative lg:mt-0 mt-10 reveal-item">
                        <div className="relative z-10 glass-card rounded-2xl overflow-hidden shadow-2xl p-2">
                            <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden">
                                <div className="p-6 bg-blue-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-bold text-lg flex items-center">
                                            <ShoppingBag className="mr-2 h-5 w-5 text-blue-500" />
                                            Shopping Cart
                                        </h3>
                                        <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full">
                                            Parent Approval
                                        </span>
                                    </div>
                                </div>
                                <div className="p-6 space-y-4">
                                    <div className="space-y-3">
                                        {[1, 2, 3].map((item) => (
                                            <div key={item} className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-gray-800">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center">
                                                        {item === 1 ? (
                                                            <Gift className="h-6 w-6 text-blue-500" />
                                                        ) : item === 2 ? (
                                                            <CreditCard className="h-6 w-6 text-green-500" />
                                                        ) : (
                                                            <Clock className="h-6 w-6 text-purple-500" />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-sm">
                                                            {item === 1 ? "LEGO Space Set" : item === 2 ? "Science Book" : "Art Supplies"}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">
                                                            {item === 1 ? "Toys" : item === 2 ? "Books" : "Crafts"}
                                                        </p>
                                                    </div>
                                                </div>
                                                <p className="font-semibold">
                                                    ${item === 1 ? "24.99" : item === 2 ? "14.50" : "19.95"}
                                                </p>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-2 flex items-center justify-between">
                                        <span className="font-medium">Total</span>
                                        <span className="font-bold">$59.44</span>
                                    </div>

                                    <div className="pt-4 flex justify-between space-x-3">
                                        <button className="w-full py-2 px-4 border border-blue-500 text-blue-500 rounded-md text-sm font-medium hover:bg-blue-50 dark:hover:bg-blue-950 transition-colors">
                                            Review
                                        </button>
                                        <button className="w-full py-2 px-4 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition-colors">
                                            Approve
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="child-bubble absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-300 to-purple-500 dark:from-purple-700 dark:to-purple-900 rounded-full opacity-50 blur-xl"></div>
                            <div className="child-bubble absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-300 to-blue-500 dark:from-blue-700 dark:to-blue-900 rounded-full opacity-50 blur-xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ParentalControls;