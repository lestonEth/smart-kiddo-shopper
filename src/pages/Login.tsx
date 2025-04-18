"use client"

import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import PageTransition from "@/components/landingApp/PageTransition"
import AnimatedAssistant from "@/components/landingApp/AnimatedAssistant"
import { Eye, EyeOff, Lock, Mail, User, ArrowLeft, ShieldCheck, X } from "lucide-react"
import { register, forgotPassword } from "@/api/auth"
import { toast } from "@/hooks/use-toast"
import useAuth from "@/hooks/useAuth"

const Login = () => {
    const [isLogin, setIsLogin] = useState(true)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [showForgotPassword, setShowForgotPassword] = useState(false)
    const [forgotPasswordEmail, setForgotPasswordEmail] = useState("")
    const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false)
    const { login, user, isAuthenticated } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    })

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            redirectBasedOnRole(user)
        }
    }, [isAuthenticated, user])

    const redirectBasedOnRole = (userData) => {
        if (userData?.role === "parent") {
            navigate("/dashboard")
        } else if (userData?.role === "child") {
            navigate("/child-dashboard")
        } else {
            // Fallback in case role isn't recognized
            navigate("/restricted")
        }
    }

    const handleLogin = async () => {
        if (!formData.email || !formData.password) {
            toast({ title: "Error", description: "Email and password are required." })
            return
        }

        setLoading(true)
        setError("")

        try {
            // Use the context login function which handles localStorage
            const { success, user: loggedInUser } = await login(formData.email, formData.password)

            if (success && loggedInUser) {
                toast({ title: "Success!", description: "Login successful." })

                // Redirect based on user role
                redirectBasedOnRole(loggedInUser)
            } else {
                setError("Login failed. Please check your credentials.")
                toast({ title: "Error", description: "Login failed. Please check your credentials." })
            }
        } catch (err) {
            const errorMessage =
                err && typeof err === "object" && "message" in err ? err.message : "An error occurred. Please try again."

            setError(errorMessage)
            console.error(err)
            toast({ title: "Error", description: errorMessage })
        } finally {
            setLoading(false)
        }
    }

    const handleRegister = async () => {
        // Validate all required fields
        if (!formData.username || !formData.email || !formData.password) {
            toast({ title: "Error", description: "All fields are required." })
            return
        }

        // Validate password
        if (formData.password.length < 8) {
            toast({ title: "Error", description: "Password must be at least 8 characters long." })
            return
        }

        // Validate password confirmation
        if (formData.password !== formData.confirmPassword) {
            toast({ title: "Error", description: "Passwords don't match." })
            return
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(formData.email)) {
            toast({ title: "Error", description: "Please enter a valid email address." })
            return
        }

        setLoading(true)
        setError("")

        try {
            const userData = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                role: "parent",
            }

            const response = await register(userData)

            if (response && response.success) {
                toast({
                    title: "Registration Successful!",
                    description: "Your account has been created. You can now log in.",
                })
                setIsLogin(true)
                setFormData({
                    ...formData,
                    username: "",
                    password: "",
                    confirmPassword: "",
                })
            } else {
                setError("Registration failed. Please try again.")
                toast({ title: "Error", description: "Registration failed. Please try again." })
            }
        } catch (err) {
            const errorMessage =
                err && typeof err === "object" && "message" in err ? err.message : "An error occurred. Please try again."

            setError(errorMessage)
            console.error(err)
            toast({ title: "Error", description: errorMessage })
        } finally {
            setLoading(false)
        }
    }

    const handleForgotPassword = async (e) => {
        e.preventDefault()

        // Validate email
        if (!forgotPasswordEmail) {
            toast({ title: "Error", description: "Email is required." })
            return
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(forgotPasswordEmail)) {
            toast({ title: "Error", description: "Please enter a valid email address." })
            return
        }

        setForgotPasswordLoading(true)

        try {
            const response = await forgotPassword({ email: forgotPasswordEmail })

            if (response && response.success) {
                toast({
                    title: "Password Reset Email Sent",
                    description: "Please check your email for password reset instructions.",
                })
                setShowForgotPassword(false)
                setForgotPasswordEmail("")
            } else {
                toast({ title: "Error", description: "Failed to send reset email. Please try again." })
            }
        } catch (err) {
            const errorMessage =
                err && typeof err === "object" && "message" in err ? err.message : "An error occurred. Please try again."

            console.error(err)
            toast({ title: "Error", description: errorMessage })
        } finally {
            setForgotPasswordLoading(false)
        }
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        if (isLogin) {
            handleLogin()
        } else {
            handleRegister()
        }
    }

    return (
        <PageTransition>
            <div className="min-h-screen bg-gray-50 flex">
                <Link
                    to="/"
                    className="absolute top-8 left-8 flex items-center space-x-2 text-gray-600 hover:text-brand-blue transition-colors z-10"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>

                <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-brand-blue to-brand-blue-dark">
                    <div className="absolute inset-0 bg-opacity-70 flex flex-col items-center justify-center p-12 text-white">
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="mb-8"
                        >
                            <AnimatedAssistant variant="medium" className="mx-auto" />
                        </motion.div>

                        <motion.h2
                            className="text-3xl font-bold mb-4 text-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.5 }}
                        >
                            The Safe Way for Kids to Shop Online
                        </motion.h2>

                        <motion.p
                            className="text-lg text-white/80 text-center max-w-md"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.7 }}
                        >
                            Shopmeai gives your children the freedom to explore while keeping you in control.
                        </motion.p>

                        <motion.div
                            className="mt-12 space-y-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                        >
                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <ShieldCheck className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Parent-Approved Purchases</h3>
                                    <p className="text-sm text-white/70">Every transaction requires your approval</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <Lock className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Secure Child Accounts</h3>
                                    <p className="text-sm text-white/70">Protected logins with parental controls</p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <div className="bg-white/20 p-2 rounded-full">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h3 className="font-medium">Kid-Friendly Interface</h3>
                                    <p className="text-sm text-white/70">Designed for children of all ages</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="max-w-md w-full">
                        <motion.div
                            className="text-center mb-8"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Link to="/" className="inline-flex items-center mb-4">
                                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-blue to-brand-coral flex items-center justify-center text-white font-bold text-xl">
                                    SM
                                </div>
                                <span className="ml-2 font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-coral">
                                    Shopmeai
                                </span>
                            </Link>
                            <h1 className="text-2xl font-bold mb-2">{isLogin ? "Welcome back!" : "Create an account"}</h1>
                            <p className="text-gray-600">
                                {isLogin ? "Sign in to your account to continue" : "Get started with your free parent account"}
                            </p>
                        </motion.div>

                        <motion.form
                            onSubmit={handleFormSubmit}
                            className="glass-card p-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <div className="space-y-5">
                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type="text"
                                                className="bg-white pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                                                placeholder="Enter your name"
                                                value={formData.username}
                                                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                                required={!isLogin}
                                            />
                                        </div>
                                    </div>
                                )}

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Mail className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type="email"
                                            className="bg-white pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                                            placeholder="Enter your email"
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <label className="block text-sm font-medium text-gray-700">Password</label>
                                        {isLogin && (
                                            <button
                                                type="button"
                                                className="text-sm text-brand-blue hover:underline"
                                                onClick={() => setShowForgotPassword(true)}
                                            >
                                                Forgot password?
                                            </button>
                                        )}
                                    </div>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                            <Lock className="h-5 w-5 text-gray-400" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="bg-white pl-10 pr-12 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                                            placeholder="Enter your password"
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            required
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5 text-gray-400" />
                                            ) : (
                                                <Eye className="h-5 w-5 text-gray-400" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {!isLogin && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock className="h-5 w-5 text-gray-400" />
                                            </div>
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                className="bg-white pl-10 pr-12 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                                                placeholder="Confirm your password"
                                                value={formData.confirmPassword}
                                                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                                required={!isLogin}
                                            />
                                        </div>
                                    </div>
                                )}

                                <motion.button
                                    type="submit"
                                    className="w-full bg-brand-blue text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-brand-blue-dark transition-all"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : isLogin ? (
                                        "Sign In"
                                    ) : (
                                        "Create Account"
                                    )}
                                </motion.button>
                            </div>

                            {error && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">{error}</div>}

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                                    <button
                                        type="button"
                                        className="text-brand-blue font-medium hover:underline"
                                        onClick={() => {
                                            setIsLogin(!isLogin)
                                            setError("")
                                            setFormData({
                                                username: "",
                                                email: "",
                                                password: "",
                                                confirmPassword: "",
                                            })
                                        }}
                                    >
                                        {isLogin ? "Sign up" : "Sign in"}
                                    </button>
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-gray-200">
                                <p className="text-center text-sm text-gray-500 mb-4">Or continue with</p>
                                <div className="flex space-x-3">
                                    <motion.button
                                        type="button"
                                        className="flex-1 flex items-center justify-center space-x-2 bg-white border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M19.9895 10.1875C19.9895 9.36754 19.9214 8.76504 19.7742 8.14254H10.1992V11.8488H15.8219C15.7069 12.7658 15.0923 14.1508 13.7173 15.0813L13.6995 15.2051L16.6945 17.5151L16.8927 17.5346C18.7927 15.7896 19.9895 13.1906 19.9895 10.1875Z"
                                                fill="#4285F4"
                                            />
                                            <path
                                                d="M10.1992 19.9837C12.9529 19.9837 15.2634 19.0953 16.8927 17.5347L13.7173 15.0813C12.8759 15.6682 11.7237 16.078 10.1992 16.078C7.50087 16.078 5.21539 14.3395 4.39848 11.9366L4.27753 11.9465L1.13174 14.3273L1.08965 14.439C2.71209 17.6944 6.20089 19.9837 10.1992 19.9837Z"
                                                fill="#34A853"
                                            />
                                            <path
                                                d="M4.39846 11.9366C4.18217 11.3141 4.05759 10.6404 4.05759 9.98203C4.05759 9.32413 4.18217 8.65038 4.38628 8.02788L4.38045 7.89573L1.19304 5.4624L1.08963 5.56054C0.397575 6.94854 0.0158691 8.4937 0.0158691 10.0002C0.0158691 11.5066 0.397575 13.0518 1.08963 14.4398L4.39846 11.9366Z"
                                                fill="#FBBC05"
                                            />
                                            <path
                                                d="M10.1992 3.8855C12.1142 3.8855 13.4067 4.6815 14.1409 5.3635L16.9698 2.601C15.2527 0.989 12.9528 0 10.1992 0C6.20088 0 2.71209 2.2893 1.08965 5.56054L4.38629 8.02788C5.21539 5.62495 7.50087 3.8855 10.1992 3.8855Z"
                                                fill="#EA4335"
                                            />
                                        </svg>
                                        <span>Google</span>
                                    </motion.button>

                                    <motion.button
                                        type="button"
                                        className="flex-1 flex items-center justify-center space-x-2 bg-white border border-gray-300 py-2.5 rounded-lg hover:bg-gray-50 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                d="M18.75 10C18.75 5.16797 14.832 1.25 10 1.25C5.16797 1.25 1.25 5.16797 1.25 10C1.25 14.4395 4.55469 18.0938 8.85938 18.75V12.5781H6.48438V10H8.85938V8.02734C8.85938 5.78906 10.3281 4.45312 12.3438 4.45312C13.3086 4.45312 14.3125 4.625 14.3125 4.625V6.875H13.1953C12.0977 6.875 11.7188 7.51953 11.7188 8.18359V10H14.2031L13.7734 12.5781H11.7188V18.75C16.0234 18.0938 18.75 14.4395 18.75 10Z"
                                                fill="#1877F2"
                                            />
                                        </svg>
                                        <span>Facebook</span>
                                    </motion.button>
                                </div>
                            </div>
                        </motion.form>

                        <motion.p
                            className="text-center text-xs text-gray-500 mt-6"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.8 }}
                        >
                            By signing in or creating an account, you agree to our{" "}
                            <a href="#" className="text-brand-blue hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="#" className="text-brand-blue hover:underline">
                                Privacy Policy
                            </a>
                        </motion.p>
                    </div>
                </div>
            </div>

            {/* Forgot Password Modal */}
            {showForgotPassword && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <motion.div
                        className="bg-white rounded-lg max-w-md w-full p-6 relative"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <button
                            type="button"
                            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
                            onClick={() => setShowForgotPassword(false)}
                        >
                            <X className="h-6 w-6" />
                        </button>

                        <h3 className="text-xl font-bold mb-4">Reset Your Password</h3>
                        <p className="text-gray-600 mb-6">
                            Enter your email address and we'll send you instructions to reset your password.
                        </p>

                        <form onSubmit={handleForgotPassword}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        className="bg-white pl-10 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-blue focus:border-transparent"
                                        placeholder="Enter your email"
                                        value={forgotPasswordEmail}
                                        onChange={(e) => setForgotPasswordEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    className="flex-1 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                                    onClick={() => setShowForgotPassword(false)}
                                >
                                    Cancel
                                </button>

                                <motion.button
                                    type="submit"
                                    className="flex-1 bg-brand-blue text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg hover:bg-brand-blue-dark transition-all"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={forgotPasswordLoading}
                                >
                                    {forgotPasswordLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg
                                                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                            >
                                                <circle
                                                    className="opacity-25"
                                                    cx="12"
                                                    cy="12"
                                                    r="10"
                                                    stroke="currentColor"
                                                    strokeWidth="4"
                                                ></circle>
                                                <path
                                                    className="opacity-75"
                                                    fill="currentColor"
                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                ></path>
                                            </svg>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}
        </PageTransition>
    )
}

export default Login

