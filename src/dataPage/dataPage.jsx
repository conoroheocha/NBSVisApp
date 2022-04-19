import React, { Component } from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import CSVReader from './csvReader.tsx';
import DownloadButton from "./downloadButton";
import { Button } from 'react-bootstrap';

class DataPage extends Component {
    render() {
        return (
            <Col>
                <Row>
                    <Col>
                        <div
                            style={{ display: "flex", justifyContent: "center" }}>
                            <DownloadButton text="Download Sample CSV" />
                        </div>
                    </Col>
                    <Col>
                        <div
                            style={{ display: "flex", justifyContent: "center" }}>
                            <Button variant="primary" size="lg" href="https://docs.google.com/spreadsheets/d/1_d3GDCLFEyPaKe9i6q16CiZa-_cpQteN/edit?usp=sharing&ouid=114534175757960679410&rtpof=true&sd=true" >
                                Download Excel Dataset
                            </Button >
                        </div>
                    </Col>
                </Row >
                <Row>
                    <div >Download one of the above Datasets to get the right data format or just set the toggle to use Sample Data.
                        The Sample CSV can be reuploaded as is or the Excel dataset can be used to make additions (you'll need to download and save it as a CSV in Excel before reuploading).</div>
                </Row>
                <Row>
                    <CSVReader setData={this.props.setData} />
                </Row>
            </Col >
        )
    }
}

export default DataPage

//https://docs.google.com/spreadsheets/d/1_d3GDCLFEyPaKe9i6q16CiZa-_cpQteN/edit?usp=sharing&ouid=114534175757960679410&rtpof=true&sd=true