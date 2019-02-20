import React, {Component, Fragment} from 'react';
import {Container, Form, Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import NavigationBar from "../NavigationBar/NavigationBar";
import TextArea from "../../components/Input/TextArea";

import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {get_restaurant_detail, update_restaurant_detail} from "./EditRestaurantAction";
import Swal from "sweetalert2";

class EditRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurant_id: '',
            restaurant_name: '',
            address: '',
            name_disabled: true,
            address_disabled: true
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.enableModification =  this.enableModification.bind(this);
        this.disableModification =  this.disableModification.bind(this);
    }

    componentDidMount() {
        this.props.get_restaurant_detail();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.restaurant_detail !== this.props.restaurant_detail) {

            const {
                s_restaurant_id,
                s_restaurant_name,
                s_address
            } = this.props.restaurant_detail;

            this.setState({
                restaurant_id: s_restaurant_id,
                restaurant_name: s_restaurant_name,
                address: s_address,
            });
        }

        if (prevProps.update_restaurant_response !== this.props.update_restaurant_response) {

            let {msgType, msgTitle, msg} = this.props.update_restaurant_response.data;

            Swal.fire({
                type: msgType,
                title: msgTitle,
                text: msg,
                allowOutsideClick: false,
                showConfirmButton: true,
                allowEnterKey: true,
                confirmButtonText: 'Ok',
                timer: 2000
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    onSubmit(e) {

        e.preventDefault();

        let form = document.getElementById('edit_restaurant_profile_form');

        if (!form.checkValidity()) {
            return false;
        }

        Swal.fire({
            type: 'warning',
            title: 'Are you sure?',
            text: '',
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true,
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText: 'Update Profile(Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {
                this.props.update_restaurant_detail(this.state.restaurant_name, this.state.address);

                Swal.fire({
                    title: 'Submitting...',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    }
                });

                this.disableModification();
            }
        });

    }

    enableModification() {
        this.setState({
            name_disabled: false,
            address_disabled: false,
        })
    }

    disableModification() {
        this.setState({
            name_disabled: true,
            address_disabled: true,
        })
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Container style={{marginTop: '20px'}}>
                    <section>

                        <h3 style={{marginLeft: '5px'}}>Edit Restaurant Profile</h3>
                        <hr />

                        <div className="edit-profile-background">
                            <Form id="edit_restaurant_profile_form" onSubmit={this.onSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Label>Restaurant ID: </Label>
                                        <StringInput
                                            name="restaurant_id"
                                            id="restaurant_id"
                                            className="form-control"
                                            value={this.state.restaurant_id}
                                            disabled={true}
                                            required={true}
                                        />
                                    </Col>

                                    <Col md={6}>
                                        <Label>Restaurant Name: </Label>
                                        <StringInput
                                            name="restaurant_name"
                                            id="restaurant_name"
                                            className="form-control"
                                            value={this.state.restaurant_name}
                                            onChange={this.onChange}
                                            disabled={this.state.name_disabled}
                                            required={true}
                                        />
                                    </Col>

                                    <Col md={12} style={{marginTop: '20px'}}>
                                        <Label for="register_address">Address: </Label>
                                        <TextArea
                                            id="register_address"
                                            style={{minWidth: '100%', minHeight: '40px', mfarginBottom: '20px'}}
                                            name="address"
                                            value={this.state.address}
                                            onChange={this.onChange}
                                            disabled={this.state.address_disabled}
                                            required={true}
                                        />
                                    </Col>
                                </Row>

                                <Button color="success" type="button" style={{marginTop: '20px', marginRight: '20px'}} onClick={this.enableModification}>Update</Button>

                                <Button color="primary" type="submit" style={{marginTop: '20px'}}>Save Changes</Button>

                            </Form>
                        </div>
                    </section>
                </Container>
            </Fragment>

        )
    }
}

EditRestaurant.propTypes = {
    restaurant_detail: PropTypes.any,
    update_restaurant_detail: PropTypes.func.isRequired,
    update_restaurant_response: PropTypes.any,
};

const mapStateToProps = state => ({
    restaurant_detail: state.restaurant.restaurant_detail,
    update_restaurant_response: state.restaurant.update_restaurant_response
});

const mapDispatchToProps = {
    get_restaurant_detail, update_restaurant_detail
};
export default connect(mapStateToProps, mapDispatchToProps)(EditRestaurant);