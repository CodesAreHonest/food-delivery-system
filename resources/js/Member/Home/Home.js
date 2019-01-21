import React, {Component, Fragment} from 'react';
import NavigationBar from "../../components/NavigationBar/NavigationBar";

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