import React, {Component} from 'react';
import {Alert, Button, Col, Form, FormGroup, Label} from "reactstrap";
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";

import {Link} from 'react-router-dom'
import PropTypes from "prop-types";
import {login_member} from "./LoginAction";

import {connect} from 'react-redux';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            login_email: '',
            login_password: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.postLogin = this.postLogin.bind(this);

    }

    componentDidUpdate(prevProps) {

        if (prevProps.login_member_response !== this.props.login_member_response) {

            const response = this.props.login_member_response.data;
            this.postLogin(response);
        }
    }

    postLogin (login_response) {

        let {msg, response_code} = login_response;

        if (response_code === 200) {
            window.location.href = '/member/';
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

        e.preventDefault();

        let form = document.getElementById('member_login_form');

        if (!form.checkValidity()) {
            return false;
        }

        this.props.login_member(this.state.login_email, this.state.login_password);


    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form id="member_login_form" onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="login_email" md={2}>Email: </Label>
                            <Col md={10}>
                                <EmailInput
                                    id="login_email"
                                    name="login_email"
                                    value={this.state.login_email}
                                    onChange={this.onChange}
                                    placeholder="test@gmail.com"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="password" md={2}>Password: </Label>
                            <Col md={10}>
                                <PasswordInput
                                    id="login_password"
                                    name="login_password"
                                    value={this.state.login_password}
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

Login.propTypes = {
    login_member: PropTypes.func.isRequired,
    login_member_response: PropTypes.any
};

const mapStateToProps = state => ({
    login_member_response: state.member.login_member_response
});

const mapDispatchToProps = {
    login_member
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);