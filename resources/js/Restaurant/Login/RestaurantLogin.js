import React, {Component} from 'react';
import {Button, Col, Form, FormGroup, Label, Alert} from "reactstrap";
import PasswordInput from "../../components/Input/PasswordInput";

import PropTypes from 'prop-types';
import StringInput from "../../components/Input/StringInput";

import {login_restaurant} from "./RestaurantLoginAction";
import Swal from "sweetalert2";

import {connect} from 'react-redux';

class RestaurantLogin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurant_id: '',
            restaurant_password: '',
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
            window.location.href = '/restaurant/';
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

        let form = document.getElementById('restaurant_login_form');

        if (!form.checkValidity()) {
            return false;
        }

        this.props.login_restaurant(this.state);
    }

    render() {
        return (
            <div className="card">
                <div className="card-body">
                    <Form id="restaurant_login_form" onSubmit={this.onSubmit}>
                        <FormGroup row>
                            <Label for="restaurant_id" md={3}>Restaurant ID: </Label>
                            <Col md={9}>
                                <StringInput
                                    id="restaurant_id"
                                    name="restaurant_id"
                                    value={this.state.restaurant_id}
                                    onChange={this.onChange}
                                    placeholder="sukiya"
                                    required={true}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="password" md={3}>Password: </Label>
                            <Col md={9}>
                                <PasswordInput
                                    id="restaurant_password"
                                    name="restaurant_password"
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

RestaurantLogin.propTypes = {
    login_restaurant: PropTypes.func.isRequired,
    login_response: PropTypes.any
};

const mapStateToProps = state => ({
    login_response: state.restaurant.login_restaurant_response
});

const mapDispatchToProps = {
    login_restaurant
};



export default connect(mapStateToProps, mapDispatchToProps)(RestaurantLogin);