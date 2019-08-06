import React, { Component } from 'react';
import { PatForm } from './PatForm';
export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
        <div>
            <h1>Everything is going to be fine.... </h1>
            <h4>Just enter your PAT below.</h4>
            <PatForm />
      </div>
    );
  }
}
