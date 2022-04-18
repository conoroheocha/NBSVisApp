import react, { Component } from "react";

import { Container, Row, Col } from 'react-bootstrap';

import { Bar, Line, Scatter } from 'react-chartjs-2';

import HeatmapWrapper from "./heatmapWrapper";
import MapChart from "./mapChart"

import Select from 'react-select';
import { getTwoFrequencies } from "./getTwoFrequencies"

function populateDropdownOptions(fields) {
    for (const field of fields) {
        searchFields.push({ value: field, label: field })
    }
}

var searchFields = [
];

class Compare extends Component {

    state = {
        selectedOptionX: { value: null, label: "sub_indicator" },
        selectedOptionY: { value: null, label: "indicator" },
    }

    setFieldX = (selectedOptionX) => {
        this.setState({ selectedOptionX }, () =>
            console.log(`Option selected:`, this.state.selectedOptionX)
        );
    };

    setFieldY = (selectedOptionY) => {
        this.setState({ selectedOptionY }, () =>
            console.log(`Option selected:`, this.state.selectedOptionY)
        );
    };

    render() {
        const { selectedOptionX } = this.state;
        const { selectedOptionY } = this.state;
        if (!(this.props.fields === undefined || this.props.fields == 0)) {
            populateDropdownOptions(this.props.fields);
            const formattedData = getTwoFrequencies(this.props.dataset, selectedOptionY.label, selectedOptionX.label)
            const yLabels = formattedData.fieldXLabels
            const xLabels = formattedData.fieldYLabels
            const data = formattedData.finalCounts

            return (
                <Col>
                    <Row>
                        <Col>
                            <div>X-Axis</div>
                            <Select options={searchFields} value={selectedOptionX} onChange={this.setFieldX} />
                        </Col>
                        <Col>
                            <div>Y-Axis</div>
                            <Select options={searchFields} value={selectedOptionY} onChange={this.setFieldY} />
                        </Col>
                    </Row>
                    <Row>
                        <Container fluid>
                            <HeatmapWrapper xLabels={xLabels} yLabels={yLabels} data={data} show={true} />
                        </Container>
                    </Row>
                </Col>

            );
        }
        return (<div>No Data Yet!</div>);
    }
}

export default Compare