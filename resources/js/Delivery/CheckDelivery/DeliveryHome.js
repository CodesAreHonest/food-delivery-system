import React, {Component, Fragment} from 'react';

import {Container, Row, Col} from 'reactstrap';

import NavigationBar from "../NavigationBar/NavigationBar";



class DeliveryHome extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <Fragment>
                <NavigationBar />
            </Fragment>
        )
    }
}

export default DeliveryHome;