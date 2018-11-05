import React, {Component} from 'react';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';
import Styles from './styles.m.css';

export default class Feed extends Component {
    state = {
        posts: [
            {
                id:      '1',
                comment: 'Hi, guys!',
                created: 1526825076849,
            },
            {
                id:      '2',
                comment: 'Hi, Ukraine!',
                created: 1526825076849,
            },
        ],
        isPostFetching: true,
    };

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
                <Composer />
                { postsJSX }
            </section>
        );
    }
}
