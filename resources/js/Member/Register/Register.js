import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Label} from "reactstrap";

// Form Input
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";
import StringInput from "../../components/Input/StringInput";
import TextArea from "../../components/Input/TextArea";

class Register extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form>
                        <FormGroup row>
                            <Label for="register_username" md={3}>Username: </Label>
                            <Col md={9}>
                                <StringInput
                                    id="register_username"
                                    name="register_username"
                                    placeholder="Minimum 3 characters"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="register_email" md={3}>Email</Label>
                            <Col md={9}>
                                <EmailInput
                                    id="register_email"
                                    name="register_email"
                                    placeholder="test@gmail.com"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="register_password" md={3}>Password: </Label>
                            <Col md={9}>
                                <PasswordInput
                                    id="register_password"
                                    name="register_password"
                                    placeholder="Minimum 6 characters"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="register_c_password" md={3}>Confirm Password: </Label>
                            <Col md={9}>
                                <PasswordInput
                                    id="register_c_password"
                                    name="register_c_password"
                                    placeholder="Required to be same with password"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="register_address" md={3}>Address: </Label>
                            <Col md={9}>
                                <TextArea
                                    id="register_address"
                                    style={{minWidth: '100%', minHeight: '40px'}}
                                    name="register_address"
                                    placeholder="552 Meadowbrook Ave. Florence, SC 29501"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <Button color="primary" block>Register</Button>
                    </Form>
                </div>
            </div>

        )
    }
}

export default Register;