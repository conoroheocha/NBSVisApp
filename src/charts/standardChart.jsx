import React, { useRef } from 'react';
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

function newChart(title) {
    const formattedTitle = title.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('_').replaceAll('_', " ");

    return {
        responsive: true,
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: true,
                text: formattedTitle
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Frequency"
                },
            },
        },
    };
}

function newData(field, dataset, colour) {
    var result = getFrequencies(dataset, field)
    result.datasets[0].backgroundColor = colour

    return result
}

export function StandardChart(props) {
    const chartRef = useRef(null);

    if ((props.dataset !== undefined)) {
        const data = newData(props.field, props.dataset, props.colour)

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