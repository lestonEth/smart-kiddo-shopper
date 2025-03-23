
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from "@/PrivateRoute";
import RestrictedRoute from "@/RestrictedRoute";
import ChatShoppingPage from "@/pages/ChatShoppingPage";
import OrdersPage from "@/pages/OrdersPage";
const queryClient = new QueryClient();
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import ChildDashboard from "./pages/ChildDashboard";
import Chat from "./pages/Chat";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";
import WishlistPage from "./pages/WishlistPage";

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <AnimatePresence mode="wait">
                        <Routes>
                            <Route path="/" element={<Index />} />
                            <Route element={<RestrictedRoute />}>
                                <Route path="/login" element={<Login />} />
                            </Route>
                            {/* Protected Routes */}
                            <Route element={<PrivateRoute />}>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/child-dashboard" element={<ChildDashboard />} />
                                <Route path="/ChatShoppingPage" element={<ChatShoppingPage />} />
                                <Route path="/OrdersPage" element={<OrdersPage />} />
                                <Route path="/settings" element={<Settings />} />
                                <Route path="/WishListPage" element={<WishlistPage />} />
                            </Route>
                            <Route path="/chat" element={<Chat />} />

                            {/* Catch-all 404 Page */}
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </AnimatePresence>
                </BrowserRouter>
            </TooltipProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;
