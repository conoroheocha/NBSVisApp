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

import { StandardChart } from './standardChart';

import { Button } from 'react-bootstrap';

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
    constructor(props) {
        super(props);

        this.setFilter = this.setFilter.bind(this);
        this.state = { filter: null, filterField: null };
    }


    setFilter(filter, filterField) {
        this.setState({ filter: filter, filterField: filterField });
    }


    attemptChart(title, field, type, colour) {

        if (this.props.dataset != null) {
            try {
                return (
                    <StandardChart dataset={this.props.dataset} field={field}
                        type={type} filter={this.state.filter} filterField={this.state.filterField}
                        setFilter={this.setFilter} colour={colour} />
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
        const colours = {
            yellow: "rgba(253,192,16, 0.9)",
            lightGreen: "rgba(139,195,74, 0.9)",
            darkGreen: "rgba(67,160,71, 0.9)",
            darkBlue: "rgba(0,150,136, 0.9)",
            lightBlue: "rgba(9,188,211, 0.9)",
        }
        if (!(this.props.fields === undefined || this.props.fields == 0)) {
            return (
                <Container fluid>
                    <Col>
                        <Row>
                            <div>Click on an element to filter</div>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Indicator", "indicator", "bar", colours.lightBlue)}
                            </Col>
                            <Col>
                                {this.attemptChart("Sub-indicator", "sub_indicator", "bar", colours.yellow)}
                            </Col>
                            <Col>
                                {this.attemptChart("Country", "country", "bar", colours.darkGreen)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Year", "year", "line", colours.yellow)}
                            </Col>
                            <Col>
                                {this.attemptChart("Study Duration", "study_duration", "bar", colours.darkBlue)}
                            </Col>
                            <Col>
                                {this.attemptChart("NBS Type", "nbs_type", "bar", colours.lightGreen)}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("NBS Setting", "nbs_setting", "bar", colours.lightBlue)}
                            </Col>
                            <Col>
                                {this.attemptChart("Study Type", "study_type", "bar", colours.darkGreen)}
                            </Col>
                            <Col>
                                {this.attemptChart("NBS Scale", "nbs_scale", "bar", colours.darkBlue)}
                            </Col>
                        </Row>
                        <Row>
                            <Button variant="primary" size="lg" onClick={() => {
                                this.setState({ filter: null, filterField: null })
                            }
                            } >
                                Remove Filter
                            </Button >
                        </Row>
                    </Col>
                </Container>
            );
        }
        return (<div>No Data Yet!</div>);
    }
}

export default Summary;