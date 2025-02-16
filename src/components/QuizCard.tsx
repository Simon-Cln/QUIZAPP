import React from 'react';
import './QuizCard.css';

interface QuizCardProps {
  title: string;
  subtitle: string;
  category: string;
  icon: string;
  type: string;
  image: string;
  color: string;
  maskShape: string;
  onPlay: () => void;
}

const QuizCard: React.FC<QuizCardProps> = ({
  title,
  subtitle,
  category,
  icon,
  type,
  image,
  color,
  maskShape,
  onPlay
}) => {
  return (
    <div 
      className="quiz-card v-card v-card--link v-theme--quipoquizTheme v-card--density-default rounded-0 v-card--variant-outlined quiz-tile-portrait"
      onClick={onPlay}
      style={{
        '--card-color': color,
        '--mask-shape': `url(${maskShape})`
      } as React.CSSProperties}
    >
      <div className="v-card__loader">
        <div className="v-progress-linear">
          <div className="v-progress-linear__background"></div>
          <div className="v-progress-linear__indeterminate">
            <div className="v-progress-linear__indeterminate long"></div>
            <div className="v-progress-linear__indeterminate short"></div>
          </div>
        </div>
      </div>
      <div className="mask-container">
        <div className="mask"></div>
        <img 
          src={image} 
          alt={title} 
          className="aspect-ratio"
          width="1080"
          height="1080"
          loading="lazy"
        />
      </div>
      <div className="content-container">
        <div className="texts-container">
          <div className="title-wrapper">
            <h3 className="title title-5">{title}</h3>
          </div>
          <p className="subtitle">{subtitle}</p>
        </div>
        <div className="quiz-cat-and-type padded-x">
          <div className="quiz-cat">
            <i className="v-icon notranslate v-theme--quipoquizTheme icon">
              <img src={icon} alt="" />
            </i>
            <span className="title">{category}</span>
          </div>
          <span className="quiz-type">{type}</span>
        </div>
      </div>
      <span className="v-card__overlay"></span>
      <span className="v-card__underlay"></span>
    </div>
  );
};

export default QuizCard;
