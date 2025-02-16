import culturegQuestions from '../../../backend/questions_culture_g.json';
import mathQuestions from '../../../backend/questions_math.json';
import anglaisQuestions from '../../../backend/questions_anglais.json';
import francaisQuestions from '../../../backend/questions_francais.json';

export interface QuizQuestion {
  title: string;
  category: string;
  type: string;
  icon: string;
  image: string;
  options: string[];
  correctAnswer: string;
}

const cleanAnswer = (answer: string): string => {
  // Enlever les ":" au début et les espaces en trop
  return answer.replace(/^:\s*/, '').trim();
};

const convertToQuizQuestion = (q: any): QuizQuestion => {
  // Nettoyer la réponse correcte et les réponses incorrectes
  const correctAnswer = cleanAnswer(q.correct_answer);
  const incorrectAnswers = q.incorrect_answers
    .map(cleanAnswer)
    // Filtrer les réponses qui sont identiques à la réponse correcte
    .filter(answer => answer !== correctAnswer)
    // Filtrer les doublons dans les réponses incorrectes
    .filter((answer, index, self) => self.indexOf(answer) === index);

  // Mélanger les réponses
  const options = [correctAnswer, ...incorrectAnswers]
    .sort(() => Math.random() - 0.5);

  return {
    title: q.question_text || q.question,
    category: q.category,
    type: "Question",
    icon: getIconForCategory(q.category),
    image: "https://assets.quipoquiz.com/production/shapes/art_01.svg",
    options: options,
    correctAnswer: correctAnswer
  };
};

const getIconForCategory = (category: string): string => {
  switch (category?.toLowerCase()) {
    case 'culture générale':
    case 'économie':
    case 'épreuve de culture générale, économique et managériale':
      return '/src/assets/culture.svg';
    case 'anglais':
      return '/src/assets/anglais.svg';
    case 'français':
    case 'expression française':
      return 'https://assets.quipoquiz.com/production/icons/icon_art.svg';
    case 'mathématiques':
    case 'logique':
    case 'raisonnement logique':
      return 'https://assets.quipoquiz.com/production/icons/icon_science.svg';
    default:
      return 'https://assets.quipoquiz.com/production/icons/icon_art.svg';
  }
};

export const getQuestionsByCategory = (categoryId: string): QuizQuestion[] => {
  switch (categoryId) {
    case 'culture_eco':
      return culturegQuestions.map(convertToQuizQuestion);
    case 'logique':
      return mathQuestions.map(convertToQuizQuestion);
    case 'francais':
      return francaisQuestions.map(convertToQuizQuestion);
    case 'anglais':
      return anglaisQuestions.map(convertToQuizQuestion);
    default:
      return [];
  }
};

export const getRandomQuestions = (categoryId: string): QuizQuestion[] => {
  const questions = getQuestionsByCategory(categoryId);
  return [...questions].sort(() => Math.random() - 0.5);
};
