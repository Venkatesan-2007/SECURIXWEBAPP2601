import React, { useEffect, useRef } from 'react';

const RoadmapItem = ({ year, title, description, last }) => {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} className={`roadmap-item ${last ? 'last' : ''}`}>
      <div className="roadmap-marker"></div>
      <div className="roadmap-content">
        <div className="roadmap-year">{year}</div>
        <h4 className="roadmap-title">{title}</h4>
        <p className="roadmap-description">{description}</p>
      </div>
    </div>
  );
};

export default function Roadmap({ items }) {
  return (
    <div className="roadmap-container">
      {items.map((item, index) => (
        <RoadmapItem
          key={index}
          year={item.year}
          title={item.title}
          description={item.description}
          last={index === items.length - 1}
        />
      ))}
    </div>
  );
}
