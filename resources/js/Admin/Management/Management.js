import React, {Component, Fragment} from 'react';

import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

import {Row, Col, FormGroup, Label, Form, Button} from 'reactstrap';

import {connect} from 'react-redux';
import {get_admin_detail, update_admin_detail} from "./ManagementAction";
import StringInput from "../../components/Input/StringInput";
import PasswordInput from "../../components/Input/PasswordInput";

import Swal from "sweetalert2";

class Management extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            c_password: '',
            role: ''
        };

        this.onChange = this.onChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.get_admin_detail();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.detail !== this.props.detail) {

            const {
                s_username: username,
                s_email: email,
                s_role: role
            } = this.props.detail;

            this.setState({
                username, email, role
            }, () => {
                this.defaultState = this.state;
            });

        }

        if (prevProps.response !== this.props.response) {

            const {msgType, msgTitle, msg} = this.props.response.data;

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

    resetForm () {
        this.setState(this.defaultState);
    }

    onSubmit(e) {

        e.preventDefault();

        let form = document.getElementById('edit_admin_form');

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
                this.props.update_admin_detail (this.state);

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

        const {username, email, password, c_password, role} = this.state;

        return (
            <Fragment>
                <NavigationBar />

                <Sidebar feature="EditAdmin" role={role}/>

                <div className="account-manage-content">
                    <section>

                        <Row>
                            <Col md={6}>
                                <div className="edit-profile-background">
                                    <Form id="edit_admin_form" onSubmit={this.onSubmit}>

                                        <FormGroup>
                                            <Label for="email">Email: </Label>

                                            <StringInput
                                                name="email"
                                                id="email"
                                                value={email}
                                                onChange={this.onChange}
                                                disabled={true}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="username">Username: </Label>

                                            <StringInput
                                                name="username"
                                                id="username"
                                                value={username}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="password">Password: </Label>

                                            <PasswordInput
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={this.onChange}
                                            />

                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="c_password">Confirm Password: </Label>

                                            <PasswordInput
                                                name="c_password"
                                                id="c_password"
                                                value={c_password}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>

                                        <FormGroup row>

                                            <Col md={6}>
                                                <Button color="success" block outline onClick={this.resetForm}>Clear</Button>

                                            </Col>

                                            <Col md={6}>
                                                <Button color="primary" type="submit" block outline>Update</Button>
                                            </Col>

                                        </FormGroup>


                                    </Form>


                                </div>
                            </Col>
                        </Row>
                    </section>
                </div>

            </Fragment>
        )

    }

}

const mapStateToProps = state => ({
    detail: state.admin.detail,
    response: state.admin.update_admin_response,
});

const mapDispatchToProps = {
    get_admin_detail,
    update_admin_detail
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);