import React, { Component } from 'react';
import { Pie } from 'react-chartjs-2';


export class BuildCanvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataFromProps: this.props.nums,
            chartData: {
                labels: ['Failed ' + this.props.type, 'Successful ' + this.props.type],
                datasets: [
                    {
                        data: this.props.nums,

                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(75, 255, 100, 0.6)',
                        ]
                    }
                ]
            },
        }
    }

    render() {
        return (
            <div className="chart">
                <Pie
                    data={this.state.chartData}
                    width={100}
                    height={150}
                    options={{
                        maintainAspectRatio: false,
                        legend: {
                            display: false,
                        }
                    }} />
            </div>
        );
    }
}

export default BuildCanvas;