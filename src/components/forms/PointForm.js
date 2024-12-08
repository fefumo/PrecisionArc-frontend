import React, { useState } from 'react';
import { Button } from "primereact/button";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";


const AddPointForm = ({ r, onRChange, onSubmit }) => {
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (y < -3 || y > 3) {
            alert('Y must be between -3 and 3');
            return;
        }
        onSubmit(x, parseFloat(y)); // Use the onSubmit callback from props
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
                        onChange={(e) => {
                            const inputValue = e.target.value;
                            setY(inputValue);
                        }}
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
