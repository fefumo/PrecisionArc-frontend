import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useGetUserPointsQuery, useAddUserPointMutation } from './services/graph-api';
import CanvasGraph from './components/graph/CanvasGraph';
import PointsTable from './components/graph/PointsTable';
import AddPointForm from './components/forms/AddPointForm';

const MainPage = () => {
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const navigate = useNavigate();
    const [rValue, setRValue] = useState(3);

    const { data: points = [], refetch } = useGetUserPointsQuery();
    const [addUserPoint] = useAddUserPointMutation();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/');
        }
    }, [isAuthenticated, navigate]);

    const handleAddPoint = async (x, y) => {
        try {
            console.log('Adding point:', { x, y, r: rValue }); 
            const response = await addUserPoint({ x, y, r: rValue }).unwrap();
            console.log('Point added successfully:', response); 
            refetch(); // Update points list
        } catch (error) {
            console.error('Error adding point:', error); 
            alert(error?.data?.message || 'Failed to add point');
        }
    };
    
    return (
        <div>
            <h1>Main Page</h1>
            <AddPointForm r={rValue} onRChange={setRValue} />
            <CanvasGraph
                rValue={rValue}
                points={points}
                onCanvasClick={(x, y) => handleAddPoint(x, y)}
            />
            <PointsTable points={points} />
        </div>
    );
};

export default MainPage;
