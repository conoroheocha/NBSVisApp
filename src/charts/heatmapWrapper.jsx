import { Component } from "react";

import { Col } from 'react-bootstrap';
import HeatMap from "react-heatmap-grid";


class HeatmapWrapper extends Component {
    render() {
        if (this.props.show) {
            return (
                <Col style={{ marginTop: 50 }}>
                    <HeatMap xLabels={this.props.xLabels} yLabels={this.props.yLabels}
                        data={this.props.data} background='rgba(86, 125, 70, 1)'
                        xLabelsLocation="bottom" />
                </Col>
            )
        }
        else {
            return (
                <Col>
                    <div>Please select some fields</div>
                </Col>)
        }
    }
}

export default HeatmapWrapper