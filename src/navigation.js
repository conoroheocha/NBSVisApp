import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar'
import { Container, Row } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab'
import CSVReader from './csv_reader/csv_reader.tsx';
import BarChart from './charts/barchart';

export default function Navigation() {
    const pathname = window.location.pathname;
    return (
        <Row noGutters>
            <Container fluid>
                <div>
                    <Navbar bg="dark" variant="dark" expand="lg">
                        <Container>
                            <Navbar.Brand href="#home">Visualisation App</Navbar.Brand>
                            <Nav defaultActiveKey="/" activeKey={pathname}>
                                <Nav.Item>
                                    <Nav.Link href="/">Home</Nav.Link>
                                </Nav.Item>
                                <Nav.Link href="https://github.com/conoroheocha/NBSVisApp">Github</Nav.Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div >
                <Container >
                    <Tabs defaultActiveKey="about" id="tabs" className="mb-3">
                        <Tab eventKey="about" title="About">
                            <div>Instructions on how to use the app</ div>
                        </Tab>
                        <Tab eventKey="data" title="Data">
                            <CSVReader />
                        </Tab>
                        <Tab eventKey="visualise" title="Visualise">
                            <BarChart />
                        </Tab>
                    </Tabs>
                </Container>
            </Container>
        </Row>
    )
}