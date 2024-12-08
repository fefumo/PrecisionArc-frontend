import React, { useRef, useEffect } from 'react';
import '../../styles/Canvas.css'

const CanvasGraph = ({ rValue, points, onCanvasClick }) => {
    const canvasRef = useRef(null);
    const axisRange = 12;

    const drawGraph = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const unitScale = canvas.width / axisRange;

        drawAxes(ctx, unitScale);

        if (rValue) {
            if (rValue < 0) rValue = 0;
            if (rValue > 5) rValue = 5;
            drawArea(ctx, unitScale, rValue);
        }

        drawPoints(ctx, unitScale, points);
    };

    

    const drawPoints = (ctx, unitScale, points) => {
        if (!Array.isArray(points) || points.length === 0) return;

        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;

        console.log('Drawing points:', points); 

        points.forEach(point => {
            if (point.r !== rValue) return;
            const x = centerX + point.x * unitScale;
            const y = centerY - point.y * unitScale;

            ctx.fillStyle = point.result ? 'rgb(158, 255, 92)' : 'red';
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, 2 * Math.PI);
            ctx.fill();
        });
    };

    const drawAxes = (ctx, unitScale) => {
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;

        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(0, centerY);
        ctx.lineTo(canvasRef.current.width, centerY);
        ctx.moveTo(centerX, 0);
        ctx.lineTo(centerX, canvasRef.current.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(canvasRef.current.width - 10, centerY - 5);
        ctx.lineTo(canvasRef.current.width, centerY);
        ctx.lineTo(canvasRef.current.width - 10, centerY + 5);
        ctx.moveTo(centerX - 5, 10);
        ctx.lineTo(centerX, 0);
        ctx.lineTo(centerX + 5, 10);
        ctx.stroke();

        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';

        for (let i = -5; i <= 5; i++) {
            if (i === 0) continue;
            const x = centerX + i * unitScale;
            ctx.beginPath();
            ctx.moveTo(x, centerY - 5);
            ctx.lineTo(x, centerY + 5);
            ctx.stroke();
            ctx.textAlign = 'center';
            ctx.fillText(i.toString(), x, centerY + 15);

            const y = centerY - i * unitScale;
            ctx.beginPath();
            ctx.moveTo(centerX - 5, y);
            ctx.lineTo(centerX + 5, y);
            ctx.stroke();
            ctx.textAlign = 'left';
            ctx.fillText(i.toString(), centerX + 10, y + 3);
        }
    };

    const drawArea = (ctx, unitScale, rValue) => {
        const centerX = canvasRef.current.width / 2;
        const centerY = canvasRef.current.height / 2;

        ctx.fillStyle = 'rgba(241, 196, 15, 0.5)';

        // Четверть круга
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, unitScale * rValue, 0, 0.5 * Math.PI, false);
        ctx.closePath();
        ctx.fill();

        // Прямоугольник
        ctx.fillRect(
            centerX - unitScale * rValue,
            centerY - unitScale * rValue,
            unitScale * rValue,
            unitScale * rValue
        );

        // Треугольник
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(centerX + unitScale * rValue / 2, centerY);
        ctx.lineTo(centerX, centerY - unitScale * rValue);
        ctx.closePath();
        ctx.fill();
    };

    const handleCanvasClick = async (event) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const rect = canvas.getBoundingClientRect();

        const r = rValue;
        if (!r) {
            alert('Please set R value');
            return;
        }

        const xClick = event.clientX - rect.left;
        const yClick = event.clientY - rect.top;

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const unitScale = canvas.width / axisRange;

        const x = (xClick - centerX) / unitScale;
        const y = (centerY - yClick) / unitScale;

        onCanvasClick(parseFloat(x.toFixed(2)), parseFloat(y.toFixed(2)));
    };

    useEffect(() => {
        const resizeCanvas = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            canvas.width = canvas.offsetWidth;
            canvas.height = canvas.offsetWidth;
            drawGraph();
        };
    
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
        };
    }, []);
    
    useEffect(() => {
        drawGraph(); // Отдельно для обновлений rValue и points
    }, [rValue, points]);
    

    return <canvas ref={canvasRef} onClick={handleCanvasClick} />;
};

export default CanvasGraph;
