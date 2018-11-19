// Core
import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import { Redirect, Route, Switch } from 'react-router-dom';

// Components
import { Provider } from '../../components/HOC/withProfile';
import Cather from '../../components/Catcher';
import Profile from '../../components/Profile';
import Feed from '../../components/Feed';

// Instruments
import avatar from 'theme/assets/lisa';
import StatusBar from '../../components/StatusBar';

const options = {
    avatar,
    currentUserFirstName: 'Тимофей',
    currentUserLastName:  'Синянский',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Cather>
                <Provider value = { options }>
                    <StatusBar />
                    <Switch>
                        <Route
                            component = { Feed }
                            path = '/feed'
                        />
                        <Route
                            component = { Profile }
                            path = '/profile'
                        />
                        <Redirect to = '/feed' />
                    </Switch>
                </Provider>
            </Cather>
        );
    }
}
