import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Label, Row} from "reactstrap";

// Form Input
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";
import StringInput from "../../components/Input/StringInput";
import TextArea from "../../components/Input/TextArea";

import {Link} from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form>
                        <Row>
                            <Col md={6}>
                                <Label for="register_restaurant_id">Restaurant ID: </Label>
                                <StringInput
                                    id="register_username"
                                    name="register_username"
                                    placeholder="Minimum 3 characters"
                                    required={true}
                                />
                            </Col>

                            <Col md={6}>
                                <Label for="register_restaurant_name">Restaurant Name: </Label>
                                <EmailInput
                                    id="register_restaurant_name"
                                    name="register_restaurant_name"
                                    placeholder="ABC Restaurant"
                                    required={true}
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

                            <Col md={12} style={{marginTop: '20px'}}>
                                <Label for="register_address">Address: </Label>
                                <TextArea
                                    id="register_address"
                                    style={{minWidth: '100%', minHeight: '40px', marginBottom: '20px'}}
                                    name="register_address"
                                    placeholder="552 Meadowbrook Ave. Florence, SC 29501"
                                    required={true}
                                />
                            </Col>
                        </Row>

                        <Button color="primary" block>Register</Button>
                    </Form>
                </div>
            </div>

        )
    }
}

export default Register;