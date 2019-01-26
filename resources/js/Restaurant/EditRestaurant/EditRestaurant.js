import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import EmailInput from "../../components/Input/EmailInput";
import NavigationBar from "../NavigationBar/NavigationBar";
import PasswordInput from "../../components/Input/PasswordInput";

class EditRestaurant extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Container style={{marginTop: '20px'}}>
                    <section>

                        <h3 style={{marginLeft: '5px'}}>Edit Restaurant Profile</h3>
                        <hr />

                        <div className="edit-profile-background">
                            <Row>
                                <Col md={6}>
                                    <Label>Restaurant ID: </Label>
                                    <StringInput
                                        name="restaurant_id"
                                        id="restaurant_id"
                                        className="form-control"
                                        disabled={true}
                                    />
                                </Col>

                                <Col md={6}>
                                    <Label>Restaurant Name: </Label>
                                    <EmailInput
                                        name="restaurant_name"
                                        id="restaurant_name"
                                        className="form-control"
                                    />
                                </Col>

                                <Col md={6} style={{marginTop: '20px'}}>
                                    <Label for="password">Password: </Label>
                                    <PasswordInput
                                        id="password"
                                        name="password"
                                        placeholder="Minimum 6 characters"
                                        required={true}
                                    />
                                </Col>

                                <Col md={6} style={{marginTop: '20px'}}>
                                    <Label for="c_password">Confirm Password: </Label>
                                    <PasswordInput
                                        id="c_password"
                                        name="c_password"
                                        placeholder="Required to be same with password"
                                        required={true}
                                    />
                                </Col>
                            </Row>

                            <Button color="primary" style={{marginTop: '20px'}}>Save Changes</Button>
                        </div>
                    </section>
                </Container>
            </Fragment>

        )
    }
}

export default EditRestaurant;