import React, { Component } from 'react';
import Composer from '../Composer';
import Post from '../Post';
import StatusBar from '../StatusBar';
import Spinner from '../Spinner';
import Styles from './styles.m.css';
import { withProfile } from './../HOC/withProfile';
import Cather from '../Catcher';
import { api, TOKEN, GROUP_ID } from '../../config/api';
import { socket } from '../../socket/init';

@withProfile
export default class Feed extends Component {
    state = {
        posts:          [],
        isPostFetching: false,
    };

    componentDidMount () {
        const { currentUserFirstName, currentUserLastName } = this.props;
        this._fetchPosts();

        socket.emit('join', GROUP_ID);
        socket.on('create', (postJSON) => {
            const { data: createdPost, meta } = JSON.parse(postJSON);

            if (`${ currentUserFirstName } ${ currentUserLastName }` !== `${ meta.authorFirstName } ${ meta.authorLastName }`) {
                this.setState(({ posts }) => {
                    return {
                        posts: [ createdPost, ...posts ],
                    };
                });
            }
        });

        socket.on('remove', (postJSON) => {
            const { data: removedPost, meta } = JSON.parse(postJSON);

            if (`${ currentUserFirstName } ${ currentUserLastName }` !== `${ meta.authorFirstName } ${ meta.authorLastName }`) {
                this.setState(({ posts }) => {
                    return {
                        posts: posts.filter((post) => {
                            return post.id !== removedPost.id;
                        }),
                    };
                });
            }
        });

        socket.on('like', (postJSON) => {
            const { data: likedPost } = JSON.parse(postJSON);

            if (likedPost.likes.some((like) => `${ like.firstName } ${ like.lastName }` === `${ currentUserFirstName } ${ currentUserLastName }`)) {
                this.setState(({ posts }) => {
                    return {
                        posts: posts.map((post) => {
                            return post.id === likedPost.id ? likedPost : post;
                        }),
                    };
                });
            }
        });
    }

    componentWillUnmount () {
        socket.removeListener('create');
        socket.removeListener('remove');
        socket.removeListener('like');
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
