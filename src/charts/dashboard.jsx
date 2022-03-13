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
import MapChart from "./geo"

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

var yearOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Publication Year',
        },
    },
};

var indicatorOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
            text: 'Indicator Type',
        },
    },
};


function getFrequencies(arr, field) {
    const counts = {};
    var counted = [];
    for (const item of arr) {
        if (item.id_number.trim().length > 0 && !(counted.includes(item.id_number))) {
            counted.push(item.id_number);
            counts[item[field]] = counts[item[field]] ? counts[item[field]] + 1 : 1;
        }
    }
    return counts;
}

class Dashboard extends Component {


    render() {
        console.log("hello")
        console.log(this.props.dataset)
        var yearData = {
            // labels,
            datasets: [
                {
                    data: getFrequencies(this.props.dataset, "year"),
                    backgroundColor: 'rgba(99, 132, 255, 0.75)',
                }
            ],
        }

        var indicatorData = {
            // labels,
            datasets: [
                {
                    data: getFrequencies(this.props.dataset, "indicator"),
                    backgroundColor: 'rgba(132, 99, 255, 0.75)',
                }
            ],
        }

        return (
            <Container fluid="sm">
                <Col>
                    <Row>
                        <Col>
                            <Line options={yearOptions} data={yearData} />
                        </Col>
                        <Col>
                            <Bar options={indicatorOptions} data={indicatorData} />
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <MapChart countryFreq={getFrequencies(this.props.dataset, "country")} />
                        </Col>
                    </Row>
                </Col>

            </Container>
        );
    }
}

export default Dashboard;