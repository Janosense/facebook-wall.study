import React, {Component} from 'react';
import moment from 'moment';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';
import Styles from './styles.m.css';
import {getUniqueID} from '../../instruments';


export default class Feed extends Component {
    constructor () {
        super();
        this._createPost = this._createPost.bind(this);
    }

    state = {
        posts: [
            {
                id:      '1',
                comment: 'Hi, guys! 🖖',
                created: 1526825076849,
            },
            {
                id:      '2',
                comment: 'Hi, Ukraine! 🤘',
                created: 1526825076849,
            },
        ],
        isPostFetching: false,
    };

    _createPost (comment) {
        const post = {
            id:      getUniqueID(),
            created: moment.utc().valueOf(),
            comment: comment,
        };

        console.log(post);

        this.setState(({posts}) => {
            return {
                posts: [ post, ...posts ],
            };
        });
    }

    render() {
        const { posts, isPostFetching } = this.state;
        const postsJSX = posts.map((post) => {
            return (
                <Post
                    key = { post.id }
                    { ...post }
                />
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching } />
                <StatusBar />
                <Composer _createPost = { this._createPost } />
                { postsJSX }
            </section>
        );
    }
}
