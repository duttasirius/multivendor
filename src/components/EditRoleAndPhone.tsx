'use client'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { TruckIcon, User, UserCog2 } from 'lucide-react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

function EditRoleAndPhone() {

    const [role, setRole] = useState<string>("")
    const [phone, setPhone] = useState<string>("")
    const [adminExists, setAdminExists] = useState(false)
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const roles = [
        { label: "Admin", value: "admin", icon: <UserCog2 className="w-6 h-6" /> },
        { label: "Vendor", value: "vendor", icon: <TruckIcon className="w-6 h-6" /> },
        { label: "User", value: "user", icon: <User className="w-6 h-6" /> }
    ]

    // checking if admin acc already created
    useEffect(() => {
        const checkAdmin = async () => {
            try {
                const result = await axios.get("/api/admin/check-admin");

                if (result.data.success) {
                    setAdminExists(true);
                }
            } catch (error) {
                console.error("Error checking admin:", error);
            }
        };

        checkAdmin();
    }, []);

    // if admin already exists, remove "admin" from the list completely
    const visibleRoles = roles.filter((rol) => {
        if (rol.value === "admin" && adminExists) {
            return false
        }
        return true
    })

    const handleSubmit =async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        if(!role || !phone){
            alert("PLEASE SELECT ROLE & ENTER PHONE  NUMBER")
        }
       try {
        const result = await axios.post('/api/user/edit-role' , {role , phone})
        console.log("this is from edit role page",result.data);
        setLoading(false);
        router.push('/')
       } catch (error) {
        console.log({ role, phone })
        setLoading(false)
       }
        
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8"
                >
                    <h1 className="text-2xl font-bold text-gray-800 text-center">
                        Choose your role
                    </h1>
                    <p className="text-sm text-gray-500 text-center mt-1 mb-6">
                        Enter your mobile number to continue
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                        <input
                            type="text"
                            maxLength={10}
                            required
                            placeholder="Enter Mobile Number"
                            onChange={(e) => setPhone(e.target.value)}
                            value={phone}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        {/* role selection */}
                        <motion.div
                            layout
                            className="grid grid-cols-3 gap-3"
                        >
                            <AnimatePresence>
                                {visibleRoles.map((rol) => {
                                    // "role" comes from React state: const [role, setRole] = useState("user")
// This checks whether the current role is selected.

                                    const isSelected = role === rol.value

                                    return (
                                        <motion.div
                                            key={rol.value}
                                            layout
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setRole(rol.value)}
                                            className={`flex flex-col items-center justify-center gap-2 border rounded-xl py-4 cursor-pointer transition-colors
                                                ${isSelected
                                                    ? "border-blue-500 bg-blue-50 text-blue-600"
                                                    : "border-gray-200 text-gray-500 hover:border-gray-300"
                                                }`}
                                        >
                                            <div>{rol.icon}</div>
                                            <p className="text-xs font-medium capitalize">{rol.label}</p>
                                        </motion.div>
                                    )
                                })}
                            </AnimatePresence>
                        </motion.div>

                        <motion.button
                            type="submit"
                            whileTap={{ scale: 0.97 }}
                            disabled={loading}
                            className="w-full bg-blue-600 text-white font-semibold py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-60"
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </motion.button>
                    </form>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

export default EditRoleAndPhone