import React, { Component } from 'react';
import './default.css';
import { BuildCanvas } from './BuildCanvas';


export class BuildList extends Component {
    static displayName = BuildList.name;
    constructor(props) {
        super(props);
        this.state = { builds: [], loading: true, count: 0, displayText: "Loading...", failed: 0, succeeded: 0, minified: false, buttonText: "Hide" };
    }

    componentDidMount() {
        let obj = this.props.id
        let pat = localStorage.getItem("client_Pat")
        fetch(`api/SampleData/ProjectBuilds/${pat}/${obj}`)
            .then(response => response.json())
            .then(data => {
                if (data.count === 0) {
                    this.setState({
                        displayText: 'No builds to display'
                    })
                }
                else {
                    this.statistics(data.value)
                    this.setState({ builds: data.value, loading: false, });
                }
            });
    }

    statistics(data) {
        let tempFail = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].result === "failed")
                tempFail++;
        }
        this.setState({
            failed: tempFail,
            succeeded: data.length - tempFail,
        })
    }

    toggleMinify() {
        const currentState = this.state.minified;
        const lastTextvalue = this.state.buttonText;
        let newValue = "";
        if (lastTextvalue === "Hide") {
            newValue = "Show"
        }
        else {
            newValue = "Hide"
        }
        this.setState({
            minified: !currentState,
            buttonText: newValue,
        })
    }


    static renderForecastsTable(data, fail, sucee, minified) {
        return (
            <div style={style}>
                <div className="row">
                    <div className="col-md-4"><p>Builds: {data.length}.</p></div>
                    <div className="col-md-4"><p style={{ color: 'green' }}>Succeeded: {sucee}.</p></div>
                    <div className="col-md-4"><p style={{ color: 'red' }}>Failed: {fail}.</p></div>
                </div>
                {minified === false &&
                    <div>
                    <BuildCanvas nums={[ fail, sucee]} type={"Builds"} />
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>Build number</th>
                                <th>Result</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((project, index) =>
                                <tr key={index}>
                                    <td>{project.buildNumber}</td>
                                    <td>{project.result}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                }
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>{this.state.displayText}</em></p>
            : BuildList.renderForecastsTable(this.state.builds, this.state.failed, this.state.succeeded, this.state.minified);

        return (
            <div>
                <h3> Build list</h3>
                <p><small id="cursorChange" onClick={() => { this.toggleMinify() }}>{this.state.buttonText}</small></p>
                {contents}
            </div>
        );
    }
}

const style = {
    maxHeight: "500px",
    overflow: "scroll",
    overflowX: "hidden",
}
