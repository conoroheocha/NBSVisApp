import React, { Component } from 'react';
import { Col, Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Compare from './charts/compare';
import Summary from "./charts/summary";
import DataPage from "./dataPage/dataPage";
import MapChart from './charts/mapChart';
import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { sampleData } from './dataPage/sampleData';
import { DataToggle } from './dataPage/dataToggle';

class TabMenu extends Component {
    constructor(props) {
        super(props);

        this.setData = this.setData.bind(this);
        this.useSample = this.useSample.bind(this);
        this.state = { data: [] };
        this.state = { fields: [] };
        this.state = { showDataPage: true }
    }


    setData(results) {
        this.setState({ data: results.data, fields: this.getFields(results.data) });
    }

    useSample(opt) {
        if (opt == "sample") {
            this.setState({ data: sampleData, fields: this.getFields(sampleData), showDataPage: false });
        }
        else {
            this.setState({ data: [], fields: [], showDataPage: true });
        }

    }

    showDataPage(show) {
        if (show) {
            return (<DataPage setData={this.setData} />)
        }
        else {
            return (
                <div>
                    Using Sample Data
                </div>
            )
        }
    }

    getFields(data) {
        try {
            return Object.keys(data[0])
        }
        catch (e) {
            console.log("Can't find data fields, error:", e)
        }
    }

    render() {
        return (
            <Container >
                <Tabs defaultActiveKey="about" id="tabs" className="mb-3">
                    <Tab eventKey="about" title="About">
                        <div>Welcome to NB Dashboard! Use this app to generate
                            visualisations of systematic review metadata from
                            the dedicated Excel Spreadsheet.
                            Choose a file on the Data page to begin.</ div>
                    </Tab>
                    <Tab eventKey="data" title="Data">
                        <Col>
                            <DataToggle useSample={this.useSample} />
                            {this.showDataPage(this.state.showDataPage)}
                        </Col>

                    </Tab>
                    <Tab eventKey="summary" title="Summary">
                        <Summary dataset={this.state.data} fields={this.state.fields} />
                    </Tab>
                    <Tab eventKey="compare" title="Compare">
                        <Compare dataset={this.state.data} fields={this.state.fields} />
                    </Tab>
                    <Tab eventKey="map" title="Map">
                        <MapChart dataset={this.state.data} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default TabMenu;