import React, { useState } from 'react';
import { useAddUserPointMutation } from '../../services/graph-api';
import PointInput from './PointInput';

const AddPointForm = ({ r, onRChange }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [addUserPoint] = useAddUserPointMutation();  // Хук для отправки запроса на добавление точки

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPoint = { x, y, r };  
    console.log('Submitting new point:', newPoint);

    try {
        const response = await addUserPoint(newPoint).unwrap();  
        console.log('Server response:', response); 
    } catch (error) {
        console.error('Error adding point:', error); 
    }

  };

  return (
    <form onSubmit={handleSubmit}>
      <PointInput 
        x={x} 
        y={y} 
        r={r}  // Передаем r сюда
        onXChange={setX} 
        onYChange={setY} 
        onRChange={onRChange}  // Передаем функцию для изменения r
      />
      <button type="submit">Add Point</button>
    </form>
  );
};

export default AddPointForm;
