import { useContext, useState } from "react";
import { FaGraduationCap, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export default function SignIn() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { loginUser, googleLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            await loginUser(email, password);
            navigate(location?.state?.from?.pathname || "/");
        } catch (err) {
            console.error(err);
            setError("Invalid email or password");
        }
    };

    const handleGoogleLogin = async () => {
        try {
            await googleLogin();
            navigate(location?.state?.from?.pathname || "/");
        } catch (err) {
            console.error(err);
            setError("Google sign-in failed");
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-300 to-blue-100 px-4 sm:px-6 lg:px-8">
            {/* Top Icon */}
            <div className="flex flex-col items-center mb-6 text-center">
                <div className="bg-gray-100 p-3 rounded-full shadow-sm">
                    <FaGraduationCap className="text-gray-700 text-2xl sm:text-3xl" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-semibold mt-3">
                    Welcome Back
                </h1>
                <p className="text-gray-600 text-sm sm:text-base">
                    Sign in to your Student Hub account
                </p>
            </div>

            {/* Card */}
            <div className="bg-white shadow-md rounded-xl p-6 sm:p-8 w-full max-w-sm sm:max-w-md md:max-w-lg">
                <h2 className="text-xl sm:text-2xl font-semibold text-center mb-4 sm:mb-6">
                    Sign In
                </h2>
                <p className="text-gray-500 text-center text-sm sm:text-base mb-6">
                    Enter your credentials to access your account
                </p>

                {/* Error message */}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    {/* Email Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <div className="flex items-center border rounded-lg px-3 mt-1">
                            <MdEmail className="text-gray-400 mr-2 text-lg" />
                            <input
                                type="email"
                                placeholder="student@university.edu"
                                className="w-full p-2 outline-none text-sm sm:text-base"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    {/* Password Input */}
                    <div className="mb-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <div className="flex items-center border rounded-lg px-3 mt-1">
                            <FaLock className="text-gray-400 mr-2 text-lg" />
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter your password"
                                className="w-full p-2 outline-none text-sm sm:text-base"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="text-gray-400 text-sm ml-2"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "🙈" : "👁️"}
                            </button>
                        </div>
                    </div>

                    {/* Forgot Password */}
                    <div className="flex justify-end mb-4">
                        <a
                            href="#"
                            className="text-sm text-gray-500 hover:text-black transition"
                        >
                            Forgot password?
                        </a>
                    </div>

                    {/* Sign In Button */}
                    <button
                        type="submit"
                        className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 transition"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center my-6">
                    <hr className="flex-grow border-gray-300" />
                    <span className="mx-2 text-gray-400 text-xs sm:text-sm">
                        OR CONTINUE WITH
                    </span>
                    <hr className="flex-grow border-gray-300" />
                </div>

                {/* Google Button */}
                <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50 transition text-sm sm:text-base"
                >
                    <FcGoogle className="text-xl" />
                    Continue with Google
                </button>

                {/* Sign Up */}
                <p className="text-center text-sm sm:text-base text-gray-500 mt-6">
                    Don’t have an account?{" "}
                    <NavLink
                        to={"/signup"}
                        className="text-black font-medium hover:underline"
                    >
                        Sign up
                    </NavLink>
                </p>
            </div>
        </div>
    );
}
