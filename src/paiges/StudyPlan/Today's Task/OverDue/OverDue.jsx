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
        setOverdueTasks(overdueTasks)
    }, [overdueTasks , setOverdueTasks])

    return (
        <div className="space-y-6">
            {overdueTasks.length === 0 ? (
                <div className=" flex bg-white    rounded-lg shadow-lg  text-center h-40 w-full mb-8 justify-center items-center p-10">
                    <div className="">
                        <h2 className="text-3xl font-bold text-purple-700">
                            No overdue tasks 🎉
                        </h2>
                    </div>

                </div>
            ) : (
                overdueTasks.map((task, index) => (
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
                                    <div
                                        className="h-2 bg-blue-600 rounded-full"
                                        style={{ width: `${task.progress || 0}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{task.progress || 0}%</span>
                                    <span>Due: {task.dueDate}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span
                                    className={`text-sm ${task.priority === 'High' ? 'text-red-600' : 'text-gray-600'
                                        }`}
                                >
                                    {task.priority} Priority
                                </span>
                                <div className="flex items-center gap-4">
                                    <button className="text-blue-500 hover:underline flex items-center gap-2">
                                        <Edit size={20} />
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handelTaskDelet(task._id)}
                                        className="text-red-500 cursor-pointer hover:underline flex items-center gap-2"
                                    >
                                        <X size={20} />
                                        Delete
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
