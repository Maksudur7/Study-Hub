import React, { useState } from 'react';
import { CheckCircle } from 'lucide-react'; // Importing icon for the finish button

const Question = () => {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [questionIndex, setQuestionIndex] = useState(0);

    const questions = [
        {
            question: "What is the acceleration due to gravity on Earth?",
            options: [
                { answer: "9.8 m/s²", correct: true },
                { answer: "10 m/s²", correct: false },
                { answer: "9.6 m/s²", correct: false },
                { answer: "8.9 m/s²", correct: false }
            ],
            correctAnswer: "9.8 m/s²",
            difficulty: "easy"
        },
    ];

    const handleOptionClick = (answer) => {
        setSelectedAnswer(answer);
    };

    const handleFinishQuiz = () => {
        // Handle the quiz finish logic (show results, etc.)
        alert("Quiz Finished");
    };

    return (
        <div className=" bg-gray-100  flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full ">
                 {/* Progress Bar and Question Title */}
                <div className="flex justify-between items-center mb-6">
                    <div className="text-sm text-gray-500">Question {questionIndex + 1} of {questions.length}</div>
                    <div className="text-xs text-gray-500">{questions[questionIndex].difficulty}</div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
                    <div
                        className="h-2 bg-purple-600 rounded-full"
                        style={{ width: `${(questionIndex + 1) / questions.length * 100}%` }}
                    ></div>
                </div>

                {/* Question */}
                <h2 className="text-xl font-semibold text-gray-700 mb-6">{questions[questionIndex].question}</h2>

                {/* Options - Styled as boxes */}
                <div className="space-y-4">
                    {questions[questionIndex].options.map((option, index) => (
                        <div
                            key={index}
                            className={`p-4 border rounded-lg cursor-pointer hover:border-purple-600 hover:bg-purple-50 transition-all ${selectedAnswer === option.answer ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}
                            onClick={() => handleOptionClick(option.answer)}
                        >
                            <input
                                type="radio"
                                id={`option-${index}`}
                                name="answer"
                                value={option.answer}
                                checked={selectedAnswer === option.answer}
                                onChange={() => handleOptionClick(option.answer)}
                                className="mr-3"
                            />
                            <label htmlFor={`option-${index}`} className="text-lg">{option.answer}</label>
                        </div>
                    ))}
                </div>

                {/* Finish Quiz Button */}
                <div className="mt-6 flex justify-between items-center">
                    <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center gap-2">
                        <span className="text-sm">Previous</span>
                    </button>

                    <button
                        onClick={handleFinishQuiz}
                        className={`bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
                        disabled={!selectedAnswer}
                    >
                        Finish Quiz
                        <CheckCircle size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Question;
