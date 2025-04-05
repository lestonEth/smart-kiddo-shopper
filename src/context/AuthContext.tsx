"use client"

import { createContext, useState, useEffect, type ReactNode } from "react"
import type { User } from "@/types/types"
import { login as apiLogin, logout as apiLogout, getCurrentUser } from "@/api/auth"

// Define the shape of our context
interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    login: (email: string, password: string) => Promise<{ success: boolean; user: User | null }>
    logout: () => void
    loading: boolean
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: async () => ({ success: false, user: null }),
    logout: () => { },
    loading: true,
})

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    // Check for existing session on mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Load user data from localStorage
                const currentUser = getCurrentUser()
                if (currentUser) {
                    setUser(currentUser)
                }
            } catch (error) {
                console.error("Authentication check failed:", error)
                // Clear potentially corrupted auth data
                localStorage.removeItem("user")
                localStorage.removeItem("authToken")
            } finally {
                setLoading(false)
            }
        }

        checkAuthStatus()
    }, [])

    const login = async (email: string, password: string): Promise<{ success: boolean; user: User | null }> => {
        setLoading(true)
        try {
            // Use the API login function which handles localStorage
            const response = await apiLogin({ email, password })

            if (response && response.success) {
                // Set user in context state
                setUser(response.user)
                setLoading(false)
                return { success: true, user: response.user }
            } else {
                setLoading(false)
                return { success: false, user: null }
            }
        } catch (error) {
            console.error("Login failed:", error)
            setLoading(false)
            return { success: false, user: null }
        }
    }

    const logout = () => {
        // Use the API logout function which handles localStorage
        apiLogout()
        setUser(null)
    }

    const isAuthenticated = !!user

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        loading,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContext

