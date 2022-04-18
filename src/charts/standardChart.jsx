import React, { MouseEvent, useRef } from 'react';
import {
    Chart as ChartJS,
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    ArcElement
} from 'chart.js';
import {
    Chart,
    getElementAtEvent,
} from 'react-chartjs-2';

import { getFrequencies } from "./getFrequencies"

ChartJS.register(
    LinearScale,
    CategoryScale,
    BarElement,
    PointElement,
    LineElement,
    Legend,
    Tooltip,
    ArcElement
);

export const options = {
    scales: {
        y: {
            beginAtZero: true,
        },
    },
};

function newChart(title) {
    return {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: title
            },
        }
    };
}

function newData(field, dataset) {
    var result = getFrequencies(dataset, field)
    result.datasets[0].backgroundColor = 'rgba(86, 125, 70, 0.9)'

    return result
}

export function StandardChart(props) {
    const chartRef = useRef(null);

    if ((props.dataset !== undefined)) {
        const data = newData(props.field, props.dataset)

        const printElementAtEvent = (element) => {
            if (!element.length) return;

            const { datasetIndex, index } = element[0];

            console.log(data.labels[index], data.datasets[datasetIndex].data[index]);
        };

        const onClick = (event) => {
            const { current: chart } = chartRef;

            if (!chart) {
                return;
            }

            printElementAtEvent(getElementAtEvent(chart, event));
        };

        return (
            <Chart
                ref={chartRef}
                type={props.type}
                onClick={onClick}
                options={newChart(props.field)}
                data={data}
            />
        );
    } return (<div>No Data Yet!</div>);
}