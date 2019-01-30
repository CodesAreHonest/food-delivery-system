// React, React Router, React Router DOM
import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import {routes} from '../routes';

import store from '../store';

// Redux
import {Provider} from 'react-redux';

class FoodDelivery extends Component {
    constructor (props) {
        super (props);
    }

    render() {

        const ROUTES = routes.map((route, key) => (
            <Route path={route.path} key={key} exact={true} component={route.component} />
        ));

        return (
            <Provider store={store}>
                <Fragment>
                    <Router>
                        <Switch>
                            {ROUTES}
                        </Switch>
                    </Router>
                </Fragment>
            </Provider>
        )
    }
}

export default FoodDelivery;