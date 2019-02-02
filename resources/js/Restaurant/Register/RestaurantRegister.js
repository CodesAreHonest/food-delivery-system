import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, Col, Form, Label, Row} from "reactstrap";

import {register_restaurant} from "./RestaurantRegisterAction";

// Form Input
import PasswordInput from "../../components/Input/PasswordInput";
import StringInput from "../../components/Input/StringInput";
import TextArea from "../../components/Input/TextArea";
import Swal from "sweetalert2";

import {connect} from 'react-redux';

class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            register_username: '',
            register_restaurant_name: '',
            register_password: '',
            register_c_password: '',
            register_address: ''
        };

        this.onChange = this.onChange.bind(this);
        this.register = this.register.bind(this);
        this.resetForm = this.resetForm.bind(this);

        this.defaultState = this.state;
    }

    resetForm() {
        this.setState(this.defaultState);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.register_restaurant_response !== this.props.register_restaurant_response) {

            let {msgType, msgTitle, msg, response_code} = this.props.register_restaurant_response.data;

            Swal.fire({
                type: msgType,
                title: msgTitle,
                text: msg,
                allowOutsideClick: false,
                showConfirmButton: true,
                allowEnterKey: true,
                confirmButtonText: 'Ok',
                timer: 2000
            }).then (() => {

                if (response_code === 200) {
                    this.resetForm();
                }
            })
        }

    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    register(e) {

        e.preventDefault();

        let form = document.getElementById('restaurant_register_form');

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

                this.props.register_restaurant(this.state);

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
                    <Form id="restaurant_register_form" onSubmit={this.register}>
                        <Row>
                            <Col md={6}>
                                <Label for="register_restaurant_id">Restaurant ID: </Label>
                                <StringInput
                                    id="register_username"
                                    name="register_username"
                                    value={this.state.register_username}
                                    onChange={this.onChange}
                                    placeholder="Minimum 3 characters"
                                    required={true}
                                />
                            </Col>

                            <Col md={6}>
                                <Label for="register_restaurant_name">Restaurant Name: </Label>
                                <StringInput
                                    id="register_restaurant_name"
                                    name="register_restaurant_name"
                                    placeholder="ABC Restaurant"
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '20px'}}>
                                <Label for="register_password">Password: </Label>
                                <PasswordInput
                                    id="register_password"
                                    name="register_password"
                                    placeholder="Minimum 6 characters"
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '20px'}}>
                                <Label for="register_c_password">Confirm Password: </Label>
                                <PasswordInput
                                    id="register_c_password"
                                    name="register_c_password"
                                    placeholder="Required to be same with password"
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={12} style={{marginTop: '20px'}}>
                                <Label for="register_address">Address: </Label>
                                <TextArea
                                    id="register_address"
                                    style={{minWidth: '100%', minHeight: '40px', mfarginBottom: '20px'}}
                                    name="register_address"
                                    placeholder="552 Meadowbrook Ave. Florence, SC 29501"
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>
                        </Row>

                        <Button color="primary" type="submit" block style={{marginTop: '20px'}}>Register</Button>
                    </Form>
                </div>
            </div>

        )
    }
}

Register.propTypes = {
    register_restaurant: PropTypes.func.isRequired,
    register_restaurant_response: PropTypes.any,
};

const mapStateToProps = state => ({
    register_restaurant_response: state.restaurant.register_restaurant_response,
});

const mapDispatchToProps = {
    register_restaurant
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);