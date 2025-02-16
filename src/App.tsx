import React, { useState } from 'react';
import HeroBanner from './components/HeroBanner';
import QuizCard from './components/QuizCard';
import QuestionView from './components/QuestionView';
import { getRandomQuestions, QuizQuestion } from './services/questionService';
import './fonts.css';
import './App.css';
import cultureIcon from './assets/culture.svg';
import anglaisIcon from './assets/anglais.svg';

const categories = [
  {
    id: 'culture_eco',
    title: 'Culture G économique',
    subtitle: 'Économie et Management',
    icon: cultureIcon,
    type: 'Quiz',
    image: 'https://assets.quipoquiz.com/production/shapes/art_01.svg',
    color: '#ff7e03'
  },
  {
    id: 'logique',
    title: 'Raisonnement logique',
    subtitle: 'Logique et Calcul',
    icon: 'https://assets.quipoquiz.com/production/icons/icon_science.svg',
    type: 'Quiz',
    image: 'https://assets.quipoquiz.com/production/shapes/art_03.svg',
    color: '#f7e24c'
  },
  {
    id: 'francais',
    title: 'Expression française',
    subtitle: 'Compréhension écrite',
    icon: 'https://assets.quipoquiz.com/production/icons/icon_art.svg',
    type: 'Quiz',
    image: 'https://assets.quipoquiz.com/production/shapes/art_02.svg',
    color: '#ea62bb'
  },
  {
    id: 'anglais',
    title: 'Business English',
    subtitle: 'Written Expression',
    icon: anglaisIcon,
    type: 'Quiz',
    image: 'https://assets.quipoquiz.com/production/shapes/art_04.svg',
    color: '#fc5252'
  }
];

function App() {
  const [currentCategory, setCurrentCategory] = useState<string | null>(null);
  const [showQuiz, setShowQuiz] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  const handleStartQuiz = (categoryId: string) => {
    const quizQuestions = getRandomQuestions(categoryId);
    setQuestions(quizQuestions);
    setCurrentCategory(categoryId);
    setCurrentQuestionIndex(0);
    setShowQuiz(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
    setCurrentCategory(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Au lieu de fermer le quiz, on recommence avec les mêmes questions dans un ordre différent
      const reshuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
      setQuestions(reshuffledQuestions);
      setCurrentQuestionIndex(0);
    }
  };

  const getCurrentCategory = () => {
    return categories.find(cat => cat.id === currentCategory);
  };

  return (
    <div className="app">
      {!showQuiz ? (
        <>
          <HeroBanner
            title="Pour toi mon cœur ❤️"
            description="Ma chérie, j'ai créé cette petite plateforme rien que pour toi. Tu vas tout déchirer au Score IAE Message, j'en suis sûr. Je t'aime fort ! 🥰"
            category="Quiz IAE"
            icons={[
              cultureIcon,
              'https://assets.quipoquiz.com/production/icons/icon_art.svg',
              'https://assets.quipoquiz.com/production/icons/icon_science.svg',
              anglaisIcon
            ]}
            type="Quiz"
            image="https://assets.quipoquiz.com/production/shapes/art_01.svg"
            color="#fc5252"
            maskShape="https://assets.quipoquiz.com/production/shapes/art_01.svg"
            onPlay={() => {}}
          />
          
          <section className="quiz-categories">
            <h2>Choisissez votre catégorie</h2>
            <div className="categories-grid">
              {categories.map(cat => (
                <QuizCard
                  key={cat.id}
                  {...cat}
                  maskShape="https://assets.quipoquiz.com/production/shapes/art_01.svg"
                  onPlay={() => handleStartQuiz(cat.id)}
                />
              ))}
            </div>
          </section>
        </>
      ) : (
        currentCategory && questions.length > 0 && (
          <QuestionView
            question={questions[currentQuestionIndex]}
            color={getCurrentCategory()?.color || '#000000'}
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={questions.length}
            onClose={handleCloseQuiz}
            onNextQuestion={handleNextQuestion}
          />
        )
      )}
    </div>
  );
}

export default App;
