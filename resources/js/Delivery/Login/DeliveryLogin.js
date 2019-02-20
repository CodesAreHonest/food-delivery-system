import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Label, Alert} from "reactstrap";
import PasswordInput from "../../components/Input/PasswordInput";

import PropTypes from 'prop-types';
import StringInput from "../../components/Input/StringInput";

import {login_delivery} from "./DeliveryLoginAction";

import {connect} from 'react-redux';

class DeliveryLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            delivery_username: '',
            delivery_password: '',
            alert: null,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.postLogin = this.postLogin.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.login_response !== this.props.login_response) {

            const response = this.props.login_response.data;
            this.postLogin(response);
        }
    }

    postLogin (login_response) {

        let {msg, response_code} = login_response;

        if (response_code === 200) {
            window.location.href = '/delivery/';
        }
        else {
            const alert = (
                <Alert color="danger">{msg}</Alert>
            );

            this.setState({alert});
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {
        console.log(this.state);
        e.preventDefault();

        let form = document.getElementById('delivery_login_form');

        if (!form.checkValidity()) {
            return false;
        }

        this.props.login_delivery(this.state);
    }   

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form id="delivery_login_form" onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="delivery_username" md={3}>Delivery Username: </Label>
                            <Col md={9}>
                                <StringInput
                                    id="delivery_username"
                                    name="delivery_username"
                                    value={this.state.delivery_username}
                                    onChange={this.onChange}
                                    placeholder="Username"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="password" md={3}>Password: </Label>
                            <Col md={9}>
                                <PasswordInput
                                    id="delivery_password"
                                    name="delivery_password"
                                    value={this.state.password}
                                    onChange={this.onChange}
                                    placeholder="Minimum 6 characters"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        {this.state.alert}

                        <Button color="primary" type="submit" block>Login</Button>
                    </Form>
                </div>
            </div>

        )
    }
}

DeliveryLogin.propTypes = {
    login_delivery: PropTypes.func.isRequired,
    login_response: PropTypes.any
};

const mapStateToProps = state => ({
    login_response: state.delivery.login_delivery_response
});

const mapDispatchToProps = {
    login_delivery
};



export default connect(mapStateToProps, mapDispatchToProps)(DeliveryLogin);