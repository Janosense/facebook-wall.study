import React, { Component } from 'react';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';
import Styles from './styles.m.css';
import { delay } from '../../instruments';
import { withProfile } from './../HOC/withProfile';
import Cather from '../Catcher';
import { api, TOKEN } from '../../config/api';

@withProfile
export default class Feed extends Component {
    state = {
        posts:          [],
        isPostFetching: false,
    };

    componentDidMount () {
        this._fetchPosts();
        this.refetch = setInterval(this._fetchPosts, 10000);
    }

    componentWillUnmount () {
        clearInterval(this.refetch);
    }

    _setPostsFetchingState = (state) => {
        this.setState({
            isPostFetching: state,
        });
    };

    _likePost = async (id) => {
        this._setPostsFetchingState(true);

        const response = await fetch(`${ api }/${ id }`, {
            method:  'PUT',
            headers: {
                Authorization: TOKEN,
            },
        });

        const {data: likedPost} = await response.json();

        this.setState(({ posts }) => {
            return {
                posts: posts.map((post) => {
                    return post.id === likedPost.id ? likedPost : post;
                }),
                isPostFetching: false,
            };
        });
    };

    _fetchPosts = async () => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method: 'GET',
        });

        const {data: posts} = await response.json();

        this.setState({
            posts,
            isPostFetching: false,
        });
    };

    _createPost = async (comment) => {
        this._setPostsFetchingState(true);

        const response = await fetch(api, {
            method:  'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:  TOKEN,
            },
            body: JSON.stringify({comment}),
        });

        const {data: post} = await response.json();

        this.setState(({posts}) => {
            return {
                posts:          [ post, ...posts ],
                isPostFetching: false,
            };
        });
    };

    _removePost = async (id) => {
        this._setPostsFetchingState(true);

        await fetch(`${ api }/${ id }`, {
            method:  'DELETE',
            headers: {
                Authorization: TOKEN,
            },
        });

        this.setState(({ posts }) => {
            return {
                posts: posts.filter((post) => {
                    return post.id !== id;
                }),
                isPostFetching: false,
            };
        });
    };

    render() {
        const {posts, isPostFetching} = this.state;

        const postsJSX = posts.map((post) => {
            return (
                <Cather key = { post.id }>
                    <Post
                        _likePost = { this._likePost }
                        _removePost = { this._removePost }
                        { ...post }
                    />
                </Cather>
            );
        });

        return (
            <section className = { Styles.feed }>
                <Spinner isSpinning = { isPostFetching }/>
                <StatusBar/>
                <Composer _createPost = { this._createPost }/>
                {postsJSX}
            </section>
        );
    }
}
