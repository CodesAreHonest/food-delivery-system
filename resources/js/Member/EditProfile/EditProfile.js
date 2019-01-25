import React, {Component, Fragment} from 'react';
import {Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import EmailInput from "../../components/Input/EmailInput";
import TextArea from "../../components/Input/TextArea";
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";
import PasswordInput from "../../components/Input/PasswordInput";

class EditProfile extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Sidebar feature="EditProfile"/>

                <div className="account-manage-content">
                    <section>

                        <h3 style={{marginLeft: '5px'}}> Edit Profile </h3>
                        <hr />


                        <div className="edit-profile-background">
                            <Row>
                                <Col md={6}>
                                    <Label>Username: </Label>
                                    <StringInput
                                        name="username"
                                        id="username"
                                        className="form-control"
                                    />
                                </Col>

                                <Col md={6}>
                                    <Label>Email: </Label>
                                    <EmailInput
                                        name="email"
                                        id="email"
                                        className="form-control"
                                        disabled={true}
                                    />
                                </Col>

                                <Col md={6} style={{marginTop: '20px'}}>
                                    <Label for="register_password">Password: </Label>
                                    <PasswordInput
                                        id="register_password"
                                        name="register_password"
                                        placeholder="Minimum 6 characters"
                                        required={true}
                                    />
                                </Col>

                                <Col md={6} style={{marginTop: '20px'}}>
                                    <Label for="register_c_password">Confirm Password: </Label>
                                    <PasswordInput
                                        id="register_c_password"
                                        name="register_c_password"
                                        placeholder="Required to be same with password"
                                        required={true}
                                    />
                                </Col>

                                {/*<Col md={12}>*/}
                                    {/*<Label>Address: </Label>*/}
                                    {/*<TextArea*/}
                                        {/*name="address"*/}
                                        {/*id="address"*/}
                                        {/*className="form-control"*/}
                                        {/*style={{minWidth: '100%', minHeight: '40px', marginBottom: '20px'}}*/}
                                    {/*/>*/}
                                {/*</Col>*/}
                            </Row>

                            <Button color="primary" style={{marginTop: '20px'}}>Save Changes</Button>
                        </div>
                    </section>
                </div>
            </Fragment>

        )
    }
}

export default EditProfile;