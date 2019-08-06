import React, { Component } from 'react';
import { CommitList } from './CommitLIst';
import './default.css';

export class RepoList extends Component {
    static displayName = RepoList.name;
    constructor(props) {
        super(props);
        this.state = { repos: [], loading: true, displayText: "Loading...", minified: false, buttonText: "Hide" };
    }

    componentDidMount() {
        let obj = this.props.id
        let pat = localStorage.getItem("client_Pat")

        fetch(`api/SampleData/ProjectRepos/${pat}/${obj}`)
            .then(response => response.json())
            .then(data => {
                if (data.count === 0) {
                    this.setState({
                        displayText: 'No repos to display..'
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
                                    <th>Repo Name</th>
                                    <th>Defualt Branch</th>
                                    <th>Commits</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((repo, index) =>
                                    <tr key={index}>
                                        <td>{repo.name}</td>
                                        <td>{repo.defaultBranch}</td>
                                        <CommitList repoId={repo.id} projId={projId} />
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
            : RepoList.renderForecastsTable(this.state.repos, this.state.minified, this.props.id);

        return (
            <div>
                <h3>Project repos</h3>
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