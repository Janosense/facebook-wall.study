import React, {Component} from 'react';
import moment from 'moment';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';
import Styles from './styles.m.css';
import {getUniqueID, delay} from '../../instruments';


export default class Feed extends Component {
    constructor() {
        super();
        this._createPost = this._createPost.bind(this);
        this._setPostsFetchingState = this._setPostsFetchingState.bind(this);
        this._likePost = this._likePost.bind(this);
    }

    state = {
        posts: [
            {
                id:      getUniqueID(),
                comment: 'Hi, guys! 🖖',
                created: 1526825076849,
                likes:   [],
            },
            {
                id:      getUniqueID(),
                comment: 'Hi, Ukraine! 🤘',
                created: 1526825076849,
                likes:   [],
            },
        ],
        isPostFetching: false,
    };

    _setPostsFetchingState(state) {
        this.setState({
            isPostFetching: state,
        });
    }

    async _likePost(id) {
        const { posts } = this.state;
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._setPostsFetchingState(true);

        await delay(1200);

        const newPosts = posts.map((post) => {
            if (post.id === id) {
                return {
                    ...post,
                    likes: [
                        {
                            id:        getUniqueID(),
                            firstName: currentUserFirstName,
                            lastName:  currentUserLastName,
                        },
                    ],
                };
            }

            return post;
        });

        this.setState({
            posts:          newPosts,
            isPostFetching: false,
        });
    }

    async _createPost(comment) {
        this._setPostsFetchingState(true);

        const post = {
            id:      getUniqueID(),
            created: moment.utc()
                .valueOf(),
            comment: comment,
        };

        await delay(1200);

        this.setState(({posts}) => {
            return {
                posts:          [ post, ...posts ],
                isPostFetching: false,
            };
        });
    }

    render() {
        const {posts, isPostFetching} = this.state;
        const postsJSX = posts.map((post) => {
            return (
                <Post
                    _likePost = { this._likePost }
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching }/>
                <StatusBar/>
                <Composer _createPost = { this._createPost }/>
                { postsJSX }
            </section>
        );
    }
}
