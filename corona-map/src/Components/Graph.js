import React, { Component } from 'react';
import Chart from 'react-google-charts';
import '../App.css';

export default class Graph extends Component { 
    constructor(){
        super();

    }
    render() {
        const [ width, height ] = [ 400, 300 ];
        let { name, chartType, data } = this.props;

        return (
            <div className="card">
                <div className="name">{ name }</div>
                <div className="graph">
                    <Chart 
                    width={ width }
                    height={ height }
                    chartType={chartType}
                    loader={<div>Loading Chart</div>}
                    data={ data }
                    options={{
                        title={ name },
                        chartArea: { width: '30%' },
                    }}
                    />
                </div>
            </div>
        )
    }
}