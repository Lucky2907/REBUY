import React, { useEffect, useState } from 'react';
import './Confetti.css';

const Confetti = () => {
  const [pieces, setPieces] = useState([]);

  useEffect(() => {
    const newPieces = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      style: {
        left: `${Math.random() * 100}vw`,
        animationDelay: `${Math.random() * 4}s`,
        backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`,
        transform: `rotate(${Math.random() * 360}deg)`
      }
    }));
    setPieces(newPieces);
  }, []);

  return (
    <div className="confetti-container" aria-hidden="true">
      {pieces.map(piece => (
        <div key={piece.id} className="confetti-piece" style={piece.style}></div>
      ))}
    </div>
  );
};

export default Confetti; 