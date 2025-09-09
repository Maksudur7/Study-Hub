import React, {  useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Authintaction paige/AuthProvider";

const Navbar = () => {
    const {user} = useContext(AuthContext)
    return (
        <div className="p-6">
            {/* Header */}
            <div className="text-center  mb-6">
                <div className="relative flex justify-center items-center ">
                    {/* Centered h1 */}
                    <h1 className="text-5xl font-bold text-purple-600">🎓 StudentHub</h1>

                    {/* Profile absolute right */}
                    <div className="absolute right-2 w-40 flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-2">
                                <p className="">{user?.displayName}</p>
                                <img
                                    className="rounded-full h-14 w-16 object-cover"
                                    src={user?.photoURL || "/default-avatar.png"}
                                    alt="User Avatar"
                                />
                            </div>
                        ) : (
                            <div className="flex gap-2 w-full">
                                <NavLink
                                    className="w-full bg-green-400 border border-black text-white py-2 rounded-lg font-medium hover:bg-green-600 transition"
                                    to="/signin"
                                >
                                    Sign In
                                </NavLink>
                                <NavLink
                                    className="w-full bg-purple-400 border border-black text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition"
                                    to="/signup"
                                >
                                    Sign Up
                                </NavLink>
                            </div>
                        )}
                    </div>

                </div>

                <p className="text-gray-600 mt-1 text-2xl">
                    Your Complete Academic Companion - Never miss, never forget, always succeed!
                </p>
            </div>


            {/* Navigation */}
            <nav className="flex justify-center space-x-20 font-bold mx-14 bg-white p-3 rounded-lg shadow-lg">
                <NavLink
                    to={'/'}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-2 text-white bg-purple-600 rounded-xl px-4 py-2 shadow-md transition-all duration-300"
                            : "flex items-center space-x-2 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl px-4 py-2 transition-all duration-300"
                    }
                >
                    <span>📈</span>
                    <span>Overview</span>
                </NavLink>
                <NavLink
                    to={'/schedule'}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-2 text-white bg-blue-600 rounded-xl px-4 py-2 shadow-md transition-all duration-300"
                            : "flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl px-4 py-2 transition-all duration-300"
                    }
                >
                    <span>📅</span>
                    <span>Schedule</span>
                </NavLink>
                <NavLink
                    to={'/budget'}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-2 text-white bg-green-600 rounded-xl px-4 py-2 shadow-md transition-all duration-300"
                            : "flex items-center space-x-2 text-gray-700 hover:text-green-600 hover:bg-green-50 rounded-xl px-4 py-2 transition-all duration-300"
                    }
                >
                    <span>$</span>
                    <span>Budget</span>
                </NavLink>
                <NavLink
                    to={'/examQustion'}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-2 text-white bg-red-600 rounded-xl px-4 py-2 shadow-md transition-all duration-300"
                            : "flex items-center space-x-2 text-gray-700 hover:text-red-600 hover:bg-red-50 rounded-xl px-4 py-2 transition-all duration-300"
                    }
                >
                    <span>🧠</span>
                    <span>Exam Q&A</span>
                </NavLink>
                <NavLink
                    to={'/studyPlan'}
                    className={({ isActive }) =>
                        isActive
                            ? "flex items-center space-x-2 text-white bg-blue-600 rounded-xl px-4 py-2 shadow-md transition-all duration-300"
                            : "flex items-center space-x-2 text-gray-700 hover:text-blue-600 hover:bg-yellow-50 rounded-xl px-4 py-2 transition-all duration-300"
                    }
                >
                    <span>🎯</span>
                    <span>Study Plan</span>
                </NavLink>
            </nav>
        </div>
    );
};

export default Navbar;
