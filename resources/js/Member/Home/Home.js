import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";

class Home extends Component {
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

export default Home;