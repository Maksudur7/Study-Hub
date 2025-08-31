import { BookOpen } from 'lucide-react';
import React from 'react';
import { NavLink } from 'react-router-dom';

const Subjects = () => {
    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                {/* Mathematics */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center mb-8 gap-2">
                            <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                            <span className="font-semibold ">Mathematics</span>
                        </div>
                        <span className="text-sm text-gray-600">25 Q's</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Average Score</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-1 overflow-hidden">
                        <div className="h-2 bg-black w-[87%]"></div>
                    </div>
                    <p className="text-right text-sm font-medium text-gray-700 mb-3">87%</p>
                    <div className="flex items-center gap-2">
                        <NavLink to={'/examQustion/qustion'} className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white flex-1 px-4 py-2 rounded-lg">
                            <BookOpen size={16} /> Start Quiz
                        </NavLink>
                        <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-600">+</button>
                    </div>
                </div>

                {/* Physics */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center mb-8 gap-2">
                            <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                            <span className="font-semibold">Physics</span>
                        </div>
                        <span className="text-sm text-gray-600">20 Q's</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Average Score</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-1 overflow-hidden">
                        <div className="h-2 bg-black w-[82%]"></div>
                    </div>
                    <p className="text-right text-sm font-medium text-gray-700 mb-3">82%</p>
                    <div className="flex items-center gap-2">
                        <NavLink to={'/examQustion/qustion'} className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white flex-1 px-4 py-2 rounded-lg">
                            <BookOpen size={16} /> Start Quiz
                        </NavLink>
                        <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-600">+</button>
                    </div>
                </div>

                {/* Chemistry */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center mb-8 gap-2">
                            <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
                            <span className="font-semibold">Chemistry</span>
                        </div>
                        <span className="text-sm text-gray-600">18 Q's</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Average Score</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-1 overflow-hidden">
                        <div className="h-2 bg-black w-[78%]"></div>
                    </div>
                    <p className="text-right text-sm font-medium text-gray-700 mb-3">78%</p>
                    <div className="flex items-center gap-2">
                        <NavLink to={'/examQustion/qustion'} className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white flex-1 px-4 py-2 rounded-lg">
                            <BookOpen size={16} /> Start Quiz
                        </NavLink>
                        <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-600">+</button>
                    </div>
                </div>

                {/* Biology */}
                <div className="bg-white rounded-lg shadow p-5 flex flex-col">
                    <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center mb-8 gap-2">
                            <span className="w-3 h-3 bg-orange-500 rounded-full"></span>
                            <span className="font-semibold">Biology</span>
                        </div>
                        <span className="text-sm text-gray-600">15 Q's</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">Average Score</p>
                    <div className="w-full h-2 bg-gray-200 rounded-full mb-1 overflow-hidden">
                        <div className="h-2 bg-black w-[92%]"></div>
                    </div>
                    <p className="text-right text-sm font-medium text-gray-700 mb-3">92%</p>
                    <div className="flex items-center gap-2">
                        <NavLink to={'/examQustion/qustion'} className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white flex-1 px-4 py-2 rounded-lg">
                            <BookOpen size={16} /> Start Quiz
                        </NavLink>
                        <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-600">+</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Subjects;