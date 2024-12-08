import React, { useState } from 'react';
import { useAddUserPointMutation } from '../../services/graph-api';
import { Button } from "primereact/button";
import { Slider } from "primereact/slider"; 
import { InputText } from "primereact/inputtext"; 


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
            <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
                <div>
                    <label htmlFor="x-slider" style={{ marginRight: "1rem" }}>X:</label>
                    <Slider
                        id="x-slider"
                        value={x}
                        onChange={(e) => setX(e.value)}
                        min={-5}
                        max={3}
                        style={{ width: "200px" }}
                    />
                    <span style={{ marginLeft: "1rem" }}>{x}</span>
                </div>

                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label htmlFor="y-text" style={{ marginRight: "1rem" }}>Y:</label>
                    <InputText
                        keyfilter="int"
                        id="y-text"
                        value={y}
                        onChange={(e) => setY(y)}
                        style={{ width: "50px" }}
                    />
                    <small id="username-help">
                        Y must be between -3 and 3
                    </small>
                </div>

                <div>
                    <label htmlFor="r-slider" style={{ marginRight: "1rem" }}>R:</label>
                    <Slider
                        id="r-slider"
                        value={r}
                        onChange={(e) => onRChange(e.value)}
                        min={-5}
                        max={3}
                        style={{ width: "200px" }}
                    />
                    <span style={{ marginLeft: "1rem" }}>{r}</span>
                </div>
            </div>
            <Button
                label="Add Point"
                icon="pi pi-check"
                type="submit"
            />
        </form>
    );
};

export default AddPointForm;
