import React, {Component} from 'react';
import Styles from './style.m.css';


export default class Composer extends Component {
    render() {
        const {currentUserFirstName, avatar} = this.props;

        return (
            <section className = { Styles.composer }>
                <img src = { avatar } />
                <form>
                    <textarea placeholder = { `What\'s on your mind, ${currentUserFirstName}` }></textarea>
                    <input
                        type = 'submit'
                        value = 'Post'
                    />
                </form>
            </section>
        );
    }
}
