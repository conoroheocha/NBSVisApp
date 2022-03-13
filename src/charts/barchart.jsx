import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
} from 'chart.js';
import { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import { Bar, Line, Scatter } from 'react-chartjs-2';

import '../data/data.tsx';

// import * as ChartGeo from 'chartjs-chart-geo';
import DoughnutChart from "./xchart"

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement
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

var labels = ['2018', '2020'];

export var dataEx = {
    labels,
    datasets: [
        {
            data: labels.map(() => 300),
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
        },
        {
            data: labels.map(() => 200),
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
    ],
};

class BarChart extends Component {

    render() {
        console.log("hello")
        console.log(this.props.dataset)
        var data = {
            // labels,
            datasets: [
                {
                    data: this.props.dataset,
                    backgroundColor: 'rgba(99, 132, 255, 0.75)',
                }
            ],
        }

        return (
            <Container fluid="sm">
                <Col>
                    <Row>
                        <Col>
                            <Bar options={options} data={data} />
                        </Col>
                        <Col>
                            <Scatter options={options} data={data} />
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Line options={options} data={data} />
                        </Col>
                        <Col>
                            {/* <DoughnutChart data={data}
                                title={"hello"}
                                colors={['#a8e0ff', '#8ee3f5', '#70cad1', '#3e517a', '#b08ea2', '#BBB6DF']} /> */}
                        </Col>
                    </Row>
                </Col>

            </Container>
        );
    }
}

export default BarChart;