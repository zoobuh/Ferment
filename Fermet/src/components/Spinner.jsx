import React from 'react';

const Spinner = ({ size = 48, color = '#2BD6A5' }) => {
  const border = Math.max(3, Math.floor(size / 12));
  return (
    <div
      aria-label="Loading"
      role="status"
      style={{
        width: size,
        height: size,
        borderRadius: '9999px',
        border: `${border}px solid rgba(43, 214, 165, 0.2)`,
        borderTopColor: color,
        animation: 'fermet-spin 900ms linear infinite',
      }}
    />
  );
};

export default Spinner;
