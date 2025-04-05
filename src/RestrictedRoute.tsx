"use client"

import type React from "react"

import { Navigate } from "react-router-dom"
import useAuth from "./hooks/useAuth"

const RestrictedRoute: React.FC = () => {
    const { user, loading, isAuthenticated } = useAuth()

    // Show loading while authentication state is being determined
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">Loading...</div>
    }

    // If not authenticated, redirect to login
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    if (user?.role === "parent") {
        return <Navigate to="/dashboard" replace />
    } else if (user?.role === "child") {
        return <Navigate to="/child-dashboard" replace />
    }

    // Default fallback if unknown role
    return <Navigate to="/login" replace />
}

export default RestrictedRoute

