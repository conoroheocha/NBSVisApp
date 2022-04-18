import React, { Component } from 'react';
import { saveAs } from 'file-saver';
import { Button } from 'react-bootstrap';

async function fetchCSV() {
    const response = await fetch('data/SampleCSV.csv');
    const reader = response.body.getReader();
    const result = await reader.read();
    const decoder = new TextDecoder('utf-8');
    const csv = await decoder.decode(result.value);
    return csv;
}

class DownloadButton extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        fetchCSV().then((response) => this.setState({ csv: response }))
    }


    render() {


        if (this.state.csv != null) {
            const blob = new Blob([this.state.csv], { type: "text/csv;charset=utf-8" });
            return (

                <Button variant="primary" size="lg" onClick={() => {
                    saveAs(
                        blob,
                        "SampleCSV.csv"
                    );
                }
                } >
                    {this.props.text}
                </Button >

            )
        }
        return null
    }
}

export default DownloadButton
