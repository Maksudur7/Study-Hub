import React, { useEffect, useMemo, useState } from "react";
import { BookOpen, Delete } from "lucide-react";
import { NavLink, useOutletContext, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import Loding from "../../Loding paige/Loding";

const PAGE_SIZE = 4;

const Subjects = () => {
  const { fetchData = [] } = useOutletContext() || {};
  const [page, setPage] = useState(1);
  const [loding, setLoding] = useState(false);
  const navigate = useNavigate();

  // ------------------ Loading UI ------------------
  
  if(loding) {
    <Loding></Loding>
  }

  // ------------------ Start Quiz Handler ------------------
  const handleStartQuiz = async (id) => {
    setLoding(true);
    try {
      const element = fetchData.find((element) => element._id === id);
      const qustionDaraObj = {
        subject: element.subject,
        chapters: element.chapters,
      };

      localStorage.setItem("quizId", JSON.stringify(id));

      const res = await fetch("http://localhost:5000/generate-quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(qustionDaraObj),
      });

      const data = await res.json();

      if (res.ok && data) {
        localStorage.setItem("quizData", JSON.stringify(data));

        // ছোট delay দিয়ে navigate
        setTimeout(() => {
          setLoding(false);
          navigate("/examQustion/qustion");
        }, 800);
      } else {
        setLoding(false);
      }
    } catch (error) {
      console.error("Error starting quiz:", error);
      setLoding(false);
    }
  };

  // ------------------ Pagination Logic ------------------
  const totalPages = Math.max(1, Math.ceil((fetchData?.length || 0) / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [fetchData?.length, totalPages, page]);

  const currentItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return (fetchData || []).slice(start, start + PAGE_SIZE);
  }, [fetchData, page]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

  // ------------------ Delete Handler ------------------
  const handelDelet = async (id) => {
    const res = await fetch(`http://localhost:5000/quizData/${id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result) {
      Swal.fire("Success", "Quiz Deleted successfully!", "success");
      toast.success("Quiz Deleted successfully!");
    }
  };

  // ------------------ Main Render ------------------
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {currentItems.map((item, idx) => (
          <div
            key={item._id || `${item.title}-${idx}`}
            className="bg-white rounded-lg shadow p-5 flex flex-col"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center mb-8 gap-2">
                <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
                <span className="font-semibold">
                  {item.subject || "Untitled Subject"}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {Array.isArray(item.chapters) ? item.chapters.length : 0} Q's
              </span>
            </div>

            {/* Title */}
            {item.title && (
              <p className="text-sm text-gray-700 mb-2 line-clamp-1">
                {item.title}
              </p>
            )}

            {/* Progress */}
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-1 overflow-hidden">
              <div
                className="h-2 bg-black"
                style={{ width: `${item.score * 10}%` }}
              ></div>
            </div>
            <p className="text-right text-sm font-medium text-gray-700 mb-3">
              {item.score * 10}%
            </p>

            <div className="flex items-center gap-2 mt-auto">
              <button
                onClick={() => handleStartQuiz(item._id)}
                className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white flex-1 px-4 py-2 rounded-lg"
              >
                <BookOpen size={16} /> Start Quiz
              </button>

              <button
                onClick={() => handelDelet(item._id)}
                className="w-8 h-8 flex items-center justify-center cursor-pointer text-gray-600"
              >
                <Delete className="w-8 h-8" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={goPrev}
          disabled={page === 1}
          className="px-3 py-1 rounded-lg border disabled:opacity-50"
        >
          Prev
        </button>

        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded-lg border ${
                page === num ? "bg-black text-white" : ""
              }`}
            >
              {num}
            </button>
          ))}
        </div>

        <button
          onClick={goNext}
          disabled={page === totalPages}
          className="px-3 py-1 rounded-lg border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Subjects;
