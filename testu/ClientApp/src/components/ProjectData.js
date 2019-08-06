import React, { Component } from 'react';
import { BuildList } from './BuildList.js';
import { PullRequests } from './PullRequests';
import { ProjectSpecs } from './ProjectSpecs';
import { TestRunList } from './TestRunList';



export class ProjectData extends Component {
    static displayName = ProjectData.name;
    constructor(props) {
        super(props);
        if (props.location.idProps !== undefined)
            this.state = { data: [], loading: true, id: props.location.idProps.id };
        else {
            this.state = { data: [], loading: true, id: localStorage.getItem("projId") };
        }
    }
    componentDidMount() {
        if (this.props.location.idProps !== undefined) {
            localStorage.setItem("projId", this.props.location.idProps.id)
        }
        this.setState({
            loading: false,
        })
    }

    static renderForecastsTable(id) {

        return (
            <div>
                <ProjectSpecs id={id} />
                <hr />
                <div className="row">
                    <div className="col-md-6">
                        <BuildList id={id} />
                    </div>
                    <div className="col-md-6">
                        <PullRequests id={id} />
                    </div>
                </div>
                <hr />
                <TestRunList id={id} />
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... {this.state.id}</em></p>
            : ProjectData.renderForecastsTable(this.state.id);

        return (
            <div>
                {contents}
            </div>
        );
    }
}
