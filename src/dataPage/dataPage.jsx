import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import CSVReader from './csvReader.tsx';
import DownloadButton from "./downloadButton";

class DataPage extends Component {
    render() {
        return (
            <Col>
                <Row>
                    <Col>
                        <DownloadButton text="Download Sample CSV" />
                    </Col>
                    {/* <Col>
                        <DownloadButton text="Download Excel Dataset" />
                    </Col> */}
                </Row>
                <Row>
                    <div >Download one of the above Datasets to get the right data format.
                        The Sample CSV can be used as is or the Excel dataset can be used to make additons (you'll need to save it as a CSV to reupload).</div>
                </Row>
                <Row>
                    <CSVReader setData={this.props.setData} />
                </Row>
            </Col>
        )
    }
}

export default DataPage