import React, { Component } from 'react';
import { Col, Row, Container, Button, ListGroupItem } from 'react-bootstrap';
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
import { filterData } from './charts/filterData';
import Stacked from './charts/stacked';
import ListGroup from 'react-bootstrap/ListGroup';
import Accordion from 'react-bootstrap/Accordion';

class TabMenu extends Component {
    constructor(props) {
        super(props);

        this.setData = this.setCustomData.bind(this);
        this.useSample = this.useSample.bind(this);
        this.state = {
            data: [],
            filter: {
                include: [],
                exclude: []
            },
            filteredData: [], fields: [],
            showDataPage: true
        }
        this.setOverallFilter = this.setOverallFilter.bind(this);
    }

    setOverallFilter(filter, filterField) {
        this.setState({
            filter: {
                include: [...this.state.filter.include, { [filterField]: filter }],
                exclude: []
            },
        },
            this.updateData
        )
    }

    updateData() {
        this.setState({ filteredData: this.filter(this.state.data) });
    }

    setCustomData(results) {
        this.setState({ data: results.data, fields: this.getFields(results.data) });
        this.setFilteredData(results.data)
    }

    setFilteredData(data) {
        this.setState({ filteredData: this.filter(data) });
    }

    filter(data) {
        return filterData(data, this.state.filter)
    }

    useSample(opt) {
        if (opt == "sample") {
            this.setState({ data: sampleData, fields: this.getFields(sampleData), showDataPage: false });
            this.setFilteredData(sampleData)
        }
        else {
            this.setState({ data: [], fields: [], showDataPage: true });
        }
    }

    showDataPage(show) {
        if (show) {
            return (<DataPage setData={this.setCustomData} />)
        }
        else {
            return (
                <h3>
                    Using Sample Data
                </h3>
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

    //TODO make it so that only fields with repeated categories appear
    showFilter() {
        if (!(this.state.fields === undefined || this.state.fields == 0)) {
            // return (<ListGroup>
            //     {this.getFields(this.state.data).map((e, i) =>
            //         <ListGroupItem key={i}>

            //             <Accordion flush>
            //                 <Accordion.Item eventKey={i}>
            //                     <Accordion.Header>{e.split('_').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join('_').replaceAll('_', " ")}</Accordion.Header>
            //                     <Accordion.Body>
            //                         {this.state.filteredData[0][i]}
            //                     </Accordion.Body>
            //                 </Accordion.Item>
            //             </Accordion>

            //         </ListGroupItem>)}
            // </ListGroup>)
        }
    }



    render() {
        return (
            <Row>
                <Col xs={6} sm={4} md={2}>
                    <Row>
                        <h1>
                            Filters
                        </h1>
                    </Row>
                    <Row>
                        <Container>

                            {this.showFilter()}

                        </Container>
                    </Row>
                    <Row>
                        <Button variant="primary" size="sm" onClick={() => {
                            this.setState({ filteredData: this.state.data })
                        }
                        } >
                            Remove Filter
                        </Button >
                    </Row>
                </Col>
                <Col xs={6} sm={8} md={10}>
                    <Container >
                        <Tabs defaultActiveKey="about" id="tabs" className="mb-3">
                            <Tab eventKey="about" title="About">
                                <h6>Welcome to NB Dashboard! Use this app to generate
                                    visualisations of systematic review metadata from
                                    the dedicated Excel Spreadsheet.
                                    Choose a file on the Data page to begin.</ h6>
                            </Tab>
                            <Tab eventKey="data" title="Data">
                                <Col>
                                    <DataToggle useSample={this.useSample} />
                                    {this.showDataPage(this.state.showDataPage)}
                                </Col>

                            </Tab>
                            <Tab eventKey="summary" title="Summary">
                                <Summary dataset={this.state.filteredData} fields={this.state.fields} setOverallFilter={this.setOverallFilter} />
                            </Tab>
                            <Tab eventKey="stacked" title="Indicator Breakdown">
                                <Stacked dataset={this.state.filteredData} fields={this.state.fields} />
                            </Tab>
                            <Tab eventKey="compare" title="Compare Fields">
                                <Compare dataset={this.state.filteredData} fields={this.state.fields} />
                            </Tab>
                            <Tab eventKey="map" title="Map">
                                <MapChart dataset={this.state.filteredData} />
                            </Tab>
                        </Tabs>
                    </Container>
                </Col>
            </Row>
        );
    }
}

export default TabMenu;