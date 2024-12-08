import React, { useRef, useEffect, useCallback } from 'react';
import '../../styles/Canvas.css';

const CanvasGraph = ({ rValue, points, onCanvasClick }) => {
    const canvasRef = useRef(null);
    const axisRange = 10; // Adjust this for scaling.

    const drawGraph = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const unitScale = canvas.width / axisRange;

        drawAxes(ctx, unitScale);

        if (rValue) {
            if (rValue < 0) rValue = 0;
            if (rValue > 3) rValue = 3;
            drawArea(ctx, unitScale, rValue);
        }

        drawPoints(ctx, unitScale, points);
    }, [rValue, points]);

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
        ctx.lineWidth = 2.5;

        // Draw main axes
        ctx.beginPath();
        ctx.moveTo(0, centerY); // X-axis
        ctx.lineTo(canvasRef.current.width, centerY);
        ctx.moveTo(centerX, 0); // Y-axis
        ctx.lineTo(centerX, canvasRef.current.height);
        ctx.stroke();

        // Draw arrows
        ctx.beginPath();
        ctx.moveTo(canvasRef.current.width - 10, centerY - 5); // X-axis arrow
        ctx.lineTo(canvasRef.current.width, centerY);
        ctx.lineTo(canvasRef.current.width - 10, centerY + 5);

        ctx.moveTo(centerX - 5, 10); // Y-axis arrow
        ctx.lineTo(centerX, 0);
        ctx.lineTo(centerX + 5, 10);
        ctx.stroke();

        // Draw axis markings (4 per quadrant)
        ctx.fillStyle = 'black';
        ctx.font = '12px Arial';

        for (let i = -4; i <= 4; i++) {
            if (i === 0) continue; // Skip 0
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

        // Semicircle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.arc(centerX, centerY, unitScale * rValue, Math.PI, 1.5 * Math.PI, false);
        ctx.closePath();
        ctx.fill();

        // Rectangle
        ctx.fillRect(
            centerX,
            centerY - unitScale * rValue,
            unitScale * rValue,
            unitScale * rValue
        );

        // Triangle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY); 
        ctx.lineTo(centerX + unitScale * rValue, centerY); 
        ctx.lineTo(centerX, centerY + unitScale * rValue); 
        ctx.closePath();
        ctx.fill();
    };

    const handleCanvasClick = (event) => {
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
    }, [drawGraph]);

    useEffect(() => {
        drawGraph();
    }, []);

    return <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ width: '350px', height: '350px' }} />;
};

export default CanvasGraph;
