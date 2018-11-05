import React, {Component} from 'react';
import moment from 'moment';
import Styles from './styles.m.css';

export default class Post extends Component {
    render() {
        const {currentUserFirstName, currentUserLastName, avatar} = this.props;


        return (
            <section className = { Styles.post }>
                <img src = { avatar }/>
                <a href = ''>{ `${currentUserFirstName} ${currentUserLastName}` }</a>
                <time>{ moment().format('MMMM DD YYYY') }</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
