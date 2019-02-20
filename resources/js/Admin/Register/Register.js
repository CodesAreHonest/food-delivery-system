import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Form, Label, FormGroup} from "reactstrap";

// Form Input
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";
import StringInput from "../../components/Input/StringInput";

import {connect} from 'react-redux';
import {register_admin} from "./RegisterAction";
import Swal from "sweetalert2";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            register_username: '',
            register_email: '',
            register_password: '',
            register_c_password: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);

        this.initialState = this.state;
    }

    resetForm() {
        this.setState(this.initialState);
    }

    componentDidUpdate (prevProps) {

        if (this.props.register_response !== prevProps.register_response) {

            let {msgType, msgTitle, msg, response_code} = this.props.register_response.data;

            if (response_code === 200) {
                this.resetForm();
            }

            Swal.fire({
                type: msgType,
                title: msgTitle,
                text: msg,
                allowOutsideClick: false,
                showConfirmButton: true,
                allowEnterKey: true,
                confirmButtonText: 'Ok',
                timer: 2000
            })

        }
    }

    onChange (e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit (e) {

        e.preventDefault();

        let form = document.getElementById('admin_register_form');

        if (!form.checkValidity()) {
            return false;
        }

        Swal.fire({
            type: 'question',
            title: 'Are you sure?',
            text: '',
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true,
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText: 'Register (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {

                this.props.register_admin(this.state);

                Swal.fire({
                    title: 'Submitting...',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    }
                });
            }
        });

    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form id="admin_register_form" onSubmit={this.onSubmit}>

                        <FormGroup>
                            <Label for="register_username">Username: </Label>
                            <StringInput
                                id="register_username"
                                name="register_username"
                                value={this.state.register_username}
                                placeholder="Minimum 3 characters with no whitespace"
                                onChange={this.onChange}
                                required={true}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="register_email">Email: </Label>
                            <EmailInput
                                id="register_email"
                                name="register_email"
                                placeholder="test@gmail.com"
                                value={this.state.register_email}
                                onChange={this.onChange}
                                required={true}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="register_password">Password: </Label>
                            <PasswordInput
                                id="register_password"
                                name="register_password"
                                placeholder="Minimum 6 characters"
                                value={this.state.register_password}
                                onChange={this.onChange}
                                required={true}
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="register_c_password">Confirm Password: </Label>
                            <PasswordInput
                                id="register_c_password"
                                name="register_c_password"
                                placeholder="Required to be same with password"
                                value={this.state.register_c_password}
                                onChange={this.onChange}
                                required={true}
                            />
                        </FormGroup>

                        <Button color="primary" type="submit" block style={{marginTop: '15px'}}>Register</Button>
                    </Form>
                </div>
            </div>

        )
    }
}

Register.propTypes = {
    register_admin_response: PropTypes.any
};

const mapStateToProps = state => ({
    register_response: state.admin.register_admin_response
});

const mapDispatchToProps = ({
    register_admin
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);