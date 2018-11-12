import React, {Component} from 'react';
import moment from 'moment';
import Styles from './styles.m.css';
import { func, string, number, array } from 'prop-types';
import Like from './../Like';
import { withProfile } from './../HOC/withProfile';

@withProfile
export default class Post extends Component {
    static propTypes = {
        comment:   string.isRequired,
        created:   number.isRequired,
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     array.isRequired,
    };

    _removePost = () => {
        const { _removePost, id } = this.props;

        _removePost(id);
    };

    render() {
        const { avatar, comment, created, _likePost, id, likes, currentUserFirstName, currentUserLastName } = this.props;

        return (
            <section className = { Styles.post }>
                        <span
                            className = { Styles.cross }
                            onClick = { this._removePost }>
                        </span>
                <img src = { avatar }/>
                <a href = ''>{ `${currentUserFirstName} ${currentUserLastName}` }</a>
                <time>{ moment(created).format('MMMM D h:mm:ss a') }</time>
                <p>{ comment }</p>
                <Like
                    _likePost = { _likePost }
                    id = { id }
                    likes = { likes }
                />
            </section>
        );
    }
}
