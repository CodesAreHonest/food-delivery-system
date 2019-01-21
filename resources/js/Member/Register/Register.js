import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Label} from "reactstrap";
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";

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
                            <Label for="user_name" md={2}>Username: </Label>
                            <Col md={10}>
                                <EmailInput
                                    id="email"
                                    name="email"
                                    placeholder="test@gmail.com"
                                    required={true}
                                />
                            </Col>

                            <Label for="password" md={2}>Password</Label>
                            <Col md={10}>
                                <PasswordInput
                                    id="password"
                                    name="password"
                                    placeholder="Minimum 6 characters"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <Button color="primary" block>Submit</Button>
                    </Form>
                </div>
            </div>

        )
    }
}

export default Register;