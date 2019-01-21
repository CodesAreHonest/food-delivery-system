// React, React Router, React Router DOM
import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Member from './Member';

import store from '../store';

// Redux
import {Provider} from 'react-redux';

class FoodDelivery extends Component {
    constructor (props) {
        super (props);
    }

    render() {
        return (
            <Fragment>
                <Router>
                    <Route path="/" exact={true} component={Member} />
                </Router>
            </Fragment>
        )
    }
}

export default FoodDelivery;