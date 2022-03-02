import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Component } from 'react';

import { Container } from 'react-bootstrap';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export var options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom',
        },
        title: {
            display: true,
            text: 'Bar Chart',
        },
    },
};

var labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export var data = {
    labels,
    datasets: [
        {
            label: 'Dataset 1',
            data: labels.map(() => 300),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            label: 'Dataset 2',
            data: labels.map(() => 200),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

class BarChart extends Component {
    render() {
        return (
            <Container fluid="sm">
                <Bar options={options} data={data} />
            </Container>

        );
    }
}

export default BarChart;