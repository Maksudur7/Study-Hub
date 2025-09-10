import { Bookmark, Edit, X } from 'lucide-react';
import React, { useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

const OverDue = () => {
    const { tasks, handelTaskDelet, setOverdueTasks } = useOutletContext();

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const overdueTasks = tasks.filter(task => {
        if (!task.dueDate) return false;
        const due = new Date(task.dueDate);
        due.setHours(0, 0, 0, 0);
        return due < today;
    });

    useEffect(() => {
        setOverdueTasks(overdueTasks);
    }, [overdueTasks, setOverdueTasks]);

    return (
        <div className="space-y-6">
            {overdueTasks.length === 0 ? (
                <div className="flex bg-white rounded-lg shadow-lg text-center h-40 w-full mb-8 justify-center items-center p-4 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-bold text-purple-700">
                        No overdue tasks 🎉
                    </h2>
                </div>
            ) : (
                overdueTasks.map((task, index) => (
                    <div
                        key={index}
                        className="bg-white p-4 md:p-6 rounded-lg shadow-lg flex flex-col md:flex-row gap-4 md:gap-6"
                    >
                        {/* Icon */}
                        <div className="flex-shrink-0 flex justify-center md:justify-start w-full md:w-auto">
                            <Bookmark size={30} className="text-blue-500" />
                        </div>

                        {/* Content */}
                        <div className="flex-grow w-full">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-700">
                                {task.title}
                            </h3>
                            <p className="text-sm md:text-base text-gray-600 mb-4">{task.description}</p>

                            {/* Progress Bar */}
                            <div className="mb-4">
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div
                                        className="h-2 bg-blue-600 rounded-full"
                                        style={{ width: `${task.progress || 0}%` }}
                                    ></div>
                                </div>
                                <div className="flex flex-col md:flex-row justify-between text-sm text-gray-500 mt-1">
                                    <span>{task.progress || 0}%</span>
                                    <span>Due: {task.dueDate}</span>
                                </div>
                            </div>

                            {/* Priority and Actions */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-3 md:gap-0">
                                <span
                                    className={`text-sm md:text-base ${task.priority === 'High' ? 'text-red-600' : 'text-gray-600'}`}
                                >
                                    {task.priority} Priority
                                </span>
                                <div className="flex flex-col sm:flex-row gap-2 md:gap-4 mt-2 md:mt-0">
                                    <button className="text-blue-500 hover:underline flex items-center gap-2">
                                        <Edit size={20} />
                                        <span className="hidden sm:inline">Edit</span>
                                    </button>
                                    <button
                                        onClick={() => handelTaskDelet(task._id)}
                                        className="text-red-500 cursor-pointer hover:underline flex items-center gap-2"
                                    >
                                        <X size={20} />
                                        <span className="hidden sm:inline">Delete</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default OverDue;
