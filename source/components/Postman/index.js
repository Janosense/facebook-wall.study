import React from 'react';
import Styles from './styles.m.css';
import { withProfile } from '../HOC/withProfile';
import { Transition } from 'react-transition-group';
import { fromTo } from 'gsap';

const Postman = (props) => {
    const { avatar, currentUserFirstName, currentUserLirstName } = props;

    return (
        <Transition
            appear
            in
            timeout = { 2000 }
            onEntered = { (postman) => {
                fromTo(postman, 0.5, {y: 0}, {y: 100});
            } }
            onEntering = { (postman) => {
                fromTo(postman, 1, {y: 100}, {y: 0});
            } }>
            <section className = { Styles.postman }>
                <img
                    alt = { `${ currentUserFirstName } ${ currentUserLirstName }` }
                    src = { avatar }
                />
                <span>Welcome online, { currentUserFirstName }</span>
            </section>
        </Transition>
    );
};

export default withProfile(Postman);
