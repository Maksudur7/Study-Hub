import React, { useEffect, useState } from 'react';
import { Trophy, RefreshCcw, Edit } from 'lucide-react'; // Import Lucide icons for the buttons
import { NavLink } from 'react-router-dom';

const Quiz = () => {
    // const score = 100; // Example score
    // const totalQuestions = 1;

    const [score, setScore] = useState(0)

    useEffect(() => {
        const Score = localStorage?.getItem("Score");
        console.log(score);
        const parsScore = JSON?.parse(Score)
        setScore(parsScore)

    }, [score])

    return (
        <div className=" bg-gray-100  flex justify-center items-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full  text-center">
                {/* Icon for Quiz Completion */}
                <div className="text-yellow-500 flex justify-center items-center mb-6">
                    <Trophy size={50} />
                </div>

                <h2 className="text-3xl font-bold text-purple-700">Quiz Complete! 🎉</h2>
                <p className="text-lg text-gray-600 mt-2">You got {score} out of 10 questions correct!</p>

                {/* Score */}
                <div className="text-4xl font-bold text-purple-600 mt-6">{score*10}%</div>

                {/* Buttons */}
                <div className="mt-8 flex w-full  justify-center items-center gap-10 ">
                    <NavLink to={'/examQustion/qustion'} className="bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2">
                        <RefreshCcw size={20} />
                        Retake Quiz
                    </NavLink>

                    <NavLink to={'/examQustion'} className="bg-white text-gray-800 py-2 px-6 rounded-lg border border-gray-300 hover:bg-gray-100 flex items-center justify-center gap-2">
                        <Edit size={20} />
                        Choose New Subject
                    </NavLink>
                </div>


            </div>
        </div>
    );
};

export default Quiz;
