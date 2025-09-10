import React, { useEffect, useState } from 'react';
import { Trophy, RefreshCcw, Edit } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const Quiz = () => {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const Score = localStorage?.getItem("Score");
        if (Score) {
            setScore(JSON.parse(Score));
        }
    }, []);

    return (
        <div className="bg-gray-100 w-full flex justify-center items-center p-4">
            <div className="bg-white p-6 md:p-10 rounded-lg shadow-lg w-full  text-center">

                {/* Icon for Quiz Completion */}
                <div className="text-yellow-500 flex justify-center items-center mb-4 md:mb-6">
                    <Trophy size={50} />
                </div>

                <h2 className="text-2xl md:text-3xl font-bold text-purple-700 mb-2">
                    Quiz Complete! 🎉
                </h2>
                <p className="text-sm md:text-lg text-gray-600 mb-4">
                    You got {score} out of 10 questions correct!
                </p>

                {/* Score Percentage */}
                <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-6">
                    {score * 10}%
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-6 w-full">
                    <NavLink
                        to={'/examQustion/qustion'}
                        className="bg-purple-600 text-white py-2 px-4 md:py-3 md:px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <RefreshCcw size={20} />
                        Retake Quiz
                    </NavLink>

                    <NavLink
                        to={'/examQustion'}
                        className="bg-white text-gray-800 py-2 px-4 md:py-3 md:px-6 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2 w-full sm:w-auto"
                    >
                        <Edit size={20} />
                        Choose New Subject
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default Quiz;
