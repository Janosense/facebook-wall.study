import React, {Component} from 'react';
import { string, func, arrayOf, shape } from 'prop-types';
import Styles from './styles.m.css';
import cx from 'classnames';

export default class Like extends Component {
    static propTypes = {
        _likePost: func.isRequired,
        id:        string.isRequired,
        likes:     arrayOf(
            shape({
                id:        string.isRequired,
                firstName: string.isRequired,
                lastName:  string.isRequired,
            }),
        ),
    };

    constructor () {
        super();

        this._getLikedByMe = this._getLikedByMe.bind(this);
        this._getLikeStyles = this._getLikeStyles.bind(this);
        this._likePost = this._likePost.bind(this);
        this._showLikers = this._showLikers.bind(this);
        this._hideLikers = this._hideLikers.bind(this);
        this._getLikersList = this._getLikersList.bind(this);
        this._getLikesDescription = this._getLikesDescription.bind(this);
    }

    state = {
        showLikers: false,
    };

    _showLikers () {
        this.setState({
            showLikers: true,
        });
    }

    _hideLikers () {
        this.setState({
            showLikers: false,
        });
    }

    _likePost () {
        const { _likePost, id } = this.props;
        _likePost(id);
    }

    _getLikedByMe () {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        return likes.some(({firstName, lastName}) => {
            return `${firstName} ${lastName}` === `${currentUserFirstName} ${currentUserLastName}`;
        });
    }

    _getLikeStyles () {
        return cx(Styles.icon, {
            [ Styles.liked ]: this._getLikedByMe(),
        });
    }

    _getLikersList () {
        const { showLikers } = this.state;
        const { likes } = this.props;

        const likesJSX = likes.map(({firstName, lastName, id}) => {
            return (
                <li key = { id }>{`${firstName} ${lastName}`}</li>
            );
        });

        return likes.length && showLikers ? <ul>{ likesJSX }</ul> : null;
    }

    _getLikesDescription () {
        const { currentUserFirstName, currentUserLastName, likes } = this.props;

        const likedByMe = this._getLikedByMe();

        if (likes.length === 1 && likedByMe) {
            return `${currentUserFirstName} ${currentUserLastName}`;
        } else if (likes.length === 2 && likedByMe) {
            return 'You and 1 other';
        } else if (likedByMe) {
            return `You and ${likes.length} others`;
        }

        return likes.length;
    }

    render () {
        const likeStyles = this._getLikeStyles();
        const likersList = this._getLikersList();
        const likesDescription = this._getLikesDescription();

        return (
            <section className = { Styles.like }>
                <span
                    className = { likeStyles }
                    onClick = { this._likePost }>Like
                </span>
                <div>
                    { likersList }
                    <span
                        onMouseEnter = { this._showLikers }
                        onMouseLeave = { this._hideLikers }>
                        { likesDescription }
                    </span>
                </div>
            </section>
        );
    }
}
