import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CSVReaderCustom from './csv_reader/csv_reader_custom.tsx';
import Dashboard from './charts/dashboard';

class TabMenu extends Component {
    constructor(props) {
        super(props);

        this.setData = this.setData.bind(this);
        this.state = { data: [] };
    }


    setData(results) {
        console.log("setting data" + results.data)

        this.setState({ data: results.data });
    }

    render() {
        return (
            <Container >
                <Tabs defaultActiveKey="about" id="tabs" className="mb-3">
                    <Tab eventKey="about" title="About">
                        <div>Instructions on how to use the app</ div>
                    </Tab>
                    <Tab eventKey="data" title="Data">
                        <CSVReaderCustom setData={this.setData} />
                    </Tab>
                    <Tab eventKey="visualise" title="Visualise">
                        <Dashboard dataset={this.state.data} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default TabMenu;