import { Bookmark, Edit, X } from 'lucide-react';
import { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';


const TodayTask = () => {
    const { tasks, handelTaskDelet , fetchData } = useOutletContext()
    // const [isAddEditOpen, setAddEditOpen] = useState(false);
    // const [goals, setGoals] = useState([]);
    // const [inputValue, setInputValue] = useState("");
    const [isAddEditOpen, setAddEditOpen] = useState(false);
    const [goals, setGoals] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [selectedTask, setSelectedTask] = useState(null);

    const openAddEdit = (task) => {
        setSelectedTask(task);
        setGoals(task.goals || []); 
        setAddEditOpen(true);
    };

    const closeAddEdit = () => {
        setAddEditOpen(false);
        setSelectedTask(null);
        setGoals([]);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter" && inputValue.trim() !== "") {
            e.preventDefault(); // prevent form submit
            setGoals([...goals, inputValue.trim()]);
            setInputValue("");
        }
    };

    const removeGoal = (index) => {
        setGoals(goals.filter((_, i) => i !== index));
    };

    const handelSubmit = async (e) => {
        e.preventDefault();

        if (!selectedTask) return;
        try {
            const res = await fetch(`http://localhost:5000/addTask/${selectedTask._id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ goals }),
            });

            const data = await res.json();
            console.log("Response from server:", data);
            if (res.ok) {
                fetchData()
                Swal.fire("Success", "Update Task successfully!", "success");
                toast.success("Update Task successfully!");
            }
            closeAddEdit();
        } catch (err) {
            console.error("Update failed", err);
        }
    };


    return (
        < div className="space-y-6" >
            {
                tasks.map((task, index) => (
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
                                    <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${!task.progress ? 0 : task.progress}%` }}></div>
                                </div>
                                <div className="flex justify-between text-sm text-gray-500">
                                    <span>{!task.progress ? 0 : task.progress}%</span>
                                    <span>Due: {task.dueDate}</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className={`text-sm ${task.priority === 'High' ? 'text-red-600' : 'text-gray-600'}`}>{task.priority} Priority</span>
                                <div className="flex items-center gap-4">
                                    <button onClick={() => openAddEdit(task)} className="text-blue-500 hover:underline cursor-pointer flex items-center gap-2">
                                        <Edit size={20} />
                                        Edit
                                    </button>
                                    <button onClick={() => handelTaskDelet(task._id)} className="text-red-500 cursor-pointer hover:underline flex items-center gap-2">
                                        <X size={20} />
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                isAddEditOpen && (
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold">Edit Your Destination</h2>
                                <button className='cursor-pointer' onClick={closeAddEdit}>
                                    <X size={20} />
                                </button>
                            </div>

                            <form onSubmit={handelSubmit}>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Study Goals
                                    </label>
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
                                <div className="mt-4 text-right">
                                    <button
                                        type="submit"
                                        className="bg-blue-500 cursor-pointer text-white py-2 px-6 rounded-md hover:bg-blue-600"
                                    >
                                        Edit Task
                                    </button>
                                </div>
                            </form>

                        </div>
                    </div>
                )
            }
        </div >
    );
};

export default TodayTask;