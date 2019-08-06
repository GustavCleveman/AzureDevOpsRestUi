import React, { Component } from 'react';
import { CommitList } from './CommitLIst';
import './default.css';

export class TestRunList extends Component {
    static displayName = TestRunList.name;
    constructor(props) {
        super(props);
        this.state = { repos: [], loading: true, displayText: "Loading...", minified: false, buttonText: "Hide" };
    }

    componentDidMount() {
        let obj = this.props.id
        let pat = localStorage.getItem("client_Pat")
        
        fetch(`api/SampleData/ProjectTestRuns/${pat}/${obj}`)
            .then(response => response.json())
            .then(data => {
                if (data.count === 0) {
                    this.setState({
                        displayText: 'No tests to display..'
                    })
                }
                else {
                    this.setState({ repos: data.value, loading: false, });
                }
            });
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


    static renderForecastsTable(data, minified, projId) {
        return (
            <div style={style} >
                    {minified === false &&
                        <table className='table table-striped'>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>State</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((repo, index) =>
                                    <tr key={index}>
                                        <td>{repo.name}</td>
                                        <td>{repo.state}</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    }
            </div >
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>{this.state.displayText}</em></p>
            : TestRunList.renderForecastsTable(this.state.repos, this.state.minified, this.props.id);

        return (
            <div>
                <h3>Test runs</h3>
                <p><small id="cursorChange" onClick={() => { this.toggleMinify() }}>{this.state.buttonText}</small></p>
                {contents}
            </div>
        );
    }
}

const style = {
    maxHeight: "325px",
    overflow: "scroll",
    overflowX: "hidden",
}