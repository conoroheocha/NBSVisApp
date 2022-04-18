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


    attemptChart(title, field, type) {

        if (this.props.dataset != null) {
            try {
                return (
                    <StandardChart dataset={this.props.dataset} field={field}
                        type={type} filter={this.state.filter} filterField={this.state.filterField} setFilter={this.setFilter} />
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
                            <Col>
                                {this.attemptChart("Country", "country", "bar")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("Year", "year", "line")}
                            </Col>
                            <Col>
                                {this.attemptChart("Study Duration", "study_duration", "bar")}
                            </Col>
                            <Col>
                                {this.attemptChart("NBS Type", "nbs_type", "bar")}
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                {this.attemptChart("NBS Setting", "nbs_setting", "bar")}
                            </Col>
                            <Col>
                                {this.attemptChart("Study Type", "study_type", "bar")}
                            </Col>
                            <Col>
                                {this.attemptChart("NBS Scale", "nbs_scale", "bar")}
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