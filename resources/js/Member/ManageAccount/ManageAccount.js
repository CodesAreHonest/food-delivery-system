import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

class ManageAccount extends Component {
    constructor(props) {
        super (props);
    }

    render() {
        return (
            <Fragment>
                <NavigationBar/>

                <Sidebar />

                <div className="account-manage-content">
                    <section>
                        <h1></h1>
                    </section>
                </div>

            </Fragment>
        )
    }
}

export default ManageAccount;