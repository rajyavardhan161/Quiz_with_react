import React, { useState, useEffect } from "react";

export default function App() {
  const questionsData = [
    {
      id: 1,
      question: "Which is the largest mammal in the world?",
      options: ["African Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
      answer: "Blue Whale",
    },
    {
      id: 2,
      question: "Which planet is known as the 'Morning Star' or 'Evening Star'?",
      options: ["Mars", "Venus", "Jupiter", "Mercury"],
      answer: "Venus",
    },
    {
      id: 3,
      question:
        "In Avengers: Endgame, who sacrificed themselves to obtain the Soul Stone?",
      options: [
        { type: "image", value: "https://wallpapers.com/images/featured/iron-man-superhero-ponky3hlfivddo2m.jpg" },
        { type: "image", value: "https://upload.wikimedia.org/wikipedia/en/f/f6/Scarlett_Johansson_as_Black_Widow.jpg" },
        { type: "image", value: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVdjWQznlQxWZWAh3fZw6H7kya9AfkRn4Hvw&s" },
        { type: "image", value: "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/1f92373a_50d8_4800_8025_be7f2b840103.jpeg" }
      ],
      answer: "https://upload.wikimedia.org/wikipedia/en/f/f6/Scarlett_Johansson_as_Black_Widow.jpg",
    },
    {
      id: 4,
      question: "Who painted the famous artwork 'Mona Lisa'?",
      options: ["Pablo Picasso", "Leonardo da Vinci", "Vincent van Gogh", "Michelangelo"],
      answer: "Leonardo da Vinci",
    },
    {
      id: 5,
      question: "Which country won the FIFA World Cup in 2018?",
      options: ["Brazil", "Germany", "France", "Argentina"],
      answer: "France",
    },
    {
      id: 6,
      question: "Which is the smallest continent in the world by land area?",
      options: ["Europe", "Australia", "Antarctica", "South America"],
      answer: "Australia",
    },
  ];

  const [remainingQuestions, setRemainingQuestions] = useState([...questionsData]); // questions left
  const [current, setCurrent] = useState(null);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Pick random question from remaining questions
  const pickRandomQuestion = () => {
    if (remainingQuestions.length === 0) {
      setShowScore(true);
      return;
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    setCurrent(remainingQuestions[randomIndex]);
    // Remove picked question from remaining
    setRemainingQuestions(prev => prev.filter((_, idx) => idx !== randomIndex));
  };

  // Auto move to next question every 5 seconds
  useEffect(() => {
    if (showScore) return;
    if (!current) pickRandomQuestion();
    const timer = setTimeout(() => pickRandomQuestion(), 5000);
    return () => clearTimeout(timer);
  }, [current, showScore]);

  const handleAnswer = (option) => {
    const chosen = typeof option === "object" ? option.value : option;
    if (chosen === current.answer) setScore(score + 1);
    pickRandomQuestion();
  };

  const restartQuiz = () => {
    setRemainingQuestions([...questionsData]);
    setScore(0);
    setShowScore(false);
    setCurrent(null);
  };

  return (
    <div className="quiz-wrapper">
      <div className="quiz-card">
        <h1 className="title">React Quiz</h1>

        {showScore ? (
          <div className="score-box">
            <h2>Your Score:</h2>
            <p className="score">{score} / {questionsData.length}</p>
            <button className="primary-btn" onClick={restartQuiz}>
              Play Again
            </button>
          </div>
        ) : (
          current && (
            <div>
              <div className="question">{current.question}</div>
              <div className="options-grid">
                {current.options.map((opt, idx) => (
                  <button key={idx} className="option-btn" onClick={() => handleAnswer(opt)}>
                    {typeof opt === "object" ? <img src={opt.value} alt={`opt-${idx}`} className="option-img"/> : <span>{opt}</span>}
                  </button>
                ))}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}
