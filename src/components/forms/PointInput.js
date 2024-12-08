import React from "react";
import { Slider } from "primereact/slider";
import { InputText } from "primereact/inputtext";
import "primereact/resources/primereact.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primeicons/primeicons.css";

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

            <div>
                <label htmlFor="y-text" style={{ marginRight: "1rem" }}>Y:</label>
                <InputText
                    id="y-text"
                    value={y}
                    onChange={(e) => onYChange(Number(e.target.value))}
                    style={{ width: "50px" }}
                />
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
