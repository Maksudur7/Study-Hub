import React, { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Question = () => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [qustionData, setQustionData] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedQuiz = localStorage.getItem("quizData");
    if (savedQuiz) {
      setQustionData(JSON.parse(savedQuiz));
      setUserAnswers(new Array(JSON.parse(savedQuiz).length).fill(null));
    }
  }, []);

  const currentQuestion = qustionData[questionIndex];

  const handleOptionClick = (answer) => setSelectedAnswer(answer);

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setUserAnswers(updatedAnswers);

    if (questionIndex < qustionData.length - 1) {
      setQuestionIndex(prev => prev + 1);
      setSelectedAnswer(updatedAnswers[questionIndex + 1]);
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex(prev => prev - 1);
      setSelectedAnswer(userAnswers[questionIndex - 1]);
    }
  };

  const handleFinishQuiz = async () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedAnswer;

    let correctCount = 0;
    updatedAnswers.forEach((ans, idx) => {
      if (!ans) return;
      const correctLetter = qustionData[idx].answer;
      const correctOption = qustionData[idx].options[letterToIndex(correctLetter)];
      if (ans === correctOption) correctCount++;
    });

    const id = localStorage?.getItem("quizId");
    const quizId = JSON?.parse(id);
    const date = new Date().toLocaleTimeString();

    await fetch(`https://study-plan-backend-beta.vercel.app/quizData/${quizId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, score: correctCount }),
    });

    setUserAnswers(updatedAnswers);
    setScore(correctCount);
    setShowResult(true);
  };

  const letterToIndex = (letter) => ({ A: 0, B: 1, C: 2, D: 3 }[letter]);

  if (showResult) {
    localStorage.setItem("Score", JSON.stringify(score));
    navigate('/examQustion/quiz');
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-start p-4 md:p-10">
      <div className="bg-white w-full max-w-3xl p-6 md:p-10 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div className="text-sm text-gray-500">
            Question {questionIndex + 1} of {qustionData.length}
          </div>
          <div className="w-full md:w-1/2 bg-gray-200 rounded-full h-2 mt-2 md:mt-0">
            <div
              className="h-2 bg-purple-600 rounded-full"
              style={{ width: `${((questionIndex + 1) / qustionData.length) * 100}%` }}
            ></div>
          </div>
        </div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-700 mb-6">
          {currentQuestion?.question}
        </h2>
        <div className="grid grid-cols-1 gap-4">
          {currentQuestion?.options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-all flex items-center gap-3
                ${selectedAnswer === option ? 'border-purple-600 bg-purple-50' : 'border-gray-300'}`}
              onClick={() => handleOptionClick(option)}
            >
              <input
                type="radio"
                id={`option-${index}`}
                name="answer"
                value={option}
                checked={selectedAnswer === option}
                onChange={() => handleOptionClick(option)}
                className="mr-3"
              />
              <label htmlFor={`option-${index}`} className="text-lg md:text-xl">{option}</label>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            onClick={handlePrev}
            disabled={questionIndex === 0}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg w-full sm:w-auto disabled:opacity-50"
          >
            Previous
          </button>

          {questionIndex === qustionData.length - 1 ? (
            <button
              onClick={handleFinishQuiz}
              disabled={!selectedAnswer}
              className={`bg-purple-600 text-white py-2 px-6 rounded-lg w-full sm:w-auto hover:bg-purple-700 flex items-center justify-center gap-2
                ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Finish Quiz <CheckCircle size={20} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!selectedAnswer}
              className={`bg-purple-600 text-white py-2 px-6 rounded-lg w-full sm:w-auto hover:bg-purple-700 flex items-center justify-center gap-2
                ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Next
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default Question;
