import React, { Component } from "react";
import {
    ComposableMap,
    Geographies,
    Geography,
    Marker
} from "react-simple-maps";
import { getCoordinates } from "./getCoordinates";

const geoUrl =
    "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";



class MapChart extends Component {
    render() {


        if (!(this.props.dataset === undefined || this.props.dataset == null)) {
            const markers = getCoordinates(this.props.dataset);
            return (
                <ComposableMap>
                    <Geographies geography={geoUrl}>
                        {({ geographies }) =>
                            geographies
                                .map(geo => (
                                    <Geography
                                        key={geo.rsmKey}
                                        geography={geo}
                                        fill="#EAEAEC"
                                        stroke="#D6D6DA"
                                    />
                                ))
                        }
                    </Geographies>
                    {markers.map(({ id, coordinates }) => (
                        <Marker key={id} coordinates={coordinates}>
                            <g
                                fill="#3483eb"
                                stroke="3483eb"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle r="3" />
                            </g>
                        </Marker>
                    ))}
                </ComposableMap>
            );

        }
        return (<div>No Data Yet!</div>);
    }
};

export default MapChart;
