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
import { getFrequencies } from "./getFrequencies"

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

class Summary extends Component {


    newChart(title) {
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
            },
        };
    }

    newData(field) {
        return {
            datasets: [{
                data: getFrequencies(this.props.dataset, field),
                backgroundColor: 'rgba(86, 125, 70, 0.9)'
            }]
        }

    }

    attemptChart(title, field) {
        if (this.newData(field).datasets[0].data != null) {
            try {
                return (
                    <Bar options={this.newChart(title)} data={this.newData(field)} />
                )
            } catch (error) {
                console.log(title + " Chart error")
            }
        }
        return (
            <div>{title} Chart could not be displayed, maybe the {field} field isn't in the CSV?</div>
        )
    }

    render() {
        if (!(this.props.fields === undefined || this.props.fields == 0)) {
            return (
                <Container fluid>
                    <Col>
                        <Row>
                            <Col>
                                {this.attemptChart("Indicator", "indicator")}
                            </Col>
                            <Col>
                                {this.attemptChart("Sub-indicator", "sub_indicator")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Country", "country")}
                            </Col>
                            <Col>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Year", "year")}
                            </Col>
                            <Col>
                                {this.attemptChart("Study Duration", "study_duration")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("NBS Type", "nbs_type")}
                            </Col>
                            <Col>
                                {this.attemptChart("NBS Setting", "nbs_setting")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Study Type", "study_type")}
                            </Col>
                            <Col>
                                {this.attemptChart("NBS Scale", "nbs_scale")}
                            </Col>
                        </Row>
                    </Col>
                </Container>
            );
        }
        return (<div>No Data Yet!</div>);
    }
}

export default Summary;