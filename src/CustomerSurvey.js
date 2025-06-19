import React, { useState, useRef } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaStar,
  FaUsers,
  FaDollarSign,
  FaHeart,
  FaCommentAlt,
} from "react-icons/fa";

const CustomerSurvey = () => {
  const questions = [
    {
      id: "q1",
      text: "How satisfied are you with our products?",
      type: "rating",
      scale: 5,
      icon: <FaHeart className="w-8 h-8" />,
    },
    {
      id: "q2",
      text: "How fair are the prices compared to similar retailers?",
      type: "rating",
      scale: 5,
      icon: <FaDollarSign className="w-8 h-8" />,
    },
    {
      id: "q3",
      text: "How satisfied are you with the value for money of your purchase?",
      type: "rating",
      scale: 5,
      icon: <FaStar className="w-8 h-8" />,
    },
    {
      id: "q4",
      text: "On a scale of 1-10 how would you recommend us to your friends and family?",
      type: "rating",
      scale: 10,
      icon: <FaUsers className="w-8 h-8" />,
    },
    {
      id: "q5",
      text: "What could we do to improve our service?",
      type: "text",
      icon: <FaCommentAlt className="w-8 h-8" />,
    },
  ];

  const [currentScreen, setCurrentScreen] = useState("welcome");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [sessionId, setSessionId] = useState(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const textInputRefs = useRef({});

  const generateSessionId = () => {
    return (
      "session_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9)
    );
  };

  const startSurvey = () => {
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
    setCurrentScreen("survey");
    setCurrentQuestionIndex(0);
    setAnswers({});
    textInputRefs.current = {};
  };

  const saveAnswer = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: {
        answer: answer,
        timestamp: new Date().toISOString(),
        sessionId: sessionId,
      },
    }));
  };

  // Handle rating answers
  const handleRatingSubmit = (rating) => {
    const currentQuestion = questions[currentQuestionIndex];
    saveAnswer(currentQuestion.id, rating);
  };

  const saveCurrentTextInput = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (
      currentQuestion.type === "text" &&
      textInputRefs.current[currentQuestion.id]
    ) {
      const textValue = textInputRefs.current[currentQuestion.id].value;
      saveAnswer(currentQuestion.id, textValue);
    }
  };

  // Navigation functions
  const goToNext = () => {
    saveCurrentTextInput();
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowConfirmDialog(true);
    }
  };

  const goToPrevious = () => {
    saveCurrentTextInput();
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const skipQuestion = () => {
    goToNext();
  };

  const submitSurvey = () => {
    saveCurrentTextInput();

    const completedSurvey = {
      sessionId: sessionId,
      answers: answers,
      status: "COMPLETED",
      completedAt: new Date().toISOString(),
    };

    console.log("Survey completed:", completedSurvey);
    setShowConfirmDialog(false);
    setCurrentScreen("thank-you");

    setTimeout(() => {
      setCurrentScreen("welcome");
      setAnswers({});
      setSessionId(null);
      setCurrentQuestionIndex(0);
      textInputRefs.current = {};
    }, 5000);
  };

  // Rating Component
  const RatingInput = ({ scale, value, onChange }) => {
    return (
      <div className="flex flex-wrap justify-center gap-3 mt-8">
        {[...Array(scale)].map((_, index) => {
          const rating = index + 1;
          return (
            <button
              key={rating}
              onClick={() => onChange(rating)}
              className={`w-16 h-16 rounded-full text-xl font-bold transition-all transform hover:scale-110 ${
                value === rating
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {rating}
            </button>
          );
        })}
      </div>
    );
  };

  // TextInput component
  const TextInput = ({ questionId, defaultValue }) => {
    return (
      <div className="mt-8">
        <textarea
          ref={(el) => {
            if (el) {
              textInputRefs.current[questionId] = el;
              if (defaultValue && el.value !== defaultValue) {
                el.value = defaultValue;
              }
            }
          }}
          defaultValue={defaultValue}
          placeholder="Please share your thoughts..."
          className="w-full h-32 p-4 border-2 border-gray-300 rounded-lg text-lg text-gray-900 resize-none focus:border-blue-500 focus:outline-none bg-white"
        />
      </div>
    );
  };

  // Welcome Screen
  if (currentScreen === "welcome") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">
          <div className="mb-8">
            <div className="w-24 h-24 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaHeart className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Welcome!</h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              We value your feedback and would love to hear about your shopping
              experience with us today.
            </p>
          </div>
          <button
            onClick={startSurvey}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xl font-semibold py-4 px-12 rounded-full transition-all transform hover:scale-105 shadow-lg"
          >
            Start Survey
          </button>
          <p className="text-sm text-gray-500 mt-6">
            This will only take 2-3 minutes
          </p>
        </div>
      </div>
    );
  }

  // Thank You Screen
  if (currentScreen === "thank-you") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-8">
        <div className="bg-white rounded-3xl shadow-2xl p-12 text-center max-w-2xl w-full">
          <div className="w-24 h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaHeart className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Thank You!</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-6">
            Your feedback is incredibly valuable to us. We appreciate you taking
            the time to share your thoughts.
          </p>
          <div className="text-lg text-gray-500">
            Returning to welcome screen in 5 seconds...
          </div>
        </div>
      </div>
    );
  }

  // Survey Screen
  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = answers[currentQuestion.id]?.answer || "";

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Customer Survey
            </h2>
            <span className="text-lg font-semibold text-blue-600">
              {currentQuestionIndex + 1}/{questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${
                  ((currentQuestionIndex + 1) / questions.length) * 100
                }%`,
              }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-12">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-6 text-blue-600">
              {currentQuestion.icon}
            </div>
            <h3 className="text-3xl font-bold text-gray-800 leading-relaxed">
              {currentQuestion.text}
            </h3>
          </div>

          {/* Answer Input */}
          {currentQuestion.type === "rating" ? (
            <RatingInput
              scale={currentQuestion.scale}
              value={currentAnswer}
              onChange={handleRatingSubmit}
            />
          ) : (
            <TextInput
              questionId={currentQuestion.id}
              defaultValue={currentAnswer}
            />
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-12">
            <button
              onClick={goToPrevious}
              disabled={currentQuestionIndex === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all ${
                currentQuestionIndex === 0
                  ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                  : "bg-gray-600 text-white hover:bg-gray-700"
              }`}
            >
              <FaChevronLeft className="w-5 h-5" />
              Previous
            </button>

            <button
              onClick={skipQuestion}
              className="px-6 py-3 text-gray-600 hover:text-gray-800 font-semibold"
            >
              Skip Question
            </button>

            <button
              onClick={goToNext}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold transition-all"
            >
              {currentQuestionIndex === questions.length - 1
                ? "Finish"
                : "Next"}
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-8 z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Submit Survey?
            </h3>
            <p className="text-gray-600 mb-6">
              Are you ready to submit your survey responses? You won't be able
              to make changes after submission.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 rounded-lg font-semibold"
              >
                Go Back
              </button>
              <button
                onClick={submitSurvey}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerSurvey;
