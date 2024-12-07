import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CanvasGraph from './components/CanvasGraph';
import AddPointForm from './components/AddPointForm';
import { useGetUserPointsQuery, useAddUserPointMutation } from './services/graph-api';

export default function MainPage() {
    const isAuthenticated = useSelector((state) => state.auth.token !== null); // Проверка аутентификации
    const navigate = useNavigate();

    // Состояния для работы с графиком
    const [rValue, setRValue] = useState(3);
    const { data: points = [], refetch } = useGetUserPointsQuery(); // Запрос точек с сервера
    const [addUserPoint] = useAddUserPointMutation(); // Мутация для добавления точки

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/'); // Если не аутентифицирован, переходим на WelcomePage
        }
    }, [isAuthenticated, navigate]);

    const handleCanvasClick = async (x, y) => {
        try {
            const point = await addUserPoint({ x, y, r: rValue }).unwrap(); // Добавляем точку
            refetch(); // Обновляем данные точек
        } catch (error) {
            console.error("Error adding point:", error);
            alert("Failed to add point. Please try again.");
        }
    };

    return (
        <div>
            <h1>Main Page</h1>
            <AddPointForm />
            <label>
                R Value: 
                <input 
                    type="number" 
                    value={rValue} 
                    onChange={(e) => setRValue(Number(e.target.value))} 
                />
            </label>
            <CanvasGraph 
                rValue={rValue} 
                points={points} 
                onCanvasClick={handleCanvasClick} 
            />
        </div>
    );
}
