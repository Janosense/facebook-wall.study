import React, {Component} from 'react';
import Styles from './styles.m.css';
import { withProfile } from './../HOC/withProfile';
import cx from 'classnames';
import { socket } from '../../socket/init';

@withProfile
export default class StatusBar extends Component {
    state = {
        online: false,
    };

    componentDidMount () {
        socket.on('connect', () => {
            this.setState({
                online: true,
            });
        });

        socket.on('disconnect', () => {
            this.setState({
                online: false,
            });
        });
    }

    componentWillUnmount () {
        socket.removeListener('connect');
        socket.removeListener('disconnect');
    }

    render() {
        const { avatar, currentUserFirstName, currentUserLastName } = this.props;
        const { online } = this.state;

        const statusStyle = cx(Styles.status, {
            [ Styles.online ]:  online,
            [ Styles.offline ]: !online,
        });

        const statusMessage = online ? 'online 🚀' : 'offline 🚫'

        return (
            <section className = { Styles.statusBar }>
                <div className = { statusStyle }>
                    <div>{ statusMessage }</div>
                </div>
                <button>
                    <img src = { avatar }/>
                    <span>{ currentUserFirstName }</span>
                    &nbsp;
                    <span>{ currentUserLastName }</span>
                </button>
            </section>
        );
    }
}
