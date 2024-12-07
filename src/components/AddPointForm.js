import React, { useState } from 'react';
import { useAddUserPointMutation } from '../services/graph-api';  // Хук для добавления точки

const AddPointForm = () => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [r, setR] = useState(3);
  const [addUserPoint] = useAddUserPointMutation();  // Хук для отправки запроса на добавление точки

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPoint = { x, y, r };  // Создаем объект для новой точки
    await addUserPoint(newPoint);  // Отправляем запрос для добавления точки
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        X:
        <input type="number" value={x} onChange={(e) => setX(e.target.value)} />
      </label>
      <label>
        Y:
        <input type="number" value={y} onChange={(e) => setY(e.target.value)} />
      </label>
      <label>
        R:
        <input type="number" value={r} onChange={(e) => setR(e.target.value)} />
      </label>
      <button type="submit">Add Point</button>
    </form>
  );
};

export default AddPointForm;
