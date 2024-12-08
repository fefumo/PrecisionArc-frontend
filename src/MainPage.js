import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'primereact/button';
import { useGetUserPointsQuery, useAddUserPointMutation, useClearTableMutation } from './services/graph-api';
import CanvasGraph from './components/graph/CanvasGraph';
import PointsTable from './components/graph/PointsTable';
import PointForm from './components/forms/PointForm';

const MainPage = () => {
    const isAuthenticated = useSelector((state) => state.auth.token !== null);
    const navigate = useNavigate();
    const [rValue, setRValue] = useState(3);

    const { data: points = [], refetch } = useGetUserPointsQuery();
    const [addUserPoint] = useAddUserPointMutation();
    const [clearTable, { isLoading: isClearing }] = useClearTableMutation();

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

    const handleClearTable = async () => {
        try {
            console.log('Clearing table...');
            await clearTable().unwrap(); // Trigger the clearTable mutation
            refetch(); // Refetch points to update UI
            console.log('Table cleared successfully');
        } catch (error) {
            console.error('Error clearing table:', error);
            alert(error?.data?.message || 'Failed to clear table');
        }
    };

    return (
        <div>
            <h1>Main Page</h1>
            <PointForm
                r={rValue}
                onRChange={setRValue}
                onSubmit={(x, y) => handleAddPoint(x, y)}
            />
            <CanvasGraph
                rValue={rValue}
                points={points}
                onCanvasClick={(x, y) => handleAddPoint(x, y)}
            />
            <PointsTable points={points} />
            <Button
                label={isClearing ? 'Clearing...' : 'Clear Table'}
                icon={isClearing ? 'pi pi-spin pi-spinner' : 'pi pi-trash'}
                className="p-button-danger"
                onClick={handleClearTable}
                disabled={isClearing}
            />
        </div>
    );
};

export default MainPage;
