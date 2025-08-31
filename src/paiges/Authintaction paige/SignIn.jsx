import { useState } from "react";
import { FaGraduationCap, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { NavLink } from "react-router-dom";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-300 to-blue-100">
            {/* Top Icon */}
            <div className="flex flex-col items-center mb-6">
                <div className="bg-gray-100 p-3 rounded-full shadow-sm">
                    <FaGraduationCap className="text-gray-700 text-2xl" />
                </div>
                <h1 className="text-2xl font-semibold mt-3">Welcome Back</h1>
                <p className="text-gray-500 text-sm">
                    Sign in to your Student Hub account
                </p>
            </div>

            {/* Card */}
            <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md">
                <h2 className="text-xl font-semibold text-center mb-6">Sign In</h2>
                <p className="text-gray-500 text-center text-sm mb-6">
                    Enter your credentials to access your account
                </p>

                {/* Email Input */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="flex items-center border rounded-lg px-3 mt-1">
                        <MdEmail className="text-gray-400 mr-2" />
                        <input
                            type="email"
                            placeholder="student@university.edu"
                            className="w-full p-2 outline-none"
                        />
                    </div>
                </div>

                {/* Password Input */}
                <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <div className="flex items-center border rounded-lg px-3 mt-1">
                        <FaLock className="text-gray-400 mr-2" />
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            className="w-full p-2 outline-none"
                        />
                        <button
                            type="button"
                            className="text-gray-400 text-sm"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                </div>

                {/* Forgot Password */}
                <div className="flex justify-end mb-4">
                    <a href="#" className="text-sm text-gray-500 hover:text-black">
                        Forgot password?
                    </a>
                </div>

                {/* Sign In Button */}
                <button className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition">
                    Sign In
                </button>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400 text-sm">OR CONTINUE WITH</span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Button */}
                <button className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition">
                    <FcGoogle className="text-xl" />
                    Continue with University Login
                </button>

                {/* Sign Up */}
                <p className="text-center text-sm text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <NavLink to={'/SignUP'}> <a href="#" className="text-black font-medium hover:underline">
                        Sign up
                    </a></NavLink>
                </p>
            </div>

            {/* Footer Icons */}
            <div className="flex gap-10 mt-10 text-gray-500 text-sm">
                <div className="flex flex-col items-center">
                    <span className="text-blue-500">📘</span>
                    <p>Study Resources</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-green-500">👥</span>
                    <p>Student Community</p>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-purple-500">🛠️</span>
                    <p>Academic Tools</p>
                </div>
            </div>
        </div>
    );
}
