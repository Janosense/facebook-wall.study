import React, {Component} from 'react';
import moment from 'moment';
import Styles from './styles.m.css';

import avatar from 'theme/assets/lisa';

export default class Post extends Component {
    render() {
        return (
            <section className = { Styles.post }>
                <img src = { avatar }/>
                <a href = ''>Lisa Simpson</a>
                <time>{ moment().format('MMMM DD YYYY') }</time>
                <p>Howdy!</p>
            </section>
        );
    }
}
