import React, {Component} from 'react';
import Styles from './style.m.css';
import {Consumer} from './../HOC/withProfile';

export default class Composer extends Component {
    render() {
        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.composer }>
                        <img src = { context.avatar } />
                        <form>
                            <textarea placeholder = { `What\'s on your mind, ${context.currentUserFirstName}` }></textarea>
                            <input
                                type = 'submit'
                                value = 'Post'
                            />
                        </form>
                    </section>
                )}
            </Consumer>
        );
    }
}
