import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { ProjectData } from './components/ProjectData';
import { BuildList } from './components/BuildList';
import { Task } from './components/Task';


export default class App extends Component {
    static displayName = App.name;
    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/fetch-data' component={FetchData} />
                <Route name='project' path='/project' component={ProjectData} />
                <Route name='buildList' path='/buildList' component={BuildList} />
                <Route name='task' path='/task' component={Task} />
            </Layout>
        );
    }
}
