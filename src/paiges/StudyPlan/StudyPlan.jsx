import React, { useState } from 'react';
import { Plus, X, CheckCircle, Edit, FileText, AlertTriangle, Book, Bookmark } from 'lucide-react'; // Importing all required icons

const StudyPlan = () => {
    const [isAddTaskOpen, setAddTaskOpen] = useState(false);
    const [isAddGoalOpen, setAddGoalOpen] = useState(false);

    const tasks = [
        {
            title: 'Master Calculus',
            description: 'Complete all calculus chapters and practice problems',
            progress: 60,
            dueDate: '2024-08-30',
            priority: 'High',
            subject: 'Mathematics',
        },
        {
            title: 'Practice integration problems',
            description: 'Solve 20 integration problems',
            progress: 0,
            dueDate: '2024-09-02',
            priority: 'Low',
            subject: 'Mathematics',
        },
    ];

    // Handle modal open/close
    const openAddTask = () => setAddTaskOpen(true);
    const closeAddTask = () => setAddTaskOpen(false);
    const openAddGoal = () => setAddGoalOpen(true);
    const closeAddGoal = () => setAddGoalOpen(false);

    return (
        <div className="mx-14 p-6 min-h-screen">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
                 📚 Study Planner
                </h1>
                <div className="flex gap-4">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 flex items-center gap-2" onClick={openAddTask}>
                        <Plus size={20} />
                        Add Task
                    </button>
                    <button className="bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 flex items-center gap-2" onClick={openAddGoal}>
                        <Plus size={20} />
                        Add Goal
                    </button>
                </div>
            </div>

            <p className="text-gray-600 mb-4">Break down big goals into manageable tasks!</p>

            {/* Today's Tasks and Overdue */}
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText size={24} className="text-blue-600" />
                        <span className="text-lg font-semibold">Today's Tasks</span>
                    </div>
                    <span className="text-sm text-gray-500">0</span>
                </div>

                <div className="bg-red-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={24} className="text-red-600" />
                        <span className="text-lg font-semibold">Overdue</span>
                    </div>
                    <span className="text-sm text-gray-500">3</span>
                </div>

                <div className="bg-green-100 p-6 rounded-lg shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CheckCircle size={24} className="text-green-600" />
                        <span className="text-lg font-semibold">Active Goals</span>
                    </div>
                    <span className="text-sm text-gray-500">2</span>
                </div>
            </div>

            {/* Task List */}
            <div className="space-y-6">
                {tasks.map((task, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex gap-4">
                        <div className="flex-shrink-0">
                            <Bookmark size={30} className="text-blue-500" />
                        </div>
                        <div className="flex-grow">
                            <h3 className="text-xl font-semibold text-gray-700">{task.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{task.description}</p>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${task.progress}%` }}></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{task.progress}%</span>
                                    <span>Due: {task.dueDate}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className={`text-sm ${task.priority === 'High' ? 'text-red-600' : 'text-gray-600'}`}>{task.priority} Priority</span>
                                <div className="flex items-center gap-4">
                                    <button className="text-blue-500 hover:underline flex items-center gap-2">
                                        <Edit size={20} />
                                        Edit
                                    </button>
                                    <button className="text-red-500 hover:underline flex items-center gap-2">
                                        <X size={20} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Task Modal */}
            {isAddTaskOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Add New Task</h2>
                            <button onClick={closeAddTask}>
                                <X size={20} />
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Study Goal</label>
                                <select className="w-full p-2 border border-gray-300 rounded-md">
                                    <option>Select goal</option>
                                    {/* Add goal options here */}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Study derivatives"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Complete chapter 3 on derivatives"
                                ></textarea>
                            </div>
                            <div className="flex justify-between">
                                <div className="w-1/2 pr-2">
                                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                                    <select className="w-full p-2 border border-gray-300 rounded-md">
                                        <option>Select priority</option>
                                        <option>Low</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                                </div>
                            </div>
                            <div className="mt-4 text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                                >
                                    Add Task
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Add Goal Modal */}
            {isAddGoalOpen && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-semibold">Create New Study Goal</h2>
                            <button onClick={closeAddGoal}>
                                <X size={20} />
                            </button>
                        </div>
                        <form>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Goal Title</label>
                                <input
                                    type="text"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Master Calculus"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Complete all calculus chapters and practice problems"
                                ></textarea>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <select className="w-full p-2 border border-gray-300 rounded-md">
                                    <option>Select subject</option>
                                    <option>Mathematics</option>
                                    <option>Physics</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select className="w-full p-2 border border-gray-300 rounded-md">
                                    <option>Select priority</option>
                                    <option>Low</option>
                                    <option>High</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Target Date</label>
                                <input type="date" className="w-full p-2 border border-gray-300 rounded-md" />
                            </div>
                            <div className="mt-4 text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-500 text-white py-2 px-6 rounded-md hover:bg-blue-600"
                                >
                                    Create Goal
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StudyPlan;
