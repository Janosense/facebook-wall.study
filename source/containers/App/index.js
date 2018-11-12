import React, {Component} from 'react';
import {hot} from 'react-hot-loader';
import Feed from '../../components/Feed';
import avatar from 'theme/assets/lisa';
import {Provider} from '../../components/HOC/withProfile';
import Cather from '../../components/Catcher';

const options = {
    avatar,
    currentUserFirstName: 'Тимофей',
    currentUserLastName:  'Синянский',
};

@hot(module)
export default class App extends Component {
    render() {
        return (
            <Cather>
                <Provider value = { options }>
                    <Feed />
                </Provider>
            </Cather>
        );
    }
}
