import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";
import EditProfile from "./EditProfile/EditProfile";

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
                        <h3 style={{marginLeft: '5px'}}> Edit Profile </h3>
                        <hr />

                        <EditProfile/>
                    </section>
                </div>

            </Fragment>
        )
    }
}

export default ManageAccount;