import React, {Component} from 'react';

import {Nav, NavItem, NavLink, TabContent, TabPane} from 'reactstrap';
import DeliveryLogin from "../Delivery/Login/DeliveryLogin";
import DeliveryRegister from "../Delivery/Register/DeliveryRegister";


class MemberLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: 'login'
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle(tab) {

        if (this.state.activeTab !== tab) {
            this.setState({activeTab: tab})
        }
    }

    render() {
        return (
            <div className="container" style={{marginTop: '30px'}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        <h1 style={{textAlign: 'center', marginBottom: '20px'}}>GOGO Delivery Login</h1>


                        <div>
                            <Nav tabs className="nav-tabs-custom">
                                <NavItem className="col-sm-6 p-0 white-bg">
                                    <NavLink
                                        className={this.state.activeTab === 'login' ? "active" : ""}
                                        onClick={() => this.toggle('login')}
                                    >
                                        Login
                                    </NavLink>
                                </NavItem>

                                <NavItem className="col-sm-6 p-0 white-bg">
                                    <NavLink
                                        className={this.state.activeTab === 'register' ? "active" : ""}
                                        onClick={() => this.toggle('register')}
                                    >
                                        Register
                                    </NavLink>
                                </NavItem>
                            </Nav>

                            <TabContent activeTab={this.state.activeTab}>
                                <TabPane tabId="login">
                                    <DeliveryLogin />
                                </TabPane>

                                <TabPane tabId="register">
                                    <DeliveryRegister />
                                </TabPane>
                            </TabContent>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default MemberLogin;