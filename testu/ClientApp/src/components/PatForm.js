import React, { Component } from 'react';

export class PatForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            patValue: " ",
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    componentDidMount() {
        const pat = localStorage.getItem("client_Pat")
        if (pat !== null)
            this.setState({ patValue: pat })
    }

    handleChange(event) {
        this.setState({
            patValue: event.target.value,
        })
    }

    handleSubmit(event) {
        event.preventDefault();
        localStorage.setItem("client_Pat", this.state.patValue.trim())
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-5">
                    <form onSubmit={this.handleSubmit} className="form-group">
                        <label htmlFor="ijiji" >Personal Access Token: </label>
                        <input className="form-control" id="ijiji" type="password" placeholder="please enter your PAT" value={this.state.patValue} onChange={this.handleChange} />
                        <hr/>
                        <input type="submit" className="btn btn-primary" value="Update" />
                    </form>
                </div>
            </div>
        );
    }
}