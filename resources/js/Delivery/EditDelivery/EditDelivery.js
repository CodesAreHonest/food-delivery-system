import React, {Component, Fragment} from 'react';
import {Container, Form, Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import NavigationBar from "../NavigationBar/NavigationBar";
import TextArea from "../../components/Input/TextArea";

import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {get_delivery_detail, update_delivery_detail} from "./EditDeliveryAction";
import Swal from "sweetalert2";

class EditDelivery extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            delivery_name: '',
            address: '',
            com_description: '',
            name_disabled: true,
            address_disabled: true,
            description_disabled:true
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.enableModification =  this.enableModification.bind(this);
        this.disableModification =  this.disableModification.bind(this);
    }

    componentDidMount() {
        this.props.get_delivery_detail();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.delivery_detail !== this.props.delivery_detail) {

            const {
                s_username,
                s_name,
                s_address,
                s_com_description
            } = this.props.delivery_detail;

            this.setState({
                username: s_username,
                delivery_name: s_name,
                address: s_address,
                com_description: s_com_description,
            });
        }

        if (prevProps.update_delivery_response !== this.props.update_delivery_response) {

            let {msgType, msgTitle, msg} = this.props.update_delivery_response.data;

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

        let form = document.getElementById('edit_delivery_profile_form');

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
                this.props.update_delivery_detail(this.state.delivery_name, this.state.address,this.state.com_description);

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
            description_disabled:false,
        })
    }

    disableModification() {
        this.setState({
            name_disabled: true,
            address_disabled: true,
            description_disabled:true,
        })
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Container style={{marginTop: '20px'}}>
                    <section>

                        <h3 style={{marginLeft: '5px'}}>Edit Delivery Profile</h3>
                        <hr />

                        <div className="edit-profile-background">
                            <Form id="edit_delivery_profile_form" onSubmit={this.onSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Label>Delivery Username: </Label>
                                        <StringInput
                                            name="username"
                                            id="username"
                                            className="form-control"
                                            value={this.state.username}
                                            disabled={true}
                                            required={true}
                                        />
                                    </Col>

                                    <Col md={6}>
                                        <Label>Delivery Name: </Label>
                                        <StringInput
                                            name="delivery_name"
                                            id="delivery_name"
                                            className="form-control"
                                            value={this.state.delivery_name}
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

                                     <Col md={12} style={{marginTop: '20px'}}>
                                        <Label>Company Description: </Label>
                                        <TextArea
                                            id="com_description"
                                            style={{minWidth: '100%', minHeight: '40px', mfarginBottom: '20px'}}
                                            name="com_description"
                                            value={this.state.com_description}
                                            onChange={this.onChange}
                                            disabled={this.state.description_disabled}
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

EditDelivery.propTypes = {
    delivery_detail: PropTypes.any,
    update_delivery_detail: PropTypes.func.isRequired,
    update_delivery_response: PropTypes.any,
};

const mapStateToProps = state => ({
    delivery_detail: state.delivery.get_delivery_response,
    update_delivery_response: state.delivery.update_delivery_response
});

const mapDispatchToProps = {
    get_delivery_detail, update_delivery_detail
};
export default connect(mapStateToProps, mapDispatchToProps)(EditDelivery);