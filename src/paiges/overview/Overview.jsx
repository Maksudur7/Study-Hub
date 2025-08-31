import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../Authintaction paige/AuthProvider';

const Overview = () => {
    const {logOut} = useContext(AuthContext)
    return (
        <div className="p-6 mx-14  min-h-screen">
            {/* Top Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500 ">Classes Today <span>📅</span></p>
                    <p className="text-2xl pt-5 pb-3 font-bold text-blue-600">5</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div className="bg-black h-2 rounded-full w-3/5"></div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Monthly Budget <span>$</span></p>
                    <p className="text-2xl pt-5 pb-3 font-bold text-green-600">$245</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div className="bg-black h-2 rounded-full w-2/3"></div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Study Goals 🧠</p>
                    <p className="text-2xl pt-5 pb-3 font-bold text-orange-600">12/15</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div className="bg-black h-2 rounded-full w-4/5"></div>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow">
                    <p className="text-sm text-gray-500">Quiz Score</p>
                    <p className="text-2xl pt-5 pb-3 font-bold text-purple-600">87%</p>
                    <div className="w-full bg-gray-200 h-2 rounded-full mt-2">
                        <div className="bg-black h-2 rounded-full w-4/5"></div>
                    </div>
                </div>
            </div>

            {/* Main Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <NavLink to={'/schedule'} className="bg-blue-500 text-start p-6 rounded-lg text-white">
                    <h2 className="font-bold text-lg mb-2">Class Schedule</h2>
                    <p className="text-sm pt-8 pb-3 mb-2">
                        Track all your classes and never miss one again!
                    </p>
                    <span className="bg-blue-700 px-3 py-1 rounded">5 Classes Today</span>
                </NavLink>

                <NavLink to={'/budget'} className="bg-green-500 text-start p-6 rounded-lg text-white">
                    <h2 className="font-bold text-lg mb-2">Budget Tracker</h2>
                    <p className="text-sm pt-8 pb-3 mb-2">Know exactly where your pocket money goes!</p>
                    <span className="bg-green-700 px-3 py-1 rounded">$245 This Month</span>
                </NavLink>

                <NavLink to={'/examQustion'} className="bg-purple-500 text-start p-6 rounded-lg text-white">
                    <h2 className="font-bold text-lg mb-2">Exam Q&A</h2>
                    <p className="text-sm pt-8 pb-3 mb-2">
                        Generate practice questions for better preparation!
                    </p>
                    <span className="bg-purple-700 px-3 py-1 rounded">3 Subjects Ready</span>
                </NavLink>

                <NavLink to={'/studyPlan'} className="bg-orange-500 text-start p-6 rounded-lg text-white">
                    <h2 className="font-bold text-lg mb-2">Study Planner</h2>
                    <p className="text-sm pt-8 pb-3 mb-2">
                        Break big goals into manageable tasks!
                    </p>
                    <span className="bg-orange-700 px-3 py-1 rounded">8 Tasks Today</span>
                </NavLink>
            </div>

            {/* Quick Actions */}
            <div className="bg-white mt-10 p-6 rounded-lg shadow">
                <h2 className="font-bold mb-4 pb-5">Quick Actions</h2>
                <div className="flex gap-4 flex-wrap">
                    <NavLink to={'/schedule'} className="bg-blue-500 text-white px-4 py-2  rounded-[10px]">Add New Class</NavLink>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-[10px]">Record Expense</button>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-[10px]">Generate Quiz</button>
                    <button className="bg-orange-500 text-white px-4 py-2 rounded-[10px]">Add Study Goal</button>
                    <button onClick={logOut} className="bg-black cursor-pointer text-white px-4 py-2 rounded-[10px]">Log Out</button>
                </div>
            </div>
        </div>
    );
};

export default Overview;