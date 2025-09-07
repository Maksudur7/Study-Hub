import { useContext, useEffect, useState } from "react";
import {
  Brain,
  Plus,
  Calculator,
  Atom,
  FlaskConical,
  Dna,
  BookOpen,
  Languages,
  X,
  Book,
} from "lucide-react";
import { NavLink, Outlet } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { AuthContext } from "../Authintaction paige/AuthProvider";

const subjects = [
  { id: 1, name: "Mathematics", icon: <Calculator className="text-purple-500" size={20} /> },
  { id: 2, name: "Physics", icon: <Atom className="text-blue-500" size={20} /> },
  { id: 3, name: "Chemistry", icon: <FlaskConical className="text-green-500" size={20} /> },
  { id: 4, name: "Biology", icon: <Dna className="text-pink-500" size={20} /> },
  { id: 5, name: "History", icon: <BookOpen className="text-yellow-600" size={20} /> },
  { id: 6, name: "English", icon: <Languages className="text-red-500" size={20} /> },
];

// Dummy chapters
const chapterData = {
  1: ["Algebra", "Geometry", "Trigonometry", "Calculus"],
  2: ["Kinematics", "Laws of Motion", "Work & Energy", "Waves", "Thermodynamics"],
  3: ["Organic", "Inorganic", "Physical Chemistry"],
  4: ["Cell Biology", "Genetics", "Evolution"],
  5: ["Ancient", "Medieval", "Modern History"],
  6: ["Grammar", "Poetry", "Literature"],
};

const ExamQustion = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null); // subject id
  const [chapterQuery, setChapterQuery] = useState("");
  const [selectedChapters, setSelectedChapters] = useState([]);
  const [data, setData] = useState([]);
  // const [qustiondata, setQustionData] = useState([])
  const { user } = useContext(AuthContext)

  const chapters = selectedSubject ? chapterData[selectedSubject] || [] : [];



  const fetchData = async () => {
    try {
      const res = await fetch("http://localhost:5000/quizData");
      const result = await res.json();
      const userData = result.filter(e => e.email === user?.email)
      setData(userData);
    } catch (err) {
      console.log(err);
    }
  };



  const handleAddChapter = (chapter) => {
    if (!selectedChapters.includes(chapter)) {
      setSelectedChapters([...selectedChapters, chapter]);
    }
    setChapterQuery("");
  };

  const handleRemoveChapter = (chapter) => {
    setSelectedChapters(selectedChapters.filter((c) => c !== chapter));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e?.target?.title?.value;
    const subjectId = selectedSubject; // id save
    const subjectName = subjects.find((s) => s.id === Number(subjectId))?.name;

    const quizDatas = {
      title: title,
      subject: subjectName,
      chapters: selectedChapters,
      email: user?.email
    };

    try {
      const res = await fetch("http://localhost:5000/quizData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(quizDatas),
      });

      if (res.ok) {
        fetchData();
        Swal.fire("Success", "Quiz added successfully!", "success");
        toast.success("Quiz added successfully!");
        await res.json();

      } else {
        toast.error("Failed to add Quiz");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding Quiz");
    }

    setShowModal(false);
    setSelectedChapters([]);
    setSelectedSubject(null);
    setChapterQuery("");
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen mx-14 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Brain className="text-purple-500" /> Exam Q&A Generator
          </h1>
          <p className="text-gray-600">Practice makes perfect! 🧠</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus size={18} /> Add Question
        </button>
      </div>

      {/* Tabs */}
      <div className="inline-flex p-2 px-5 bg-white rounded-xl gap-2 mb-6">
        <NavLink to={"/examQustion"} className="shadow px-4 py-2 rounded-lg font-medium">
          Subjects
        </NavLink>
        <NavLink to={"/examQustion/quiz"} className="shadow px-4 py-2 rounded-lg text-gray-600">
          Quiz
        </NavLink>
        <NavLink to={"/examQustion/history"} className="shadow px-4 py-2 rounded-lg text-gray-600">
          History
        </NavLink>
      </div>

      <div>
        <Outlet context={{ quizData: data }} />
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white w-[480px] rounded-lg shadow-lg p-6 relative">
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Create New Quiz</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700 text-xl font-bold"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Quiz Title */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Quiz Title</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Basic Mathematics Quiz"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                />
              </div>

              {/* Subject */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <select
                  value={selectedSubject || ""}
                  onChange={(e) => {
                    setSelectedSubject(e.target.value); // এখন id save হবে
                    setSelectedChapters([]);
                  }}
                  id="subject"
                  name="subject"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 bg-white"
                >
                  <option value="">Select subject</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Chapter Search + Tags */}
              {selectedSubject && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Select Chapters
                  </label>
                  {/* Selected Tags */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {selectedChapters.map((ch) => (
                      <span
                        key={ch}
                        className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center gap-2"
                      >
                        <Book size={14} className="text-purple-500" />
                        {ch}
                        <X
                          size={14}
                          className="cursor-pointer"
                          onClick={() => handleRemoveChapter(ch)}
                        />
                      </span>
                    ))}
                  </div>
                  {/* Search Input */}
                  <input
                    type="text"
                    value={chapterQuery}
                    onChange={(e) => setChapterQuery(e.target.value)}
                    placeholder="Search chapter..."
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:outline-none"
                  />
                  {/* Suggestions */}
                  {chapterQuery && (
                    <div className="border border-gray-300 rounded-md mt-1 bg-white shadow max-h-40 overflow-y-auto">
                      {chapters
                        .filter((ch) =>
                          ch.toLowerCase().includes(chapterQuery.toLowerCase())
                        )
                        .map((ch) => (
                          <div
                            key={ch}
                            onClick={() => handleAddChapter(ch)}
                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
                          >
                            <Book size={16} className="text-gray-600" />
                            {ch}
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              )}

              {/* Submit */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-black text-white rounded-md px-4 py-2 hover:bg-gray-800 transition"
                >
                  Create Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamQustion;
