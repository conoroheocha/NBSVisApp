import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import CSVReaderCustom from './csv_reader/csv_reader_custom.tsx';
import BarChart from './charts/barchart';

class TabMenu extends Component {
    constructor(props) {
        super(props);

        this.setData = this.setData.bind(this);
        this.state = { data: 100 };
    }


    setData(results) {
        console.log("setting data" + results.data)

        this.setState({ data: this.getFrequencies(results.data, "year") });
    }

    getFrequencies(arr, field) {
        const counts = {};
        var counted = [];
        for (const item of arr) {
            if (item.id_number.trim().length > 0 && !(counted.includes(item.id_number))) {
                counted.push(item.id_number);
                counts[item[field]] = counts[item[field]] ? counts[item[field]] + 1 : 1;
            }
        }
        return counts;
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
                        <BarChart dataset={this.state.data} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default TabMenu;