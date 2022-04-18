// const xLabels = new Array(24).fill(0).map((_, i) => `${i}`);
// const yLabels = ["Sun", "Mon", "Tue"];
// const data = new Array(yLabels.length)
//     .fill(0)
//     .map(() =>
//         new Array(xLabels.length).fill(0).map(() => Math.floor(Math.random() * 100))
//     );

import react, { Component } from "react";
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

import { Container, Row, Col } from 'react-bootstrap';

import { Bar, Line, Scatter } from 'react-chartjs-2';

import HeatMap from "react-heatmap-grid"
import MapChart from "./mapChart"

import Select from 'react-select';
import { getTwoFrequencies } from "./getTwoFrequencies"


// const xLabels = ["Urban", "Agricultural", "Coastal", "Inland Water"]
// const yLabels = ["Micro", "Meso", "Macro"];
// const data = [[1, 2, 3, 4], [1, 2, 3, 4], [1, 2, 3, 4]];

class Compare extends Component {
    render() {
        if (!(this.props.fields === undefined || this.props.fields == 0)) {
            const formattedData = getTwoFrequencies(this.props.dataset, "indicator", "sub_indicator")
            const yLabels = formattedData.fieldXLabels

            console.log(formattedData.fieldYLabels)
            console.log(formattedData.finalCounts)
            const xLabels = formattedData.fieldYLabels
            const data = formattedData.finalCounts

            console.log(formattedData.fieldXLabels)
            console.log(formattedData.fieldYLabels)
            console.log(formattedData.finalCounts)
            return (
                <Container fluid>
                    <HeatMap xLabels={xLabels} yLabels={yLabels} data={data} />
                </Container>
            );
        }
        return (<div>No Data Yet!</div>);
    }
}

export default Compare