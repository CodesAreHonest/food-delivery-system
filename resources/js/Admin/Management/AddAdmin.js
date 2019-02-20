import React, {Component, Fragment} from 'react';

import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

import ReactTable from "react-table";
import {getTheadProps, getTrProps} from "../Home/AdminStyle";

import {connect} from 'react-redux';
import {get_admin_list, add_admin} from "./AddAdminAction";

import {Row, Col, Form, FormGroup, Label, Button} from 'reactstrap';
import StringInput from "../../components/Input/StringInput";
import PasswordInput from "../../components/Input/PasswordInput";
import Swal from "sweetalert2";
import EmailInput from "../../components/Input/EmailInput";

class Management extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            confirm_password: ''
        };

        this.defaultState = this.state;

        this.columns = [{
            Header: 'Created On',
            accessor: 'created_at'
        }, {
            Header: 'Username',
            accessor: 's_username'
        }, {
            Header: 'Email',
            accessor: 's_email'
        }, {
            Header: 'Role',
            accessor: 's_role'
        }];

        this.onSubmit = this.onSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
        this.onChange = this.onChange.bind(this);

    }

    componentDidMount() {
        this.props.get_admin_list();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.list !== this.props.list) {

            const {pageSize, data} = this.props.list;

            const table = (
                <ReactTable
                    manual
                    data = {data}
                    showPaginationTop = {false}
                    showPaginationBottom = {false}
                    showPageSizeOptions = {false}
                    pageSize={pageSize}
                    columns = {this.columns}
                    resizable = {false}
                    sortable = {false}
                    getTheadProps={getTheadProps}
                    getTrProps={getTrProps}
                />
            );

            this.setState({table});
        }

        if (prevProps.response !== this.props.response) {

            let {msgType, msgTitle, msg, response_code} = this.props.response.data;

            if (response_code === 200) {
                this.props.get_admin_list();
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

    onSubmit(e) {

        e.preventDefault();

        let form = document.getElementById('add_admin_form');

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
            confirmButtonText: 'Add Admin (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {

                this.props.add_admin(data);

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

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    resetForm() {
        this.setState(this.defaultState);
    }

    render() {

        const {table, username, email, password, confirm_password} = this.state;

        return (
            <Fragment>
                <NavigationBar />

                <Sidebar feature="AddAdmin" />

                <div className="account-manage-content">
                    <section>

                        <Row>
                            <Col md={5}>
                                <div className="edit-profile-background">
                                    <Form id="add_admin_form" onSubmit={this.onSubmit}>
                                        <FormGroup>
                                            <Label for="username">Username:</Label>

                                            <StringInput
                                                name="username"
                                                id="username"
                                                value={username}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="email">Email:</Label>

                                            <EmailInput
                                                name="email"
                                                id="email"
                                                value={email}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="password">Password:</Label>

                                            <PasswordInput
                                                name="password"
                                                id="password"
                                                value={password}
                                                onChange={this.onChange}
                                            />
                                        </FormGroup>

                                        <FormGroup>
                                            <Label for="c_password">Confirm Password:</Label>

                                            <PasswordInput
                                                name="confirm_password"
                                                id="confirm_password"
                                                onChange={this.onChange}
                                                value={confirm_password}
                                            />
                                        </FormGroup>

                                        <Button color="primary" type="submit" block outline>Add Admin</Button>

                                    </Form>
                                </div>
                            </Col>

                            <Col md={7}>
                                <div className="edit-profile-background">
                                    {table}
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
    list: state.admin.list,
    response: state.admin.add_admin_response
});

const mapDispatchToProps = {
    get_admin_list, add_admin
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);