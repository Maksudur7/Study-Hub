import React, { useEffect, useMemo, useState } from "react";
import { BookOpen } from "lucide-react";
import { NavLink, useOutletContext } from "react-router-dom";

const PAGE_SIZE = 4;

const Subjects = () => {
  // ExamQustion.jsx -> <Outlet context={{ fetchData: data }} />
  const { fetchData = [] } = useOutletContext() || {};
  const [page, setPage] = useState(1);

  const handleStartQuiz = async (id) => {
    console.log(id);
    const element = fetchData.find(element => element._id === id);
    const qustionDaraObj = {
      subject: element.subject,
      chapters: element.chapters
    }
    const res = await fetch("http://localhost:5000/generate-quiz", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(qustionDaraObj)
    });
    const data = await res.json();
    console.log(data);
    if (res.ok) {
      localStorage.setItem("quizData", JSON.stringify(data));
    }
    console.log(qustionDaraObj);
    console.log(data);
  }

  // total pages
  const totalPages = Math.max(1, Math.ceil((fetchData?.length || 0) / PAGE_SIZE));

  // clamp page if data length changes
  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [fetchData?.length, totalPages, page]);

  // current page items
  const currentItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return (fetchData || []).slice(start, start + PAGE_SIZE);
  }, [fetchData, page]);

  const goPrev = () => setPage((p) => Math.max(1, p - 1));
  const goNext = () => setPage((p) => Math.min(totalPages, p + 1));

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

            {/* Dummy progress */}
            <p className="text-sm text-gray-600 mb-1">Average Score</p>
            <div className="w-full h-2 bg-gray-200 rounded-full mb-1 overflow-hidden">
              <div className="h-2 bg-black w-[87%]"></div>
            </div>
            <p className="text-right text-sm font-medium text-gray-700 mb-3">
              87%
            </p>

            <div className="flex items-center gap-2 mt-auto">
              <NavLink
                to={"/examQustion/qustion"}
                onClick={async (e) => {
                  e.preventDefault(); 
                  await handleStartQuiz(item._id);
                  window.location.href = "/examQustion/qustion"; 
                }}
                className="flex items-center justify-center gap-2 bg-purple-500 hover:bg-purple-600 text-white flex-1 px-4 py-2 rounded-lg"
              >
                <BookOpen size={16} /> Start Quiz
              </NavLink>

              <button className="w-8 h-8 flex items-center justify-center border rounded-lg text-gray-600">
                +
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

        {/* Page indicators */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <button
              key={num}
              onClick={() => setPage(num)}
              className={`px-3 py-1 rounded-lg border ${page === num ? "bg-black text-white" : ""
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
