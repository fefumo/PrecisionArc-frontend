import React, { useState } from 'react';
import { useAddUserPointMutation } from '../../services/graph-api';
import PointInput from './PointInput';
import { Button } from "primereact/button";

const AddPointForm = ({ r, onRChange }) => {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [addUserPoint] = useAddUserPointMutation();  // Hook for sending a request to add a point

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
        r={r} 
        onXChange={setX}
        onYChange={setY}
        onRChange={onRChange}  
      />
      <Button
        label="Add Point"
        icon="pi pi-check"
        type="submit"
      />
    </form>
  );
};

export default AddPointForm;
