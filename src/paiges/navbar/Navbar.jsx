import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../Authintaction paige/AuthProvider";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const [drawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = () => setDrawerOpen(!drawerOpen);

    const links = [
        { to: "/", name: "Overview", icon: "📈", bgColor: "bg-purple-600", hoverColor: "hover:bg-purple-50" },
        { to: "/schedule", name: "Schedule", icon: "📅", bgColor: "bg-blue-600", hoverColor: "hover:bg-blue-50" },
        { to: "/budget", name: "Budget", icon: "$", bgColor: "bg-green-600", hoverColor: "hover:bg-green-50" },
        { to: "/examQustion", name: "Exam Q&A", icon: "🧠", bgColor: "bg-red-600", hoverColor: "hover:bg-red-50" },
        { to: "/studyPlan", name: "Study Plan", icon: "🎯", bgColor: "bg-yellow-500", hoverColor: "hover:bg-yellow-50" },
    ];

    return (
        <div className="relative">
            {/* PC Navbar */}
            <div className="hidden lg:block p-6">
                <div className="text-center mb-6 relative">
                    <h1 className="text-5xl font-bold text-purple-600">🎓 StudentHub</h1>

                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-40 flex items-center gap-3">
                        {user ? (
                            <div className="flex items-center gap-2">
                                <p className="truncate">{user?.displayName}</p>
                                <img
                                    className="rounded-full h-14 w-16 object-cover"
                                    src={user?.photoURL || "/default-avatar.png"}
                                    alt="User Avatar"
                                />
                            </div>
                        ) : (
                            <div className="flex gap-2 w-full">
                                <NavLink className="w-full bg-green-400 border border-black text-white py-2 rounded-lg font-medium hover:bg-green-600 transition" to="/signin">Sign In</NavLink>
                                <NavLink className="w-full bg-purple-400 border border-black text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition" to="/signup">Sign Up</NavLink>
                            </div>
                        )}
                    </div>
                </div>

                <p className="text-gray-600 mt-1 text-2xl text-center">
                    Your Complete Academic Companion - Never miss, never forget, always succeed!
                </p>

                <nav className="flex justify-center space-x-20 font-bold mx-14 bg-white p-3 rounded-lg shadow-lg mt-4">
                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                isActive
                                    ? `flex items-center space-x-2 text-white ${link.bgColor} rounded-xl px-4 py-2 shadow-md transition-all duration-300`
                                    : `flex items-center space-x-2 text-gray-700 ${link.hoverColor} rounded-xl px-4 py-2 transition-all duration-300`
                            }
                        >
                            <span>{link.icon}</span>
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </nav>
            </div>

            {/* Mobile / Tablet Navbar */}
            <div className="lg:hidden p-4 bg-white flex justify-between items-center shadow">
                <h1 className="text-3xl font-bold text-purple-600">🎓 StudentHub</h1>
                <button onClick={toggleDrawer}>
                    {drawerOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Drawer */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform ${drawerOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out z-50`}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold">Menu</h2>
                    <button onClick={toggleDrawer}><X size={24} /></button>
                </div>

                <div className="flex flex-col p-4 space-y-4">
                    {user && (
                        <div className="flex items-center gap-3 mb-4 border-b pb-4">
                            <img className="rounded-full h-12 w-12 object-cover" src={user?.photoURL || "/default-avatar.png"} alt="User Avatar" />
                            <p className="font-medium truncate">{user?.displayName}</p>
                        </div>
                    )}

                    {!user && (
                        <div className="flex flex-col gap-2 mb-4 border-b pb-4">
                            <NavLink className="w-full bg-green-400 border border-black text-white py-2 rounded-lg font-medium hover:bg-green-600 transition text-center" to="/signin">Sign In</NavLink>
                            <NavLink className="w-full bg-purple-400 border border-black text-white py-2 rounded-lg font-medium hover:bg-purple-600 transition text-center" to="/signup">Sign Up</NavLink>
                        </div>
                    )}

                    {links.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            onClick={() => setDrawerOpen(false)}
                            className={({ isActive }) =>
                                isActive
                                    ? `flex items-center space-x-2 text-white ${link.bgColor} rounded-xl px-4 py-2 shadow-md transition-all duration-300`
                                    : `flex items-center space-x-2 text-gray-700 ${link.hoverColor} rounded-xl px-4 py-2 transition-all duration-300`
                            }
                        >
                            <span>{link.icon}</span>
                            <span>{link.name}</span>
                        </NavLink>
                    ))}
                </div>
            </div>

            {drawerOpen && <div className="fixed inset-0 bg-black opacity-30 z-40" onClick={toggleDrawer}></div>}        </div>
    );
};

export default Navbar;
