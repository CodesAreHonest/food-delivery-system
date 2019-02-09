import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {Button, Col, Form, Label, Row} from "reactstrap";

import {register_delivery} from "./DeliveryRegisterAction";

// Form Input
import PasswordInput from "../../components/Input/PasswordInput";
import StringInput from "../../components/Input/StringInput";
import TextArea from "../../components/Input/TextArea";
import Swal from "sweetalert2";

import {connect} from 'react-redux';

class DeliveryRegister extends Component {
    constructor(props) {
        super(props);

        this.state = {
            delivery_register_username: '',
            delivery_name: '',
            delivery_register_password: '',
            delivery_c_password: '',
            delivery_address: '',
            delivery_com_detail:''
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

        if (prevProps.register_delivery_response !== this.props.register_delivery_response) {

            let {msgType, msgTitle, msg, response_code} = this.props.register_delivery_response.data;

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

        let form = document.getElementById('delivery_register_form');

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

                this.props.register_delivery(this.state);

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
                    <Form id="delivery_register_form" onSubmit={this.register}>
                        <Row>
                            <Col md={6}>
                                <Label for="delivery_register_username">Delivery Username: </Label>
                                <StringInput
                                    id="delivery_register_username"
                                    name="delivery_register_username"
                                    value={this.state.delivery_register_username}
                                    onChange={this.onChange}
                                    placeholder="Minimum 3 characters"
                                    required={true}
                                />
                            </Col>

                            <Col md={6}>
                                <Label for="delivery_name">Delivery Name: </Label>
                                <StringInput
                                    id="delivery_name"
                                    name="delivery_name"
                                    placeholder="Username"
                                    value={this.state.delivery_name}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '20px'}}>
                                <Label for="delivery_register_password">Password: </Label>
                                <PasswordInput
                                    id="delivery_register_password"
                                    name="delivery_register_password"
                                    placeholder="Minimum 6 characters"
                                    value={this.state.delivery_register_password}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={6} style={{marginTop: '20px'}}>
                                <Label for="delivery_c_password">Confirm Password: </Label>
                                <PasswordInput
                                    id="delivery_c_password"
                                    name="delivery_c_password"
                                    placeholder="Required to be same with password"
                                    value={this.state.delivery_c_password}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={12} style={{marginTop: '20px'}}>
                                <Label for="delivery_address">Address: </Label>
                                <TextArea
                                    id="delivery_address"
                                    style={{minWidth: '100%', minHeight: '40px', mfarginBottom: '20px'}}
                                    name="delivery_address"
                                    placeholder="552 Meadowbrook Ave. Florence, SC 29501"
                                    value={this.state.delivery_address}
                                    onChange={this.onChange}
                                    required={true}
                                />
                            </Col>

                            <Col md={12} style={{marginTop: '20px'}}>
                                <Label for="delivery_com_detail">Company Description: </Label>
                                <TextArea
                                    id="delivery_com_detail"
                                    style={{minWidth: '100%', minHeight: '40px', mfarginBottom: '20px'}}
                                    name="delivery_com_detail"
                                    placeholder="my company is the best"
                                    value={this.state.delivery_com_detail}
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

DeliveryRegister.propTypes = {
    register_delivery: PropTypes.func.isRequired,
    register_delivery_response: PropTypes.any,
};

const mapStateToProps = state => ({
    register_delivery_response: state.delivery.register_delivery_response,
});

const mapDispatchToProps = {
    register_delivery
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryRegister);