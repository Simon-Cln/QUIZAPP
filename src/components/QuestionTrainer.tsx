import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './QuestionTrainer.css';

interface Question {
  id: number;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

const shuffleArray = (array: string[]) => {
  return [...array].sort(() => Math.random() - 0.5);
};

const QuestionTrainer: React.FC = () => {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);

  const fetchRandomQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/question/random');
      const q: Question = response.data;
      setQuestion(q);
      const allAnswers = shuffleArray([q.correct_answer, ...q.incorrect_answers]);
      setAnswers(allAnswers);
      setSelectedAnswer(null);
      setResult(null);
    } catch (error) {
      console.error('Erreur lors de la récupération de la question:', error);
    }
  };

  useEffect(() => {
    fetchRandomQuestion();
  }, []);

  const handleAnswerClick = (answer: string) => {
    if (selectedAnswer || !question) return;
    
    setSelectedAnswer(answer);
    setTotalQuestions(prev => prev + 1);
    
    if (answer === question.correct_answer) {
      setResult("Correct ! ");
      setScore(prev => prev + 1);
    } else {
      setResult(`Incorrect. La bonne réponse était : ${question.correct_answer}`);
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons = {
      'Épreuve de culture générale, économique et managériale': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/svgs/solid/money-bill-trend-up.svg',
      'Épreuve de compréhension et expression écrite en français': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/svgs/solid/language.svg',
      'Épreuve de raisonnement et logique numérique': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/svgs/solid/brain.svg',
      'Épreuve de compréhension et expression écrite en anglais': 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/svgs/solid/earth-americas.svg'
    };
    console.log('Category received:', category);
    const iconUrl = icons[category];
    console.log('Icon URL:', iconUrl);
    return iconUrl || null;
  };

  useEffect(() => {
    if (question) {
      console.log('Current category:', question.category);
      console.log('Icon URL:', getCategoryIcon(question.category));
    }
  }, [question]);

  return (
    <div className="question-trainer">
      <div className="score-container">
        <h2>Score: {score}/{totalQuestions}</h2>
      </div>
      
      <div className="question-container">
        {question && getCategoryIcon(question.category) && (
          <img 
            src={getCategoryIcon(question.category)} 
            alt={question.category}
            className="background-image"
          />
        )}
        {question ? (
          <div className="question-content">
            <h3 className="category">{question.category}</h3>
            <p className="question">{question.question}</p>
            
            <div className="answers-grid">
              {answers.map((answer, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(answer)}
                  className={`answer-button ${
                    selectedAnswer === answer 
                      ? answer === question.correct_answer 
                        ? 'correct' 
                        : 'incorrect'
                      : ''
                  }`}
                  disabled={selectedAnswer !== null}
                >
                  {answer}
                </button>
              ))}
            </div>
            
            {result && (
              <div className="result">
                <p>{result}</p>
                <button className="next-button" onClick={fetchRandomQuestion}>
                  Question Suivante
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="loading">Chargement de la question...</div>
        )}
      </div>
    </div>
  );
};

export default QuestionTrainer;
