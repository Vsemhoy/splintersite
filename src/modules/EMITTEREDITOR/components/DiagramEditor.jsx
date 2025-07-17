import React from 'react'
import './style/diagrameditor.css';

function DiagramEditor({ data, onDataChange }) {
const radius = 200;
  const center = 250;

  const handleSliderChange = (index, value) => {
    const newData = [...data];
    newData[index] = parseFloat(value);
    onDataChange(newData);
  };

  return (
    <div className="radial-editor">
      {data.map((value, index) => {
        const angle = index * 10;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <div
            key={index}
            className="slider-wrapper"
            style={{
              left: `${center + x}px`,
              top: `${center + y}px`,
              transform: `rotate(${angle}deg)`
            }}
          >
            <input
              type="range"
              min="-25"
              max="0"
              step="0.1"
              value={value}
              onChange={(e) => handleSliderChange(index, e.target.value)}
              className="radial-slider"
            />
            <div className="angle-label">{angle}°</div>
          </div>
        );
      })}
    </div>
  )
}

export default DiagramEditor