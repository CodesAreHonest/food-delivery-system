import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Label} from "reactstrap";
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";

import {Link} from 'react-router-dom'

class RestaurantLogin extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form>
                        <FormGroup row>
                            <Label for="restaurant_id" md={3}>Restaurant ID: </Label>
                            <Col md={9}>
                                <EmailInput
                                    id="restaurant_id"
                                    name="restaurant_id"
                                    placeholder="sukiya"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="password" md={3}>Password: </Label>
                            <Col md={9}>
                                <PasswordInput
                                    id="login_password"
                                    name="login_password"
                                    placeholder="Minimum 6 characters"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <Link to="/restaurant">
                            <Button color="primary" block>Login</Button>
                        </Link>
                    </Form>
                </div>
            </div>

        )
    }
}

export default RestaurantLogin;