import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

class DeliveryTeam extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Sidebar feature="DeliveryTeam"/>

                <div className="account-manage-content">
                    <section>

                        <h3 style={{marginLeft: '5px'}}> Delivery Team </h3>
                        <hr />

                        <div className="edit-profile-background">

                        </div>
                    </section>
                </div>
            </Fragment>

        )
    }
}

export default DeliveryTeam;