'use client'

import React, { ReactNode, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import {
  ArrowLeft,
  ArrowRightIcon,
  Eye,
  EyeOff,
  Loader2,
  Truck,
  User2,
  UserCog2,
} from 'lucide-react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { signIn } from 'next-auth/react'

function Register() {

  const [step, setStep] = useState<1 | 2>(1)
  const [role, setRole] = useState<'user' | 'vendor' | 'admin'>('user')
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
const router = useRouter()
const [loading , setLoading] = useState(false);

const handleSignUp = async(e:React.FormEvent)=>{
    e.preventDefault()
    setLoading(true)
    try {
        const result = await axios.post('/api/auth/register',{name , email, password});
        console.log(result.data)
        setLoading(false);
        setName("")
        setEmail("")
        setPassword("")
        router.push('/login')
    } catch (error) {
        console.log(error)
    }
}

  const roles = [
    {
      label: "User",
      value: "user" as const,
      icon: <User2 size={25} />,
      description: "Shop products and manage your orders",
    },
    {
      label: "Vendor",
      value: "vendor" as const,
      icon: <Truck size={25} />,
      description: "Sell products and manage your store",
    },
    {
      label: "Admin",
      value: "admin" as const,
      icon: <UserCog2 size={25} />,
      description: "Manage the entire MultiCart platform",
    },
  ]

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white flex items-center justify-center px-4 py-10 overflow-hidden relative">

      {/* Background glow */}
      <div className="absolute top-[-120px] left-[-120px] w-80 h-80 bg-indigo-600/20 rounded-full blur-3xl" />
      <div className="absolute bottom-[-120px] right-[-120px] w-80 h-80 bg-purple-600/20 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md"
      >

        {/* Main Card */}
        <div className="bg-white/[0.04] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/40">

          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight bg-gradient-to-r from-white via-indigo-200 to-purple-300 bg-clip-text text-transparent">
              MultiCart
            </h1>

            <p className="text-gray-400 text-sm mt-2">
              Your marketplace. Your world.
            </p>
          </motion.div>

          {/* Progress Indicator */}
          <div className="flex items-center gap-3 mb-8">

            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                step >= 1
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-white/10"
              }`}
            />

            <div
              className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                step >= 2
                  ? "bg-gradient-to-r from-indigo-500 to-purple-500"
                  : "bg-white/10"
              }`}
            />

          </div>

          <AnimatePresence mode="wait">

            {/* STEP 1 */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.35 }}
              >

                <div className="mb-7">
                  <h2 className="text-2xl font-semibold">
                    Welcome to MultiCart
                  </h2>

                  <p className="text-gray-400 text-sm mt-2">
                    Choose how you want to use the platform.
                  </p>
                </div>

                <div className="space-y-3">

                  {roles.map((item) => (

                    <motion.button
                      key={item.value}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setRole(item.value)}
                      className={`w-full flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 ${
                        role === item.value
                          ? "border-indigo-500/80 bg-indigo-500/10 shadow-lg shadow-indigo-500/10"
                          : "border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20"
                      }`}
                    >

                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all ${
                          role === item.value
                            ? "bg-gradient-to-br from-indigo-500 to-purple-600 text-white"
                            : "bg-white/5 text-gray-400"
                        }`}
                      >
                        {item.icon}
                      </div>

                      <div className="flex-1">

                        <div className="flex items-center justify-between">

                          <span className="font-semibold">
                            {item.label}
                          </span>

                          {role === item.value && (
                            <motion.div
                              layoutId="selectedRole"
                              className="w-2.5 h-2.5 rounded-full bg-indigo-400 shadow-lg shadow-indigo-400/50"
                            />
                          )}

                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                          {item.description}
                        </p>

                      </div>

                    </motion.button>

                  ))}

                </div>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setStep(2)}
                  className="mt-6 w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 transition-all flex items-center justify-center gap-2 font-semibold shadow-lg shadow-indigo-500/20"
                >
                  Next
                  <ArrowRightIcon size={18} />
                </motion.button>

              </motion.div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35 }}
              >

                <div className="mb-7">

                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-5"
                  >
                    <ArrowLeft size={16} />
                    Back
                  </button>

                  <h2 className="text-2xl font-semibold">
                    Create Your Account
                  </h2>

                  <p className="text-gray-400 text-sm mt-2">
                    Register as a{" "}
                    <span className="text-indigo-400 font-medium capitalize">
                      {role}
                    </span>
                    .
                  </p>

                </div>

                <form onSubmit={handleSignUp} className="space-y-4">

                  {/* Name */}
                  <div>

                    <label className="block text-sm text-gray-300 mb-2">
                      Full Name
                    </label>

                    <input
                      required
                      type="text"
                      placeholder="Enter your name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-sm outline-none placeholder:text-gray-600 focus:border-indigo-500/70 focus:bg-white/[0.06] transition-all"
                    />

                  </div>

                  {/* Email */}
                  <div>

                    <label className="block text-sm text-gray-300 mb-2">
                      Email Address
                    </label>

                    <input
                      required
                      type="email"
                      placeholder="Enter your email"
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 text-sm outline-none placeholder:text-gray-600 focus:border-indigo-500/70 focus:bg-white/[0.06] transition-all"
                    />

                  </div>

                  {/* Password */}
                  <div>

                    <label className="block text-sm text-gray-300 mb-2">
                      Password
                    </label>

                    <div className="relative">

                      <input
                        required
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        className="w-full h-12 rounded-xl bg-white/[0.04] border border-white/10 px-4 pr-12 text-sm outline-none placeholder:text-gray-600 focus:border-indigo-500/70 focus:bg-white/[0.06] transition-all"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff size={19} />
                        ) : (
                          <Eye size={19} />
                        )}
                      </button>

                    </div>

                  </div>

                  {/* Register */}
                 <motion.button
    disabled={loading}
    type="submit"
    whileHover={{ scale: loading ? 1 : 1.02 }}
    whileTap={{ scale: loading ? 1 : 0.98 }}
    className="w-full h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 font-semibold transition-all shadow-lg shadow-indigo-500/20 mt-2 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
>
    {loading ? (
        <>
            <Loader2
                size={20}
                className="animate-spin"
            />
            Creating Account...
        </>
    ) : (
        "Create Account"
    )}
</motion.button>

                  {/* Divider */}
                  <div className="flex items-center gap-3 py-2">

                    <div className="h-px flex-1 bg-white/10" />

                    <span className="text-xs text-gray-500">
                      OR
                    </span>

                    <div className="h-px flex-1 bg-white/10" />

                  </div>

                  {/* Google */}
                  <motion.button
                  onClick={()=>signIn("google" , {callbackUrl:"/"})}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-12 rounded-xl border border-white/10 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/20 transition-all flex items-center justify-center gap-3 font-medium"
                  >

                    <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center">
                      <span className="text-xs font-bold text-gray-900">
                        G
                      </span>
                    </div>

                    Continue With Google

                  </motion.button>

                  {/* Login */}
                  <p className="text-center text-sm text-gray-500 pt-2">

                    Already have an account?{" "}

                    <button
                      type="button"
                      onClick={() => router.push('/login')}
                      className="text-indigo-400 hover:text-indigo-300 font-medium transition-colors"
                    >
                      Sign In
                    </button>

                  </p>

                </form>

              </motion.div>
            )}

          </AnimatePresence>

        </div>

        {/* Bottom text */}
        <p className="text-center text-xs text-gray-600 mt-5">
          © 2026 MultiCart. All rights reserved.
        </p>

      </motion.div>

    </div>
  )
}

export default Register