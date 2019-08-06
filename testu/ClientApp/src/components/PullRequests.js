import React, { Component } from 'react';
import './default.css';
import { BuildCanvas } from './BuildCanvas';

export class PullRequests extends Component {
    static displayName = PullRequests.name;
    constructor(props) {
        super(props);
        this.state = { data: [], loading: true, displayText: "Loading...", failed: 0, succeeded: 0, minified: false, buttonText: "Hide" };
    }

    componentDidMount() {
        var obj = this.props.id
        let pat = localStorage.getItem("client_Pat")
        fetch(`api/SampleData/ProjectPullRequests/${pat}/${obj}`)
            .then(response => response.json())
            .then(data => {
                if (data.value.length > 0) {
                    this.statistics(data.value)
                    this.setState({
                        data: data.value, loading: false
                    })
                }
                else {
                    this.setState({
                        displayText: "No requests to display"
                    })
                }
            });
    }

    statistics(data) {
        let tempFail = 0;
        for (var i = 0; i < data.length; i++) {
            if (data[i].mergeStatus === "failed")
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
                    <div className="col-md-4"><p>Pullrequests: {data.length}.</p></div>
                    <div className="col-md-4"><p style={{ color: 'green' }}>Succeeded: {sucee}.</p></div>
                    <div className="col-md-4"><p style={{ color: 'red' }}>Failed: {fail}.</p></div>
                </div>
                {minified === false &&
                    <div>
                    <BuildCanvas nums={[ fail, sucee]} type={"Requests"} />

                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Created By</th>
                                    <th>Title</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((project, index) =>
                                    <tr key={index}>
                                        <td>{project.createdBy.displayName}</td>
                                        <td>{project.title}</td>
                                        <td>{project.mergeStatus}</td>
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
            : PullRequests.renderForecastsTable(this.state.data, this.state.failed, this.state.succeeded, this.state.minified);

        return (
            <div>
                <h3>Pull Requests</h3>
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
