import React, { useContext, useEffect, useState } from 'react';
import { BarChart, FileText, Clock, CheckCircle } from 'lucide-react';
import { AuthContext } from '../../Authintaction paige/AuthProvider';

const History = () => {
    // const averageScore = 87;
    const [quizData, setQuizData] = useState([])
    const [averageScore, setAverageScore] = useState(null)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch("http://localhost:5000/quizData");
                const result = await res.json();
                const userData = result.filter(e => e.email === user?.email)
                setQuizData(userData);
                if (result.length) {
                    const totalScore = result.reduce((total, quiz) => total + (quiz.score || 0), 0);
                    const avg = totalScore / result.length;
                    setAverageScore(avg.toFixed(2));
                }
                // setLoading(false);
            } catch (error) {
                console.error("Error fetching quiz history:", error);
                // setLoading(false);
            }
        };

        fetchData();
    }, []);



    return (
        <div className="min-h-screen  p-6">
            <div className="flex justify-between items-center gap-10 mb-8">
                {/* Total Quizzes */}
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center gap-4 w-full ">
                    <FileText size={40} />
                    <div>
                        <h2 className="text-2xl font-bold">Total Quizzes</h2>
                        <p className="text-lg">{quizData.length} Completed this month</p>
                    </div>
                </div>

                {/* Average Score */}
                <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg flex items-center gap-4 w-full ">
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
                {quizData.map((quiz, index) => (
                    <div key={index} className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                                <Clock size={20} className="text-gray-600" />
                            </div>
                            <div>
                                <p className="font-semibold">{quiz.subject}</p>
                                <p className="text-sm text-gray-500">{quiz.score} questions • {quiz.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${quiz.score >= 90 ? 'text-green-600' : quiz.score >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>

                                {quiz.score * 10}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
