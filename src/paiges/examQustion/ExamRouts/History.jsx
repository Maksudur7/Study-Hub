import React, { useContext, useEffect, useState } from 'react';
import { BarChart, FileText, Clock } from 'lucide-react';
import { AuthContext } from '../../Authintaction paige/AuthProvider';

const History = () => {
    const [quizData, setQuizData] = useState([]);
    const [averageScore, setAverageScore] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("https://study-plan-backend-beta.vercel.app/quizData");
                const result = await res.json();
                const userData = result.filter(e => e.email === user?.email);
                setQuizData(userData);

                if (result.length) {
                    const totalScore = result.reduce((total, quiz) => total + (quiz.score || 0), 0);
                    const avg = totalScore / result.length;
                    setAverageScore(avg.toFixed(2));
                }
            } catch (error) {
                console.error("Error fetching quiz history:", error);
            }
        };

        fetchData();
    }, [user?.email]);

    return (
        <div className="min-h-screen p-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* Total Quizzes */}
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                    <FileText size={40} />
                    <div>
                        <h2 className="text-2xl font-bold">Total Quizzes</h2>
                        <p className="text-lg">{quizData.length} Completed this month</p>
                    </div>
                </div>

                {/* Average Score */}
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center gap-4">
                    <BarChart size={40} />
                    <div>
                        <h2 className="text-2xl font-bold">Average Score</h2>
                        <p className="text-lg">{averageScore}% Across all subjects</p>
                    </div>
                </div>
            </div>

            {/* Recent Quiz Results */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Recent Quiz Results</h2>
                {quizData.length > 0 ? (
                    quizData.map((quiz, index) => (
                        <div key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 p-3 border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                                    <Clock size={20} className="text-gray-600" />
                                </div>
                                <div>
                                    <p className="font-semibold">{quiz.subject}</p>
                                    <p className="text-sm text-gray-500">
                                        {quiz.score} questions • {quiz.date}
                                    </p>
                                </div>
                            </div>
                            <div className="mt-2 sm:mt-0 text-right w-full sm:w-auto">
                                <p
                                    className={`font-bold ${
                                        quiz.score >= 90
                                            ? 'text-green-600'
                                            : quiz.score >= 75
                                            ? 'text-yellow-600'
                                            : 'text-red-600'
                                    }`}
                                >
                                    {quiz.score * 10}%
                                </p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No quiz history available.</p>
                )}
            </div>
        </div>
    );
};

export default History;
