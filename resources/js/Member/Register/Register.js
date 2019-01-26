import React, {Component} from 'react';
import {Button, Col, Form, Label, Row} from "reactstrap";

// Form Input
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";
import StringInput from "../../components/Input/StringInput";
import TextArea from "../../components/Input/TextArea";

import {Link} from 'react-router-dom';
import ReactSelect from "../../components/Input/ReactSelect";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            country: ''
        }
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form>

                        <h3 style={{textAlign: 'center'}}> Personal Information</h3>

                        <hr />

                        <Row>

                            <Col md={6}>
                                <Label for="register_user_name">Username: </Label>
                                <StringInput
                                    id="register_user_name"
                                    name="register_user_name"
                                    placeholder="Minimum 3 characters with no whitespace"
                                    required={true}
                                />
                            </Col>

                            <Col md={6}>
                                <Label for="register_email">Email: </Label>
                                <EmailInput
                                    id="register_email"
                                    name="register_email"
                                    placeholder="test@gmail.com"
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
                        </Row>

                        <h3 style={{marginTop: '30px', textAlign: 'center'}}> Location Information</h3>

                        <hr />

                        <Row>
                            <Col md={6}>
                                <Label for="register_address">Address: </Label>
                                <StringInput
                                    id="register_address"
                                    name="register_address"
                                    placeholder="75 Kg Sg Ramal Luar"
                                    required={true}
                                />
                            </Col>

                            <Col md={6}>
                                <Label for="register_city">City: </Label>
                                <StringInput
                                    id="register_city"
                                    name="register_city"
                                    placeholder="Kajang"
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '20px'}}>
                                <Label for="register_state">State: </Label>
                                <StringInput
                                    id="register_state"
                                    name="register_state"
                                    placeholder="Selangor"
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '20px'}}>
                                <Label for="register_country">Country: </Label>
                                <ReactSelect
                                    className="form-control"
                                    closeMenuOnSelect={true}
                                    name="register_country"
                                    options={[{value: 'malaysia', label: 'Malaysia'}]}
                                    value={{value: 'malaysia', label: 'Malaysia'}}
                                    onChange={(country) => this.setState({country})}
                                    placeholder="Country"
                                />
                            </Col>
                        </Row>

                        <Button color="primary" block style={{marginTop: '20px'}}>Register</Button>
                    </Form>
                </div>
            </div>

        )
    }
}

export default Register;