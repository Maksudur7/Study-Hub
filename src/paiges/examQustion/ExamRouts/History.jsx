import React from 'react';
import { BarChart, FileText, Clock, CheckCircle } from 'lucide-react'; // Import icons from lucide-react

const History = () => {
    const quizzesCompleted = 24;
    const averageScore = 87;

    const recentQuizzes = [
        { name: 'Mathematics', questions: 10, date: 'Jan 15', score: 92 },
        { name: 'Physics', questions: 8, date: 'Jan 14', score: 85 },
        { name: 'Chemistry', questions: 12, date: 'Jan 13', score: 78 },
        { name: 'Biology', questions: 15, date: 'Jan 12', score: 94 },
    ];

    return (
        <div className="min-h-screen  p-6">
            <div className="flex justify-between items-center gap-10 mb-8">
                {/* Total Quizzes */}
                <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg flex items-center gap-4 w-full ">
                    <FileText size={40} />
                    <div>
                        <h2 className="text-2xl font-bold">Total Quizzes</h2>
                        <p className="text-lg">{quizzesCompleted} Completed this month</p>
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
                {recentQuizzes.map((quiz, index) => (
                    <div key={index} className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-4">
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex justify-center items-center">
                                <Clock size={20} className="text-gray-600" />
                            </div>
                            <div>
                                <p className="font-semibold">{quiz.name}</p>
                                <p className="text-sm text-gray-500">{quiz.questions} questions • {quiz.date}</p>
                            </div>
                        </div>
                        <div className="text-right">
                            <p className={`font-bold ${quiz.score >= 90 ? 'text-green-600' : quiz.score >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                                {quiz.score}%
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
