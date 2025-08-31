import { Brain, Plus } from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";

const ExamQustion = () => {
  return (
    <div className="min-h-screen mx-14  p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="text-purple-500" /> Exam Q&A Generator
          </h1>
          <p className="text-gray-600">Practice makes perfect! 🧠</p>
        </div>
        <button className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow">
          <Plus size={18} /> Add Question
        </button>
      </div>

      {/* Tabs */}
      <div className="inline-flex p-2 px-5 bg-white  rounded-xl gap-2 mb-6">
        <NavLink to={'/examQustion'} className=" shadow px-4 py-2 rounded-lg font-medium">Subjects</NavLink>
        <NavLink to={'/examQustion/quiz'} className="shadow px-4 py-2 rounded-lg text-gray-600">Quiz</NavLink>
        <NavLink to={'/examQustion/history'} className=" shadow px-4 py-2 rounded-lg text-gray-600">History</NavLink>
      </div>

      {/* Subject Cards */}

      <div>
        <Outlet></Outlet>
      </div>

    </div>
  );
};

export default ExamQustion;