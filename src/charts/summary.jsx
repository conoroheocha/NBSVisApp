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
import React, { Component } from 'react';

import { Container, Row, Col } from 'react-bootstrap';

import MapChart from "./mapChart";
import { StandardChart } from './standardChart';

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
    attemptChart(title, field, type) {
        if (this.props.dataset != null) {
            try {
                return (
                    <StandardChart dataset={this.props.dataset} field={field} type={type} />
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
                                {this.attemptChart("Indicator", "indicator", "bar")}
                            </Col>
                            <Col>
                                {this.attemptChart("Sub-indicator", "sub_indicator", "bar")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Country", "country", "bar")}
                            </Col>
                            <Col>
                                <MapChart dataset={this.props.dataset} />
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Year", "year", "line")}
                            </Col>
                            <Col>
                                {this.attemptChart("Study Duration", "study_duration", "bar")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("NBS Type", "nbs_type", "bar")}
                            </Col>
                            <Col>
                                {this.attemptChart("NBS Setting", "nbs_setting", "bar")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Study Type", "study_type", "bar")}
                            </Col>
                            <Col>
                                {this.attemptChart("NBS Scale", "nbs_scale", "bar")}
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