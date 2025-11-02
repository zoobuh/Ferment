import { memo } from 'react';

const MintDots = memo(() => {
  // Create a pattern of subtle mint green dots
  const dots = [];
  const spacing = 80; // Distance between dots
  const dotsPerRow = Math.ceil(window.innerWidth / spacing) + 2;
  const dotsPerCol = Math.ceil(window.innerHeight / spacing) + 2;

  for (let row = 0; row < dotsPerCol; row++) {
    for (let col = 0; col < dotsPerRow; col++) {
      const x = col * spacing + (row % 2 === 0 ? 0 : spacing / 2); // Offset every other row
      const y = row * spacing;
      const opacity = Math.random() * 0.15 + 0.05; // Random opacity between 0.05 and 0.2
      
      dots.push(
        <div
          key={`${row}-${col}`}
          style={{
            position: 'absolute',
            left: `${x}px`,
            top: `${y}px`,
            width: '2px',
            height: '2px',
            backgroundColor: '#2bd9a7',
            borderRadius: '50%',
            opacity: opacity,
            pointerEvents: 'none'
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1,
        pointerEvents: 'none',
        overflow: 'hidden'
      }}
    >
      {dots}
    </div>
  );
});

MintDots.displayName = 'MintDots';
export default MintDots;
