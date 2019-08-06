import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom'

export class FetchData extends Component {
    static displayName = FetchData.name;

    constructor(props) {
        super(props);
        this.state = { projects: [], loading: true, redirect: false };
    }

    componentDidMount() {

        const PAT = localStorage.getItem("client_Pat")

        if (PAT === null || PAT === "" || PAT === " ") {
            this.setState({
                redirect: true,
                loading: false,
            })
        }
        else {
            fetch('api/SampleData/Projects/' + PAT)
                .then(response => response.json())
                .then(data => {
                    if (data.value === undefined) {
                        this.setState({
                            redirect: true,
                            loading: false,
                        })
                    }
                    else {
                        this.setState({ projects: data.value, loading: false });
                    }
                });
        }
    }


    static renderProjectList(projects, redirect) {
        if (redirect === true) {
            return <Redirect to='/' />
        }
        return (
            <table className='table table-striped'>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>More</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project, index) =>
                        <tr key={index}>
                            <td>{project.name}</td>
                            <td hidden>{project.id}</td>
                            <td>{project.description}</td>
                            <td><Link to={{
                                pathname: '/project',
                                idProps: {
                                    id: project.id,
                                }
                            }}> More </Link>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : FetchData.renderProjectList(this.state.projects, this.state.redirect);

        return (
            <div>
                <h1>TFS:en</h1>
                {contents}
            </div>
        );
    }
}
