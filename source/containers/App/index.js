// Core
import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import {Redirect, Route, Switch} from 'react-router-dom';

// Components
import {Provider} from '../../components/HOC/withProfile';
import Catcher from '../../components/Catcher';
import Profile from '../../components/Profile';
import Feed from '../../components/Feed';
import Login from '../../components/Login';

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
    state = {
        isUserAuthenticated: false,
    };

    componentDidMount () {
        if (localStorage.getItem('isUserLogin', true)) {
            this.setState({
                isUserAuthenticated: true,
            });
        }
    }

    _userAuthentication = (firstName, lastName) => {
        if (firstName === options.currentUserFirstName
            && lastName === options.currentUserLastName) {
            localStorage.setItem('isUserLogin', true);
            this.setState({
                isUserAuthenticated: true,
            });
        }

        return this.state.isUserAuthenticated;
    };

    render() {
        const {isUserAuthenticated} = this.state;

        return (
            <Catcher>
                <Provider value = { options }>
                    <StatusBar
                        isUserAuthenticated = { isUserAuthenticated }
                    />
                    {isUserAuthenticated ? (
                        <Switch>
                            <Route
                                component = { Feed }
                                path = '/feed'
                            />
                            <Route
                                component = { Profile }
                                path = '/profile'
                            />
                            <Redirect to = '/feed'/>
                        </Switch>
                    ) : (
                        <Switch>
                            <Route
                                path = '/login'
                                render = {
                                    () => (
                                        <Login _userAuthentication = { this._userAuthentication } />
                                    )
                                }
                            />
                            <Redirect
                                to = '/login'
                            />
                        </Switch>
                    )
                    }
                </Provider>
            </Catcher>
        );
    }
}
