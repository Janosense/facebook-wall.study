import React, { Component } from 'react';
import Styles from './styles.m.css';
import cx from 'classnames';


export default class Login extends Component {
    state = {
        firstName:  '',
        lastName:   '',
        loginError: false,
    };

    _handleInputsChange = (event) => {
        const newState = {};
        newState[ event.target.name ] = event.target.value;

        this.setState(newState);
    };

    _submitLogin = () => {
        const { firstName, lastName } = this.state;

        if (!firstName || !lastName) {
            return null;
        }

        const isUserAuthenticated = this.props._userAuthentication(firstName, lastName);

        if (isUserAuthenticated) {
            this.setState({
                firstName: '',
                lastName:  '',
            });
        } else {
            this.setState({
                loginError: true,
            });
        }
    };

    _handleFormSubmit = (event) => {
        event.preventDefault();
        this._submitLogin();
    };

    render () {
        const { firstName, lastName, loginError } = this.state;
        const formStyles = cx({
            [ Styles.error ]: loginError,
        });

        return (
            <section className = { Styles.login }>
                <form
                    className = { formStyles }
                    onSubmit = { this._handleFormSubmit } >
                    <span> { loginError ? '🚫' : '👻' }</span>
                    <input
                        name = 'firstName'
                        placeholder = 'First Name'
                        type = 'text'
                        value = { firstName }
                        onChange = { this._handleInputsChange }
                    />
                    <input
                        name = 'lastName'
                        placeholder = 'Last Name'
                        type = 'text'
                        value = { lastName }
                        onChange = { this._handleInputsChange }
                    />
                    <button type = 'submit'>Login</button>
                </form>
            </section>
        );
    }
}
