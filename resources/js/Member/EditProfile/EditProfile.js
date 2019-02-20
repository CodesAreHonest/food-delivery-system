import React, {Component, Fragment} from 'react';
import {Form, Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import EmailInput from "../../components/Input/EmailInput";
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";
import PasswordInput from "../../components/Input/PasswordInput";

import {connect} from 'react-redux';
import {get_user_profile, post_update_profile} from "./EditMemberAction";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class EditProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            c_password: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentDidMount() {
        this.props.get_user_profile();
    }

    componentDidUpdate(prevProps) {

        if (this.props.detail !== prevProps.detail) {

            const {s_username: username, s_email: email} = this.props.detail;

            this.setState ({
                username, email
            });
        }

        if (this.props.update_profile_response !== prevProps.update_profile_response) {

            const {msgType, msgTitle, msg} = this.props.update_profile_response.data;

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

            this.resetForm();
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {

        e.preventDefault();

        let form = document.getElementById('edit_member_profile_form');

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
            confirmButtonText: 'Update Profile (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {
                this.props.post_update_profile (this.state);

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

    resetForm() {

        const resetState = {
            password: '',
            c_password: ''
        };

        this.setState(resetState);
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Sidebar feature="EditProfile"/>

                <div className="account-manage-content">
                    <section>

                        <h3 style={{marginLeft: '5px'}}> Edit Profile </h3>
                        <hr />


                        <div className="edit-profile-background">
                            <Form id="edit_member_profile_form" onSubmit={this.onSubmit}>
                                <Row>
                                    <Col md={6}>
                                        <Label>Username: </Label>
                                        <StringInput
                                            name="username"
                                            id="username"
                                            value={this.state.username}
                                            onChange={this.onChange}
                                            className="form-control"
                                        />
                                    </Col>

                                    <Col md={6}>
                                        <Label>Email: </Label>
                                        <EmailInput
                                            name="email"
                                            id="email"
                                            className="form-control"
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            disabled={true}
                                        />
                                    </Col>

                                    <Col md={6} style={{marginTop: '20px'}}>
                                        <Label for="password">Password: </Label>
                                        <PasswordInput
                                            id="password"
                                            name="password"
                                            value={this.state.password}
                                            onChange={this.onChange}
                                            placeholder="Minimum 6 characters"
                                            required={true}
                                        />
                                    </Col>

                                    <Col md={6} style={{marginTop: '20px'}}>
                                        <Label for="c_password">Confirm Password: </Label>
                                        <PasswordInput
                                            id="c_password"
                                            name="c_password"
                                            value={this.state.c_password}
                                            onChange={this.onChange}
                                            placeholder="Required to be same with password"
                                            required={true}
                                        />
                                    </Col>
                                </Row>
                                <Button color="primary" type="submit" style={{marginTop: '20px'}}>Save Changes</Button>
                            </Form>
                        </div>
                    </section>
                </div>
            </Fragment>

        )
    }
}

EditProfile.propTypes = {
    get_user_profile: PropTypes.func.isRequired,
    post_update_profile: PropTypes.func.isRequired,
    detail: PropTypes.any,
    update_member_profile_response: PropTypes.any
};

const mapStateToProps = state => ({
    detail: state.member.detail,
    update_profile_response: state.member.update_member_profile_response
});

const mapDispatchToProps = {
    get_user_profile,
    post_update_profile
};


export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);