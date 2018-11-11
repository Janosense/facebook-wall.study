import React, {Component} from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import {Consumer} from './../HOC/withProfile';
import { func, string, number, array } from 'prop-types';
import Like from './../Like';

export default class Post extends Component {
    static propTypes = {
        comment:   string.isRequired,
        created:   number.isRequired,
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     array.isRequired,
    };

    constructor () {
        super();

        this._removePost = this._removePost.bind(this);
    }

    _removePost () {
        const { _removePost, id } = this.props;

        _removePost(id);
    }

    render() {
        const { comment, created, _likePost, id, likes } = this.props;

        return (
            <Consumer>
                {(context) => (
                    <section className = { Styles.post }>
                        <span
                            className = { Styles.cross }
                            onClick = { this._removePost }>
                        </span>
                        <img src = { context.avatar }/>
                        <a href = ''>{ `${context.currentUserFirstName} ${context.currentUserLastName}` }</a>
                        <time>{ moment(created).format('MMMM D h:mm:ss a') }</time>
                        <p>{ comment }</p>
                        <Like
                            _likePost = { _likePost }
                            id = { id }
                            likes = { likes }
                            { ...context }
                        />
                    </section>
                )}
            </Consumer>
        );
    }
}
