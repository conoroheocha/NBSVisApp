import { Component } from "react";
import { Container } from 'react-bootstrap';

import {
    Chart as ChartJS,
    registerables as registerablesJS
} from 'chart.js';
import {
    Chart
} from 'react-chartjs-2';

import { getTwoFrequencies } from "./getTwoFrequencies"

ChartJS.register(...registerablesJS);


class Stacked extends Component {
    render() {
        if (this.props.dataset != undefined && this.props.dataset.length != 0) {
            const data = sortData(this.props.dataset)

            return (
                <Container fluid={true}><Chart type="bar" data={data} /></Container>

            )
        }
        else {
            return (
                <div>No Data Yet!</div>
            )
        }
    }
}

function sortData(dataset) {
    const colours = [
        'rgba(230, 25, 75, 0.8)', 'rgba(60, 180, 75, 0.8)', 'rgba(255, 225, 25, 0.8)',
        'rgba(0, 130, 200, 0.8)', 'rgba(245, 130, 48, 0.8)', 'rgba(145, 30, 180, 0.8)',
        'rgba(70, 240, 240, 0.8)', 'rgba(240, 50, 230, 0.8)', 'rgba(210, 245, 60, 0.8)',
        'rgba(250, 190, 212, 0.8)', 'rgba(0, 128, 128, 0.8)', 'rgba(220, 190, 255, 0.8)',
        'rgba(170, 110, 40, 0.8)', 'rgba(255, 250, 200, 0.8)', 'rgba(128, 0, 0, 0.8)', 'rgba(170, 255, 195, 0.8)',
        'rgba(128, 128, 0, 0.8)', 'rgba(255, 215, 180, 0.8)', 'rgba(0, 0, 128, 0.8)', 'rgba(128, 128, 128, 0.8)'
    ]
    let data = {
        labels: [],
        datasets: []
    }

    let unParsedData = getTwoFrequencies(dataset, "indicator", "sub_indicator");
    data.labels = unParsedData.fieldXLabels;


    const subs = unParsedData.fieldYLabels
    for (const i in subs) {
        let arr = []
        for (const j in unParsedData.fieldXLabels) {
            arr.push(unParsedData.finalCounts[j][i])
        }
        data.datasets.push({
            stack: "stack", label: subs[i],
            data: arr, backgroundColor: colours[i % colours.length]
        })
    }
    return data
}

export default Stacked