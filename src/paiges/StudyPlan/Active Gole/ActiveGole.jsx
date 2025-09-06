import { Target, Calendar, Flag, BookOpen, Trash2 } from "lucide-react";
import { useOutletContext } from "react-router-dom";

const ActiveGole = () => {
    const {goleData, handelGoleDelet} = useOutletContext()
    console.log(goleData);
    return (
        <div className="space-y-6">
            {goleData.map((goal, index) => (
                <div
                    key={index}
                    className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 flex gap-5 items-start"
                >
                    {/* Left Icon */}
                    <div className="flex-shrink-0">
                        <Target size={36} className="text-blue-600" />
                    </div>

                    {/* Content */}
                    <div className="flex-grow">
                        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                            {goal.title}
                            <span
                                className={`px-2 py-0.5 text-xs rounded-full ${goal.priority === "High"
                                    ? "bg-red-100 text-red-600"
                                    : goal.priority === "Medium"
                                        ? "bg-yellow-100 text-yellow-600"
                                        : "bg-green-100 text-green-600"
                                    }`}
                            >
                                {goal.priority}
                            </span>
                        </h2>
                        <p className="text-gray-600 text-sm mt-1">{goal.description}</p>

                        {/* Extra Info */}
                        <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <BookOpen size={16} /> {goal.subject}
                            </span>
                            <span className="flex items-center gap-1">
                                <Calendar size={16} /> Target: {goal.targetDate}
                            </span>
                        </div>
                    </div>

                    {/* Delete Button */}
                    <button
                        onClick={() => handelGoleDelet(goal._id)}
                        className="text-red-500 cursor-pointer hover:bg-red-100 p-2 rounded-full transition"
                    >
                        <Trash2 size={20} />
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ActiveGole;
