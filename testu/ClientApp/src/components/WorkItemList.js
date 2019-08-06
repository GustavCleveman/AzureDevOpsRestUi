import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class WorkItemList extends Component {
    static displayName = WorkItemList.name;
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            data: [],
            minified: false,
            message: "Loading...",
            buttonText: "Hide"
        }
    }

    componentDidMount() {

        var projId = this.props.projId;
        var teamId = this.props.teamId;
        var projName = this.props.projName;
        const pat = localStorage.getItem("client_Pat")
        fetch(`api/SampleData/ProjectWorkItems/${pat}/${projId}/${teamId}/${projName}`)
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    this.setState({
                        message: "No work items to display..",
                    })
                }
                else {
                    this.setState({
                        data,
                        loading: false
                    })
                }
            })
            .catch(err => console.log(err));
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

    static renderForecastsTable(data, minified) {
        return (
            <div style={style}>
                {minified === false &&
                    <ul>
                    {data.map((task, index) =>
                        <li key={index}> Task {task.id}.<Link  to={{
                                pathname: '/task',
                                idProps: {
                                    id: task.id,
                                }
                            }}> More </Link>
                            </li>
                        )}
                    </ul>
                }
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>{this.state.message}</em></p>
            : WorkItemList.renderForecastsTable(this.state.data, this.state.minified);

        return (
            <div>
                <h3>Work items</h3>
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
