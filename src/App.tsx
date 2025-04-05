"use client"

import type React from "react"

import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { AnimatePresence } from "framer-motion"
import { AuthProvider } from "./context/AuthContext"
import PrivateRoute from "@/PrivateRoute"
import RestrictedRoute from "@/RestrictedRoute"
import ChatShoppingPage from "@/pages/ChatShoppingPage"
import OrdersPage from "@/pages/OrdersPage"
import Index from "./pages/Index"
import Dashboard from "./pages/Dashboard"
import ChildDashboard from "./pages/ChildDashboard"
import Chat from "./pages/Chat"
import Login from "./pages/Login"
import Settings from "./pages/Settings"
import NotFound from "./pages/NotFound"
import WishlistPage from "@/pages/WishlistPage"
import useAuth from "./hooks/useAuth"

const queryClient = new QueryClient()

const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { user, isAuthenticated, loading } = useAuth()

    // Show loading or children while authentication state is being determined
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    if (isAuthenticated) {
        if (user?.role === "parent") {
            return <Navigate to="/dashboard" replace />
        } else if (user?.role === "child") {
            return <Navigate to="/child-dashboard" replace />
        }
    }

    return <>{children}</>
}

const App = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <AnimatePresence mode="wait">
                        <TooltipProvider>
                            <Toaster />
                            <Sonner />
                            <Routes>
                                {/* Public Routes */}
                                <Route path="/" element={<Index />} />
                                <Route
                                    path="/login"
                                    element={
                                        <PublicRoute>
                                            <Login />
                                        </PublicRoute>
                                    }
                                />

                                {/* Role Determination Route */}
                                <Route path="/restricted" element={<RestrictedRoute />} />

                                {/* Protected Routes - Parent Only */}
                                <Route element={<PrivateRoute allowedRoles={["parent"]} />}>
                                    <Route path="/dashboard" element={<Dashboard />} />
                                    <Route path="/chat" element={<Chat />} />
                                    <Route path="/settings" element={<Settings />} />
                                </Route>

                                {/* Protected Routes - Child Only */}
                                <Route element={<PrivateRoute allowedRoles={["child"]} />}>
                                    <Route path="/child-dashboard" element={<ChildDashboard />} />
                                    <Route path="/chat-shopping" element={<ChatShoppingPage />} />
                                    <Route path="/orders" element={<OrdersPage />} />
                                    <Route path="/wishlist" element={<WishlistPage />} />
                                </Route>

                                {/* Catch-all 404 Page */}
                                <Route path="*" element={<NotFound />} />
                            </Routes>
                        </TooltipProvider>
                    </AnimatePresence>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    )
}

export default App

