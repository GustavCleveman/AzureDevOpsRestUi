import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

export class Task extends Component {
    static displayName = Task.name;
    constructor(props) {
        super(props);
        if (props.location.idProps === undefined) {
            this.state = {
                data: [],
                loading: false,
                id: 0,
                redirect: true,
            };
        }
        else {
            this.state = {
                data: [],
                fields: [],
                loading: true,
                id: props.location.idProps.id,
                redirect: false
            };
        }
    }

    componentDidMount() {

        const pat = localStorage.getItem("client_Pat")

        if (this.state.id !== 0) {
            fetch(`api/SampleData/SpecificTask/${pat}/${this.state.id}/`)
                .then(response => response.json())
                .then(data => {
                    this.setState({
                        data,
                        fields: data.fields,
                        loading: false
                    })
                })
                .catch(err => console.log(err));
        }
    }

    static renderForecastsTable(that, data, fields) {
        if (that.state.redirect) {
            return <Redirect to='/project' />
        }
        return (
            <div>
                <p><b>id:</b> {data.id}.</p>
                <p><b>Project:</b> {fields["System.AreaPath"]}.</p>
                <p><b>Task title:</b> {fields["System.Title"]}.</p>
                <p><b>Created By:</b> {fields["System.CreatedBy"]}.</p>
                <p><b>Assigned to:</b> {fields["System.AssignedTo"]}.</p>
                <p><b>Reason:</b> {fields["System.Reason"]}.</p>
                <p><b>State:</b> {fields["System.State"]}.</p>
                <p><b>Iteration:</b> {fields["System.IterationPath"]}.</p>
            </div>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading... {this.state.id}</em></p>
            : Task.renderForecastsTable(this, this.state.data, this.state.fields);

        return (
            <div>
                <h3>TASK</h3>
                {contents}
            </div>
        );
    }
}
