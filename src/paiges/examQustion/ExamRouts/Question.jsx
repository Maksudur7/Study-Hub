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
  const navigate = useNavigate()

  useEffect(() => {
    const savedQuiz = localStorage.getItem("quizData");
    if (savedQuiz) {
      setQustionData(JSON.parse(savedQuiz));
      setUserAnswers(new Array(JSON.parse(savedQuiz).length).fill(null));
    }
  }, []);

  const currentQuestion = qustionData[questionIndex];

  const handleOptionClick = (answer) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[questionIndex] = selectedAnswer;
    setUserAnswers(updatedAnswers);

    if (questionIndex < qustionData.length - 1) {
      setQuestionIndex((prev) => prev + 1);
      setSelectedAnswer(updatedAnswers[questionIndex + 1]); 
    }
  };

  const handlePrev = () => {
    if (questionIndex > 0) {
      setQuestionIndex((prev) => prev - 1);
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
      if (ans === correctOption) {
        correctCount++;
      }
    });


    const id = localStorage?.getItem("quizId");
    console.log(score);
    const quizId = JSON?.parse(id)

    const date = new Date().toLocaleTimeString()
    const res = await fetch(`https://study-plan-backend-beta.vercel.app/quizData/${quizId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        date: date,
        score: correctCount
      })
    });

    console.log(res);

    setUserAnswers(updatedAnswers);
    setScore(correctCount);
    setShowResult(true);
  };

  const letterToIndex = (letter) => {
    const map = { A: 0, B: 1, C: 2, D: 3 };
    return map[letter];
  };

  if (showResult) {
    localStorage.setItem("Score", JSON.stringify(score));
    navigate('/examQustion/quiz')

  }



  return (
    <div className="bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full">
        {/* Progress Bar and Question Title */}
        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-gray-500">
            Question {questionIndex + 1} of {qustionData.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-6">
          <div
            className="h-2 bg-purple-600 rounded-full"
            style={{ width: `${((questionIndex + 1) / qustionData.length) * 100}%` }}
          ></div>
        </div>

        {/* Question */}
        <h2 className="text-xl font-semibold text-gray-700 mb-6">
          {currentQuestion?.question}
        </h2>

        {/* Options */}
        <div className="space-y-4">
          {currentQuestion?.options.map((option, index) => (
            <div
              key={index}
              className={`p-4 border rounded-lg cursor-pointer transition-all 
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
              <label htmlFor={`option-${index}`} className="text-lg">{option}</label>
            </div>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-6 flex justify-between items-center">
          <button
            onClick={handlePrev}
            disabled={questionIndex === 0}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg flex items-center gap-2 disabled:opacity-50"
          >
            <span className="text-sm">Previous</span>
          </button>

          {questionIndex === qustionData.length - 1 ? (
            <button
              onClick={handleFinishQuiz}
              className={`bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!selectedAnswer}
            >
              Finish Quiz
              <CheckCircle size={20} />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className={`bg-purple-600 text-white py-2 px-6 rounded-lg hover:bg-purple-700 flex items-center justify-center gap-2 ${!selectedAnswer ? 'opacity-50 cursor-not-allowed' : ''}`}
              disabled={!selectedAnswer}
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
