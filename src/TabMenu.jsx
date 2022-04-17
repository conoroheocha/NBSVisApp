import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Dashboard from './charts/dashboard';
import Summary from "./charts/summary";
import DataPage from "./dataPage/dataPage";
import MapChart from './charts/mapChart';

import 'leaflet/dist/leaflet.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class TabMenu extends Component {
    constructor(props) {
        super(props);

        this.setData = this.setData.bind(this);
        this.state = { data: [] };

        this.state = { fields: [] };
    }


    setData(results) {
        this.setState({ data: results.data, fields: this.getFields(results.data) });
    }

    getFields(data) {
        return Object.keys(data[0])
    }

    render() {
        return (
            <Container >
                <Tabs defaultActiveKey="about" id="tabs" className="mb-3">
                    <Tab eventKey="about" title="About">
                        <div>Instructions on how to use the app</ div>
                    </Tab>
                    <Tab eventKey="data" title="Data">
                        <DataPage setData={this.setData} />
                    </Tab>
                    <Tab eventKey="summary" title="Summary">
                        <Summary dataset={this.state.data} fields={this.state.fields} />
                    </Tab>
                    <Tab eventKey="visualise" title="Visualise">
                        <Dashboard dataset={this.state.data} fields={this.state.fields} />
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