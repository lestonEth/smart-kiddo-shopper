import { createContext, useState, useEffect, ReactNode } from "react";
import { User } from "@/types/types";

// Define the shape of our context
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    loading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,
    login: async () => false,
    logout: () => { },
    loading: true
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuthStatus = async () => {
            try {
                // Try to load user data from localStorage or session storage
                const savedUser = localStorage.getItem("user");

                if (savedUser) {
                    setUser(JSON.parse(savedUser));
                }
            } catch (error) {
                console.error("Authentication check failed:", error);
            } finally {
                setLoading(false);
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        try {
            // Here you would normally make an API call to your authentication endpoint
            // For example:
            // const response = await fetch("/api/login", {
            //   method: "POST",
            //   headers: { "Content-Type": "application/json" },
            //   body: JSON.stringify({ email, password })
            // });
            // const data = await response.json();

            // For demonstration purposes, we'll simulate a successful login
            // Replace this with your actual authentication logic
            const mockUser: User = {
                id: "user123",
                email,
                name: email.split("@")[0],
                role: email.includes("parent") ? "parent" : "child",
            };

            // Save user to state and localStorage
            setUser(mockUser);
            localStorage.setItem("user", JSON.stringify(mockUser));

            setLoading(false);
            return true;
        } catch (error) {
            console.error("Login failed:", error);
            setLoading(false);
            return false;
        }
    };

    const logout = () => {
        // Clear user from state and localStorage
        setUser(null);
        localStorage.removeItem("user");
    };

    const isAuthenticated = !!user;

    const value = {
        user,
        isAuthenticated,
        login,
        logout,
        loading
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;