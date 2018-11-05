import React, {Component} from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import {Consumer} from './../HOC/withProfile';

export default class Post extends Component {
    render() {
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <img src = { context.avatar }/>
                        <a href = ''>{ `${context.currentUserFirstName} ${context.currentUserLastName}` }</a>
                        <time>{ moment().format('MMMM DD YYYY') }</time>
                        <p>Howdy!</p>
                    </section>
                )}
            </Consumer>
        );
    }
}
