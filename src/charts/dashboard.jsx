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

import HeatMap from "react-heatmap-grid"
import MapChart from "./mapChart"

import Select from 'react-select';

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

var barChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false
        },
        title: {
            display: true,
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


const xLabels = ["Urban", "Agricultural", "Coastal", "Inland Water"]
const yLabels = ["Micro", "Meso", "Macro"];
const data = new Array(yLabels.length)
    .fill(0)
    .map(() =>
        new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
    );



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

function populateDropdownOptions(fields) {
    for (const field of fields) {
        searchFields.push({ value: field, label: field })
    }
}

var searchFields = [
];

class Dashboard extends Component {

    state = {
        selectedOption: { value: null, label: null }
    }

    setField = (selectedOption) => {
        this.setState({ selectedOption }, () =>
            console.log(`Option selected:`, this.state.selectedOption)
        );
    };

    render() {
        const { selectedOption } = this.state;

        if (!(this.props.fields === undefined || this.props.fields == 0)) {
            populateDropdownOptions(this.props.fields);
            barChartOptions.plugins.title.text = this.field;
            var barData = {
                // labels,
                datasets: [
                    {
                        data: getFrequencies(this.props.dataset, selectedOption.label),
                        backgroundColor: 'rgba(99, 132, 255, 0.75)',
                    }
                ],
            }

            var mapData = {
                // labels,
                datasets: [
                    {
                        data: getFrequencies(this.props.dataset, "country"),
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
                <Container fluid>
                    <Col>
                        <Row>
                            <Col>
                                <Select options={searchFields} value={selectedOption} onChange={this.setField} />
                                <Bar options={barChartOptions} data={barData} />
                            </Col>
                            <Col>
                                <Select options={searchFields} value={selectedOption} onChange={this.setField} />
                                <Bar options={barChartOptions} data={barData} />
                            </Col>
                        </Row>
                        {/* <Row>
                            <Col>
                                <MapChart countryFreq={mapData} />
                            </Col>
                        </Row> */}
                        <Row>
                            <Col>
                                <h2>Heatmap</h2>
                                <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
                            </Col>
                        </Row>
                    </Col>

                </Container>
            );
        }
        return null;
    }
}

export default Dashboard;