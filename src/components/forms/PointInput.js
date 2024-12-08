import React from "react";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";

const PointInput = ({ x, y, r, onXChange, onYChange, onRChange }) => {
    return (
        <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
            <div>
                <label htmlFor="x-slider" style={{ marginRight: "1rem" }}>X:</label>
                <Slider
                    id="x-slider"
                    value={x}
                    onChange={(e) => onXChange(e.value)}
                    min={-5}
                    max={3}
                    style={{ width: "200px" }}
                />
                <span style={{ marginLeft: "1rem" }}>{x}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column"}}>
                <label htmlFor="y-text" style={{ marginRight: "1rem" }}>Y:</label>
                <InputText
                    keyfilter="int"
                    id="y-text"
                    value={y}
                    onChange={(e) => {
                        const newValue = e.target.value;
                        // Проверяем, что введённое значение является числом и находится в нужном диапазоне
                        const parsedValue = parseInt(newValue, 10);
                        if (!isNaN(parsedValue) && parsedValue >= -3 && parsedValue <= 3) {
                            onYChange(parsedValue);
                        }
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
                    min={1}
                    max={3}
                    style={{ width: "200px" }}
                />
                <span style={{ marginLeft: "1rem" }}>{r}</span>
            </div>
        </div>
    );
};

export default PointInput;
