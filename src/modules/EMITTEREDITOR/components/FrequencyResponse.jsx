import { Chart } from 'chart.js';
import React, { useEffect, useState } from 'react';


const FrequencyResponse = (props) => {
    const data = {
    labels: [63, 125, 250, 500, 1000, 2000, 4000, 8000, 16000],
    datasets: [
        {
        label: 'АЧХ',
        data: [
            { x: 63, y: -6 },
            { x: 125, y: -4 },
            { x: 250, y: -2 },
            { x: 500, y: -1 },
            { x: 1000, y: 0 },
            { x: 2000, y: +1 },
            { x: 4000, y: -2 },
            { x: 8000, y: -5 },
            { x: 16000, y: -9 }
        ],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.3,
        pointRadius: 3,
        fill: true
        }
    ]
    };

    const options = {
    scales: {
        x: {
        type: 'logarithmic',
        title: { display: true, text: 'Частота (Гц)' },
        ticks: {
            callback: function(value) {
            return value;
            }
        }
        },
        y: {
        title: { display: true, text: 'Отклонение SPL (дБ)' },
        ticks: {
            stepSize: 2
        },
        min: -10,
        max: +5
        }
    },
    plugins: {
        tooltip: {
        callbacks: {
            label: function(context) {
            return `${context.parsed.y} дБ на ${context.parsed.x} Гц`;
            }
        }
        }
    }
    };

  return (
    <div>
        <Chart type={'line'} data={data} options={options} />
    </div>
  );
};

export default FrequencyResponse;