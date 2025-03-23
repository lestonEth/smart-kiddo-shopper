import React, { createContext, useState, useEffect, ReactNode } from "react";

interface User {
    _id: string;
    name: string;
    role: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    logout: () => void;
}

// Create context with default values (undefined to enforce usage within provider)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);

  
    useEffect(() => {
        try {
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage:", error);
            localStorage.removeItem("user"); // Remove invalid data
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("authToken");
        localStorage.removeItem("user");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, setUser, logout }
        }>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
