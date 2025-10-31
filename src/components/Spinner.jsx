import React from 'react';

const Spinner = ({ size = 48, color = '#00b6f7' }) => {
  const border = Math.max(3, Math.floor(size / 12));
  return (
    <div
      aria-label="Loading"
      role="status"
      style={{
        width: size,
        height: size,
        borderRadius: '9999px',
        border: `${border}px solid rgba(0, 182, 247, 0.18)`,
        borderTopColor: color,
        animation: 'fermet-spin 900ms linear infinite',
      }}
    />
  );
};

export default Spinner;
