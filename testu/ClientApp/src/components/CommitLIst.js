import React, { Component } from 'react';
import './default.css';

export class CommitList extends Component {
    static displayName = CommitList.name;
    constructor(props) {
        super(props);
        this.state = { commits: [], loading: true, displayText: "Loading...", minified: true, buttonText: "Show" };
    }

    componentDidMount() {
        let repoId = this.props.repoId
        let projId = this.props.projId
        const pat = localStorage.getItem("client_Pat")
        fetch(`api/SampleData/RepoCommits/${pat}/${projId}/${repoId}`)
            .then(response => response.json())
            .then(data => {
                if (data.count === 0) {
                    this.setState({
                        displayText: 'No commits to display..'
                    })
                }
                else {
                    this.setState({ commits: data.value, loading: false, });
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

    static renderForecastsTable(data, minified) {
        return (
            <div>
                {minified === false &&
                    <div>
                        <ol>
                            {data.map((commit) =>
                                <li>{commit.comment}</li>,
                            )}
                        </ol>
                    </div>
                }
            </div >
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>{this.state.displayText}</em></p>
            : CommitList.renderForecastsTable(this.state.commits, this.state.minified);

        return (
            <div>
                <p><small id="cursorChange" onClick={() => { this.toggleMinify() }}>{this.state.buttonText}</small></p>
                {contents}
            </div>
        );
    }
}
