// React, React Router, React Router DOM
import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import MemberLogin from './MemberLogin';
import Home from '../Member/Home/Home';

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
                    <Switch>
                        <Route path="/member/login" exact={true} component={MemberLogin} />
                        <Route path="/member" exact={true} component={Home} />
                    </Switch>
                </Router>
            </Fragment>
        )
    }
}

export default FoodDelivery;