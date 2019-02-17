import React, {Component} from 'react';
import {Alert, Button, Form, FormGroup, Label} from "reactstrap";
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";

import PropTypes from "prop-types";
import {login_admin} from "./LoginAction";

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

        if (prevProps.login_admin_response !== this.props.login_admin_response) {

            const response = this.props.login_admin_response.data;
            this.postLogin(response);
        }
    }

    postLogin (login_response) {

        let {msg, response_code} = login_response;

        if (response_code === 200) {
            window.location.href = '/admin/';
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

        let form = document.getElementById('admin_login_form');

        if (!form.checkValidity()) {
            return false;
        }

        const {login_email, login_password} = this.state;

        this.props.login_admin(login_email, login_password);

    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form id="admin_login_form" onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="login_email">Email: </Label>
                            <EmailInput
                                id="login_email"
                                name="login_email"
                                value={this.state.login_email}
                                onChange={this.onChange}
                                placeholder="test@gmail.com"
                                required={true}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="password">Password: </Label>
                            <PasswordInput
                                id="login_password"
                                name="login_password"
                                value={this.state.login_password}
                                onChange={this.onChange}
                                placeholder="Minimum 6 characters"
                                required={true}
                            />
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
    login_admin: PropTypes.func.isRequired,
    login_admin_response: PropTypes.any
};

const mapStateToProps = state => ({
    login_admin_response: state.admin.login_admin_response
});

const mapDispatchToProps = {
    login_admin
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);