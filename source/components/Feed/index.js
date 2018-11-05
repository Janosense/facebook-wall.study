import React, {Component} from 'react';
import Composer from '../Composer';
import Post from '../Post';
import Styles from './styles.m.css';
import StatusBar from '../StatusBar';

export default class Feed extends Component {
    render() {
        return (
            <section className = { Styles.feed }>
                <StatusBar />
                <Composer />
                <Post />
            </section>
        );
    }
}
