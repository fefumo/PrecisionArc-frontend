import React from 'react';

const PointInput = ({ x, y, r, onXChange, onYChange, onRChange }) => (
  <div>
    <label>
      X:
      <input 
        type="number" 
        value={x} 
        onChange={(e) => onXChange(Number(e.target.value))} 
      />
    </label>
    <label>
      Y:
      <input 
        type="number" 
        value={y} 
        onChange={(e) => onYChange(Number(e.target.value))} 
      />
    </label>
    <label>
      R:
      <input 
        type="number" 
        value={r} 
        onChange={(e) => onRChange(Number(e.target.value))}  // Вызываем onRChange для обновления значения R
      />
    </label>
  </div>
);

export default PointInput;
