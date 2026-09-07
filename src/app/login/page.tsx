'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { Eye, EyeOff, Loader2, ShoppingBag } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

function SignIn() {

    const [loading , setLoading] = useState(false)
    const [email, setEmail] = useState("")
 

    const [password, setPassword] = useState("")

    const [showPassword, setShowPassword] = useState(false)

    const [error, setError] = useState("")
    

    const router = useRouter()
    const session = useSession()
    console.log(session.data?.user)



    const handleSignIn = async(e:React.FormEvent)=>{
         e.preventDefault()
    
        setLoading(true)
        setError("")
        try {

            const result = await signIn("credentials" , {
                email,
                password,
                redirect:false
            })
            // Sends the email and password to the NextAuth Credentials provider without automatically redirecting.

            if(result?.error){
                // Checks whether NextAuth returned an authentication error.

                setError("Invalid email or password")
                // Shows an authentication error message to the user.

                setLoading(false)
                // Stops the loading state when authentication fails.

                return
                // Stops the function so navigation does not happen.
            }

            setLoading(false)
            // Stops the loading state after successful authentication.

            router.push('/')
            // Redirects the user to the home page after successful sign-in.

        } catch (error) {
            // Runs when an unexpected error occurs during authentication.

            console.error("SIGN IN ERROR:", error)
            // Prints the actual error in the browser console for debugging.

            setError("Something went wrong. Please try again.")
            // Shows a generic error message to the user.

            setLoading(false)
            // Stops the loading state after the error.
        }
    }


    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-4 py-10 overflow-hidden relative">

            {/* Background glow */}
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl"
            />
            {/* Adds a soft indigo glow to the top-left background. */}

            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl"
            />
            {/* Adds a soft purple glow to the bottom-right background. */}


            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="relative z-10 w-full max-w-md"
            >
                {/* Creates the main animated authentication container. */}


                <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/50">
                    {/* Creates the glassmorphism login card. */}


                    <motion.div
                        initial={{ opacity: 0, y: -15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center text-center mb-8"
                    >
                        {/* Creates the animated header section. */}

                        <motion.div
                            whileHover={{ rotate: 5, scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20 mb-4"
                        >
                            {/* Creates the animated MultiCart icon container. */}

                            <ShoppingBag size={27} />
                            {/* Displays the shopping bag icon. */}

                        </motion.div>

                        <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        {/* Displays the login heading. */}

                        <p className="text-gray-400 text-sm mt-2">
                            Sign in to continue to MultiCart
                        </p>
                        {/* Displays the login subtitle. */}

                    </motion.div>


                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300"
                        >
                            {error}
                        </motion.div>
                    )}
                    {/* Displays an animated authentication error when login fails. */}


                    <motion.form
                        onSubmit={handleSignIn}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="space-y-5"
                    >
                        {/* Creates the animated sign-in form. */}


                        <div>
                            {/* Creates the email field container. */}

                            <label className="block text-sm text-gray-300 mb-2">
                                Email Address
                            </label>
                            {/* Displays the email field label. */}

                            <input
                                required
                                type="email"
                                placeholder="Enter your email"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                disabled={loading}
                                className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-sm outline-none placeholder:text-gray-600 focus:border-indigo-500/70 focus:bg-white/[0.06] disabled:opacity-60 transition-all"
                            />
                            {/* Collects the user's email address. */}

                        </div>


                        <div>
                            {/* Creates the password field container. */}

                            <label className="block text-sm text-gray-300 mb-2">
                                Password
                            </label>
                            {/* Displays the password field label. */}

                            <div className="relative">
                                {/* Creates the password input wrapper. */}

                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    disabled={loading}
                                    className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 pr-12 text-sm outline-none placeholder:text-gray-600 focus:border-indigo-500/70 focus:bg-white/[0.06] disabled:opacity-60 transition-all"
                                />
                                {/* Collects the user's password while supporting visibility toggling. */}

                                <motion.button
                                    type="button"
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={loading}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white disabled:opacity-40 transition-colors"
                                >
                                    {/* Creates the animated password visibility button. */}

                                    {showPassword ? (
                                        <EyeOff size={19} />
                                    ) : (
                                        <Eye size={19} />
                                    )}
                                    {/* Displays the correct icon depending on password visibility. */}

                                </motion.button>

                            </div>

                        </div>


                        <div className="flex justify-end">
                            {/* Creates the forgot-password action area. */}

                            <button
                                type="button"
                                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
                            >
                                Forgot password?
                            </button>
                            {/* Displays the forgot-password link. */}

                        </div>


                        <motion.button
                            disabled={loading}
                            type="submit"
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.98 }}
                            className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 font-semibold transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {/* Creates the animated sign-in button. */}

                            {loading ? (
                                <>
                                    <Loader2
                                        size={20}
                                        className="animate-spin"
                                    />
                                    Signing In...
                                </>
                            ) : (
                                "Sign In"
                            )}
                            {/* Shows a spinner during authentication and Sign In otherwise. */}

                        </motion.button>


                        <div className="flex items-center gap-3 py-2">
                            {/* Creates the divider section. */}

                            <div className="h-px flex-1 bg-white/10" />
                            {/* Creates the left divider line. */}

                            <span className="text-xs text-gray-500">
                                OR
                            </span>
                            {/* Displays the divider text. */}

                            <div className="h-px flex-1 bg-white/10" />
                            {/* Creates the right divider line. */}

                        </div>


                        <motion.button
                        onClick={()=>signIn("google" , {callbackUrl:"/"})}
                            type="button"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            disabled={loading}
                            className="w-full h-12 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-3 font-medium disabled:opacity-50"
                        >
                            {/* Creates the animated Google sign-in button. */}

                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                                {/* Creates the Google icon container. */}

                                <span className="text-xs font-bold text-gray-900">
                                    G
                                </span>
                                {/* Displays the Google letter. */}

                            </div>

                            Continue With Google
                            {/* Displays the Google authentication label. */}

                        </motion.button>


                        <p className="text-center text-sm text-gray-500 pt-2">
                            {/* Creates the account registration message. */}

                            Don't have an account?{" "}

                            <button
                                type="button"
                                onClick={() => router.push('/register')}
                                className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                            >
                                Sign Up
                            </button>
                            {/* Sends users to the registration page. */}

                        </p>

                    </motion.form>

                </div>


                <p className="text-center text-xs text-gray-600 mt-5">
                    © 2026 MultiCart. All rights reserved.
                </p>
                {/* Displays the footer copyright text. */}

            </motion.div>

        </div>
    )
}

export default SignIn