﻿import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';

import MainPage from "./components/MainPage";

import { createBrowserHistory } from "history";

const customHistory = createBrowserHistory()

export default class Routes extends React.Component {
    render() {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/"
                            render={() => <MainPage/>}
                        />
                    </Switch>
                </Router>
            </div>
        );
    }
};