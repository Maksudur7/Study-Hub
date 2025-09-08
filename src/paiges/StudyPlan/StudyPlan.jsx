import React, { useContext, useEffect, useState } from 'react';
import { Plus, X, CheckCircle, Edit, FileText, AlertTriangle, Book, Bookmark } from 'lucide-react'; // Importing all required icons
import { Form, NavLink, Outlet } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { AuthContext } from '../Authintaction paige/AuthProvider';

const StudyPlan = () => {
    const [isAddTaskOpen, setAddTaskOpen] = useState(false);
    const [isAddGoalOpen, setAddGoalOpen] = useState(false);
    const [goals, setGoals] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [tasks, setTask] = useState([]);
    const [overdueTasks, setOverdueTasks] = useState([])
    const { user } = useContext(AuthContext)

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault(); 
            setGoals([...goals, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeGoal = (index) => {
        setGoals(goals.filter((_, i) => i !== index));
    };

    const fetchData = async () => {
        try {
            const res = await fetch("https://study-plan-backend-beta.vercel.app/addTask");
            const result = await res.json();
            const taskFilter = result.filter(e => e.email === user.email)
            setTask(taskFilter);
            
        } catch (err) {
            console.log(err);
        }
    };

    const handleAddTaskSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            goals,
            title: e.target.title.value,
            description: e.target.description.value,
            priority: e.target.priority.value,
            dueDate: e.target.dueDate.value,
            email: user.email
        };



        const res = await fetch('https://study-plan-backend-beta.vercel.app/addTask', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })

        if (res.ok) {
            fetchData()
            Swal.fire("Success", "Add Task successfully!", "success");
            toast.success("Add Task successfully!");
            await res.json();
        } else {
            toast.error("Failed to Added Task");
        }

        console.log("Form Data:", formData);
    };

    const handelTaskDelet = async (id) => {
        console.log(id);
        const res = await fetch(`https://study-plan-backend-beta.vercel.app/addTask/${id}`, {
            method: "DELETE",
        });
        const result = await res.json();
        if (result) {
            fetchData()
            Swal.fire("Success", "Task Deleted successfully!", "success");
            toast.success("Task Deleted successfully!");
        }
    }

    const [goleData, setGoleData] = useState([])

    const fetchGoleData = async () => {
        try {
            const res = await fetch("https://study-plan-backend-beta.vercel.app/addGole");
            const result = await res.json();
            const goleFilter = result.filter(e => e.email === user.email)
            setGoleData(goleFilter);
            console.log('result is ', result);
        } catch (err) {
            console.log(err);
        }
    };

    const handelAddGoleSubmit = async (e) => {
        547
        e.preventDefault();
        const formData = {
            title: e.target.title.value,
            description: e.target.description.value,
            subject: e.target.subject.value,
            priority: e.target.priority.value,
            targetDate: e.target.targetDate.value,
            email: user.email
        };
        const res = await fetch('https://study-plan-backend-beta.vercel.app/addGole', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData)
        })

        if (res.ok) {
            fetchGoleData()
            Swal.fire("Success", "Add Gole successfully!", "success");
            toast.success("Add Gole successfully!");
            await res.json();
        } else {
            toast.error("Failed to Added Gole");
        }
        console.log("Form Data:", formData);
    }

    const handelGoleDelet = async (id) => {
        console.log(id);
        const res = await fetch(`https://study-plan-backend-beta.vercel.app/addGole/${id}`, {
            method: "DELETE",
        });
        const result = await res.json();
        if (result) {
            fetchGoleData()
            Swal.fire("Success", "Gole is Deleted successfully!", "success");
            toast.success("Gole is Deleted successfully!");
        }
    }


    useEffect(() => {
        fetchGoleData()
    }, [])
    useEffect(() => {
        fetchData()
    }, [])
    

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
                <NavLink to={'/studyPlan'} className="bg-blue-100 cursor-pointer p-6 rounded-lg shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <FileText size={24} className="text-blue-600" />
                        <span className="text-lg font-semibold">Today's Tasks</span>
                    </div>
                    <span className="text-sm text-gray-500">
                        {tasks?.length}

                    </span>
                </NavLink>

                <NavLink to={'/studyPlan/overDue'} className="bg-red-100 cursor-pointer p-6 rounded-lg shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <AlertTriangle size={24} className="text-red-600" />
                        <span className="text-lg font-semibold">Overdue</span>
                    </div>
                    <span className="text-sm text-gray-500">{overdueTasks?.length}</span>
                </NavLink>

                <NavLink to={'/studyPlan/activeGole'} className="bg-green-100 cursor-pointer p-6 rounded-lg shadow-lg flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <CheckCircle size={24} className="text-green-600" />
                        <span className="text-lg font-semibold">Active Goals</span>
                    </div>
                    <span className="text-sm text-gray-500">{goleData?.length}</span>
                </NavLink>
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
                        <form onSubmit={handleAddTaskSubmit}>
                            {/* Tag Input System */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Study Goals</label>
                                <div className="flex flex-wrap items-center gap-2 border p-2 rounded-md">
                                    {goals.map((goal, index) => (
                                        <span
                                            key={index}
                                            className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1"
                                        >
                                            {goal}
                                            <button
                                                type="button"
                                                onClick={() => removeGoal(index)}
                                                className="text-red-500 font-bold"
                                            >
                                                ×
                                            </button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        placeholder="Write a goal & press Enter"
                                        className="flex-grow outline-none"
                                    />
                                </div>
                            </div>

                            {/* Task Title */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Task Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Study derivatives"
                                />
                            </div>

                            {/* Description */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    id="description"
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Complete chapter 3 on derivatives"
                                ></textarea>
                            </div>

                            {/* Priority & Date */}
                            <div className="flex justify-between">
                                <div className="w-1/2 pr-2">
                                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                                    <select
                                        name="priority"
                                        id="priority"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option>Select priority</option>
                                        <option>Low</option>
                                        <option>High</option>
                                    </select>
                                </div>
                                <div className="w-1/2 pl-2">
                                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input
                                        type="date"
                                        name="dueDate"
                                        id="dueDate"
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="mt-4 text-right">
                                <button
                                    type="submit"
                                    className="bg-blue-500 cursor-pointer text-white py-2 px-6 rounded-md hover:bg-blue-600"
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
                        <form
                            onSubmit={handelAddGoleSubmit}
                            className="max-w-lg mx-auto bg-white p-6 shadow rounded-lg"
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Goal Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    id='title'
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="e.g., Master Calculus"
                                    required
                                />
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Description</label>
                                <textarea
                                    name="description"
                                    id='description'
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    placeholder="Complete all calculus chapters and practice problems"
                                    required
                                ></textarea>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Subject</label>
                                <select
                                    name="subject"
                                    id='subject'
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select subject</option>
                                    <option value="Mathematics">Mathematics</option>
                                    <option value="Physics">Physics</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Priority</label>
                                <select
                                    name="priority"
                                    id='priority'
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                >
                                    <option value="">Select priority</option>
                                    <option value="Low">Low</option>
                                    <option value="High">High</option>
                                </select>
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Target Date</label>
                                <input
                                    type="date"
                                    name="targetDate"
                                    id='targetDate'
                                    className="w-full p-2 border border-gray-300 rounded-md"
                                    required
                                />
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

            <Outlet context={{ tasks: tasks, handelTaskDelet: handelTaskDelet, setOverdueTasks: setOverdueTasks, fetchData: fetchData, goleData: goleData, handelGoleDelet: handelGoleDelet }} ></Outlet>
        </div>
    );
};

export default StudyPlan;
