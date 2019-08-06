import React, { Component } from 'react';
import { WorkItemList } from './WorkItemList';
import { RepoList } from './RepoList';

export class ProjectSpecs extends Component {
    static displayName = ProjectSpecs.name;
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.id,
            data: [],
            loading: true
        }
    }
    componentDidMount() {

        var obj = this.state.id
        let pat = localStorage.getItem("client_Pat")
        fetch(`api/SampleData/Project/${pat}/${obj}`)
            .then(response => response.json())
            .then(data => {
                this.setState({ data, loading: false });
            });
    }

    static renderForecastsTable(data) {
        return (
            <div >
                <h3><small>General info:</small></h3>
                <p>
                    <b>Id: </b> {data.id}<br />
                    <b>Name: </b> {data.name}<br />
                    <b>Description: </b> {data.description}<br />
                    <b>State: </b> {data.state}<br />
                    <b>Url: </b><a href={data.url}>{data.url}</a><br />
                    <b>State: </b> {data.state}<br />
                    <b>Revision: </b> {data.revision}<br />
                    <b>Visibility: </b> {data.visibility}<br />
                </p>
                <h3><small>Defaul Team:</small></h3>
                <p>
                    <b>Id: </b> {data.defaultTeam.id}<br />
                    <b>Name: </b> {data.defaultTeam.name}<br />
                    <b>Url: </b><a href={data.defaultTeam.url}>{data.defaultTeam.url}</a><br />
                </p>
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <WorkItemList teamId={data.defaultTeam.id} projName={data.name} projId={data.id} />
                    </div>
                    <div className="col-md-6">
                        <RepoList id={data.id} />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... {this.state.id}</em></p>
            : ProjectSpecs.renderForecastsTable(this.state.data);

        return (
            <div>
                <h1>{this.state.data.name}</h1>
                {contents}
            </div>
        );
    }
}
