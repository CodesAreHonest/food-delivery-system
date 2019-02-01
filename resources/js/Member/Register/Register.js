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
            register_user_name: '',
            register_email: '',
            register_password: '',
            register_c_password: '',
            register_address: '',
            register_state: '',
            register_city: '',
            register_country: {value: 'malaysia', label: 'Malaysia'}
        };

        this.onChange = this.onChange.bind(this);
    }

    onChange (e) {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form>

                        <h4 style={{textAlign: 'center'}}> Personal Information</h4>

                        <hr />

                        <Row>

                            <Col md={6}>
                                <Label for="register_user_name">Username: </Label>
                                <StringInput
                                    id="register_user_name"
                                    name="register_user_name"
                                    value={this.state.register_user_name}
                                    placeholder="Minimum 3 characters with no whitespace"
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6}>
                                <Label for="register_email">Email: </Label>
                                <EmailInput
                                    id="register_email"
                                    name="register_email"
                                    placeholder="test@gmail.com"
                                    value={this.state.register_email}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '15px'}}>
                                <Label for="register_password">Password: </Label>
                                <PasswordInput
                                    id="register_password"
                                    name="register_password"
                                    placeholder="Minimum 6 characters"
                                    value={this.state.register_password}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '15px'}}>
                                <Label for="register_c_password">Confirm Password: </Label>
                                <PasswordInput
                                    id="register_c_password"
                                    name="register_c_password"
                                    placeholder="Required to be same with password"
                                    value={this.state.register_c_password}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>
                        </Row>

                        <h4 style={{marginTop: '30px', textAlign: 'center'}}> Location Information</h4>

                        <hr />

                        <Row>
                            <Col md={6}>
                                <Label for="register_address">Address: </Label>
                                <StringInput
                                    id="register_address"
                                    name="register_address"
                                    placeholder="75 Kg Sg Ramal Luar"
                                    value={this.state.register_address}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6}>
                                <Label for="register_city">City: </Label>
                                <StringInput
                                    id="register_city"
                                    name="register_city"
                                    placeholder="Kajang"
                                    value={this.state.register_city}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '15px'}}>
                                <Label for="register_state">State: </Label>
                                <StringInput
                                    id="register_state"
                                    name="register_state"
                                    placeholder="Selangor"
                                    value={this.state.register_state}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '15px'}}>
                                <Label for="register_country">Country: </Label>
                                <ReactSelect
                                    className="form-control"
                                    closeMenuOnSelect={true}
                                    name="register_country"
                                    options={[{value: 'malaysia', label: 'Malaysia'}]}
                                    value={this.state.register_country}
                                    onChange={(country) => this.setState({country})}
                                    placeholder="Country"
                                />
                            </Col>
                        </Row>

                        <Button color="primary" type="submit" block style={{marginTop: '15px'}}>Register</Button>
                    </Form>
                </div>
            </div>

        )
    }
}

export default Register;