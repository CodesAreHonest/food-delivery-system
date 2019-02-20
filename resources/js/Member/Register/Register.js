import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Col, Form, Label, Row} from "reactstrap";

// Form Input
import EmailInput from "../../components/Input/EmailInput";
import PasswordInput from "../../components/Input/PasswordInput";
import StringInput from "../../components/Input/StringInput";

import ReactSelect from "../../components/Input/ReactSelect";

import {connect} from 'react-redux';
import {register_member} from "./RegisterAction";
import Swal from "sweetalert2";

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            register_username: '',
            register_email: '',
            register_password: '',
            register_c_password: '',
            register_address: '',
            register_state: '',
            register_city: '',
            register_country: {value: 'malaysia', label: 'Malaysia'}
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

        let form = document.getElementById('member_register_form');

        if (!form.checkValidity()) {
            return false;
        }

        const data = new FormData(form);

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

                this.props.register_member(data);

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
                    <Form id="member_register_form" onSubmit={this.onSubmit}>

                        <h4 style={{textAlign: 'center'}}> Personal Information</h4>

                        <hr />

                        <Row>

                            <Col md={6}>
                                <Label for="register_username">Username: </Label>
                                <StringInput
                                    id="register_username"
                                    name="register_username"
                                    value={this.state.register_username}
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

Register.propTypes = {
    register_member_response: PropTypes.any
};

const mapStateToProps = state => ({
    register_response: state.member.register_member_response
});

const mapDispatchToProps = ({
    register_member
})

export default connect(mapStateToProps, mapDispatchToProps)(Register);