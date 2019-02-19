import React, {Component, Fragment} from 'react';

import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

import {Row, Col, FormGroup, Label, Form, Button} from 'reactstrap';

import {connect} from 'react-redux';
import {get_admin_detail} from "./ManagementAction";
import StringInput from "../../components/Input/StringInput";
import PasswordInput from "../../components/Input/PasswordInput";

class Management extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            email: '',
            password: '',
            c_password: '',
        };

        this.onChange = this.onChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
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
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    resetForm () {
        this.setState(this.defaultState);
    }

    render() {

        const {username, email, password, c_password} = this.state;

        return (
            <Fragment>
                <NavigationBar />

                <Sidebar feature="EditAdmin" />

                <div className="account-manage-content">
                    <section>

                        <Row>
                            <Col md={6}>
                                <div className="edit-profile-background">
                                    <Form id="edit_admin_form" >

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

                                    </Form>

                                    <Row>
                                        <Col md={6}>
                                            <Button color="success" block outline onClick={this.resetForm}>Clear</Button>
                                        </Col>

                                        <Col md={6}>
                                            <Button color="primary" block outline>Update</Button>
                                        </Col>
                                    </Row>

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
    detail: state.admin.detail
});

const mapDispatchToProps = {
    get_admin_detail
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);