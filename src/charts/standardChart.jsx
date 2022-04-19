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
    ArcElement,
    registerables as registerablesJS
} from 'chart.js';
import {
    Chart,
    getElementAtEvent,
} from 'react-chartjs-2';


import { getFrequencies } from "./getFrequencies"
ChartJS.register(...registerablesJS);
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

function newData(field, dataset, filter, filterField) {
    var result = getFrequencies(dataset, field, filter, filterField)
    result.datasets[0].backgroundColor = 'rgba(52, 131, 235, 0.9)'

    return result
}

export function StandardChart(props) {
    const chartRef = useRef(null);

    if ((props.dataset !== undefined)) {
        const data = newData(props.field, props.dataset, props.filter, props.filterField)

        const setFilter = (element) => {
            if (!element.length) return;

            const { index } = element[0];

            props.setFilter(data.labels[index], props.field)
        };

        const onClick = (event) => {
            const { current: chart } = chartRef;

            if (!chart) {
                return;
            }

            setFilter(getElementAtEvent(chart, event));


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