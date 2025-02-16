import React, { useState, useEffect } from 'react';
import './QuestionView.css';

interface Question {
  title: string;
  category: string;
  type: string;
  icon: string;
  image: string;
  options: string[];
  correctAnswer: string;
}

interface QuestionViewProps {
  question: Question;
  color: string;
  currentQuestion: number;
  totalQuestions: number;
  onClose: () => void;
  onNextQuestion: () => void;
}

const QuestionView: React.FC<QuestionViewProps> = ({
  question,
  color,
  currentQuestion,
  totalQuestions,
  onClose,
  onNextQuestion
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Réinitialiser les états quand la question change
  useEffect(() => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [question]);

  document.documentElement.style.setProperty('--theme-color', color);
  document.documentElement.style.setProperty('--header-color', `${color}33`);

  const handleAnswerClick = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    setIsCorrect(answer === question.correctAnswer);
  };

  const handleNext = () => {
    onNextQuestion();
  };

  const renderFeedback = () => {
    if (!isAnswered) return null;

    const correctMessages = [
      "Bravo Elisa ! Tu es la meilleure ! ❤️",
      "Super Elisa ! Continue comme ça ! 💖",
      "Excellente réponse Elisa ! Tu gères ! 💝",
      "Parfait Elisa ! Tu es sur la bonne voie ! 💗",
      "Bravo ma chérie ! Tu es incroyable ! 💓"
    ];

    const incorrectMessages = [
      "Pas grave Elisa, tu vas y arriver ! ❤️",
      "Continue Elisa, tu progresses ! 💖",
      "Ne lâche rien Elisa, tu peux le faire ! 💝",
      "Presque Elisa ! La prochaine sera la bonne ! 💗",
      "Garde le cap Elisa, tu es sur la bonne voie ! 💓"
    ];

    const randomMessage = (messages: string[]) => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      return messages[randomIndex];
    };

    return (
      <div className="feedback-container">
        {isCorrect ? (
          <div className="correct-answer">
            <h2>{randomMessage(correctMessages)}</h2>
          </div>
        ) : (
          <div className="wrong-answer">
            <h2>{randomMessage(incorrectMessages)}</h2>
            <p>La bonne réponse était : {question.correctAnswer}</p>
          </div>
        )}
        <button className="next-button" onClick={handleNext}>
          Question suivante
        </button>
      </div>
    );
  };

  return (
    <div className="v-application">
      <header className="header in-game">
        <div className="main">
          <div className="title-wrapper">
            <div className="icon">
              <img src={question.icon} alt={question.category} />
            </div>
            <h1>{question.category}</h1>
          </div>
          <div className="questions-counter">
            Question {currentQuestion} sur {totalQuestions}
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          <svg viewBox="0 0 24 24">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
          </svg>
        </button>
      </header>

      <main className="v-main in-game">
        <div className="game-question">
          <div className="question-data">
            <div className="image-wrapper">
              <img 
                className="image" 
                alt="" 
                src={question.image}
              />
            </div>
            <div className="content-wrapper">
              <span className="quiz-type">{question.type}</span>
              {!isAnswered ? (
                <h2 className="title-3">{question.title}</h2>
              ) : (
                renderFeedback()
              )}
            </div>
          </div>

          <div className="question-answers">
            <div className="radio-button-group" data-answers={question.options.length}>
              {question.options.map((option, index) => (
                <div 
                  key={index} 
                  className={`radio-button ${isAnswered && option === question.correctAnswer ? 'correct' : ''} ${isAnswered && option === selectedAnswer && !isCorrect ? 'incorrect' : ''}`}
                >
                  <div className="radio-button-wrapper">
                    <input
                      type="radio"
                      id={`option-${index}`}
                      name="answer"
                      value={option}
                      checked={selectedAnswer === option}
                      onChange={() => handleAnswerClick(option)}
                      disabled={isAnswered}
                    />
                    <label htmlFor={`option-${index}`}>{option}</label>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuestionView;
