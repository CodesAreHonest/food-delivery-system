// React, React Router, React Router DOM
import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Login from './login';

import store from '../store';

// Redux
import {Provider} from 'react-redux';

class FoodDelivery extends Component {
    constructor (props) {
        super (props);
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Fragment>
                        <Route path="/" component={Login} exact={true}/>
                    </Fragment>
                </Router>
            </Provider>
        )
    }
}

export default FoodDelivery;