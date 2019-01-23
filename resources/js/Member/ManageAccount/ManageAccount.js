import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";

class ManageAccount extends Component {
    constructor(props) {
        super (props);
    }

    render() {
        return (
            <Fragment>
                <NavigationBar/>

                <div className="sidebar">
                    <a className="active">Home</a>
                    <a>News</a>
                    <a>Contact</a>
                    <a>About</a>
                </div>

                <div className="account-manage-content">
                    <section>
                        hi
                    </section>
                </div>

            </Fragment>
        )
    }
}

export default ManageAccount;