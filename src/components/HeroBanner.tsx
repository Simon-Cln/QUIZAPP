import React from 'react';
import './HeroBanner.css';

interface HeroBannerProps {
  title: string;
  description: string;
  category: string;
  icons: string[];
  type: string;
  image: string;
  color: string;
  onPlay: () => void;
}

const HeroBanner: React.FC<HeroBannerProps> = ({
  title,
  description,
  category,
  icons,
  type,
  image,
  color,
  onPlay
}) => {
  const handleClick = () => {
    const categoriesSection = document.querySelector('.quiz-categories');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
    onPlay();
  };

  return (
    <div className="hero-banner" style={{'--banner-color': color} as React.CSSProperties}>
      <div className="content">
        <div className="content-main">
          <h1>{title}</h1>
          <div className="description-wrapper">{description}</div>
          <button className="play-button" onClick={handleClick}>
            Commencer le quiz
            <svg viewBox="0 0 18 18" fill="none" stroke="black" xmlns="http://www.w3.org/2000/svg">
              <path d="M17.0005 2.88235V17H2.88281" strokeWidth="1.75"/>
              <path d="M1 1L17 17" strokeWidth="1.75"/>
            </svg>
          </button>
        </div>
        <div className="content-bottom">
          <div className="quiz-info">
            <div className="category-info">
              <div className="category-icons">
                {icons.map((icon, index) => (
                  <img key={index} src={icon} alt="" className="category-icon" />
                ))}
              </div>
              <div className="category-text">
                <span className="category-label">Catégorie</span>
                <span className="category-name">{category}</span>
              </div>
            </div>
            <div className="quiz-type-info">
              <span className="type-label">Type</span>
              <span className="type-name">{type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="aside">
        <div className="image-mask"></div>
        <img src={image} alt={title} className="hero-image"/>
      </div>
    </div>
  );
};

export default HeroBanner;
