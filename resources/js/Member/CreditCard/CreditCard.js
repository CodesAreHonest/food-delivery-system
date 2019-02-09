import React, {Component, Fragment} from 'react';
import {Row, Col, Label, Button, Form, UncontrolledAlert} from 'reactstrap';
import PropTypes from 'prop-types';

import StringInput from "../../components/Input/StringInput";
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

import {connect} from 'react-redux';
import {get_user_profile, post_update_credit_card} from "../EditProfile/EditMemberAction";
import Swal from "sweetalert2";

class CreditCard extends Component {
    constructor(props){
        super(props);

        this.state = {
            b_card_information: false,
            card_name: '',
            card_number: '',
            expired_input: '',
            cvc: '',
        };

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.get_user_profile();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.detail !== this.props.detail) {

            const {
                b_card_information,
                s_card_name: card_name,
                s_card_number: card_number,
                s_expired_date: expired_input,
                n_cvc: cvc
            } = this.props.detail;

            if (b_card_information) {

                this.setState({
                    b_card_information,
                    card_name,
                    card_number,
                    expired_input,
                    cvc
                });
            }
            else {
                const alert = (
                    <UncontrolledAlert color="info">We noticed you have yet to update your credit card information. </UncontrolledAlert>
                );

                this.setState({alert});
            }
        }

        if (prevProps.update_response !== this.props.update_response) {

            const {msgType, msgTitle, msg, card_updated} = this.props.update_response.data;

            if (card_updated) {
                this.setState({alert: null});
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
            });

        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value})
    }

    onSubmit(e) {

        e.preventDefault();

        let form = document.getElementById('update_credit_card_form');

        if (!form.checkValidity()) { return false; }

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
            confirmButtonText: 'Update Credit Card (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {
                this.props.post_update_credit_card(this.state);

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

            <Fragment>
                <NavigationBar/>

                <Sidebar feature="CreditCard" />

                <div className="account-manage-content">
                    <section>

                        <h3 style={{marginLeft: '5px'}}> Credit Card </h3>
                        <hr />

                        <div className="edit-profile-background">

                            {this.state.alert}

                            <Form id="update_credit_card_form" onSubmit={this.onSubmit}>
                                <Row>
                                    <Col md={4}>
                                        <Label>Card Name: </Label>
                                        <StringInput
                                            name="card_name"
                                            id="card_name"
                                            className="form-control"
                                            value={this.state.card_name}
                                            onChange={this.onChange}
                                            placeholder="Ali bin Ahmad"
                                            required
                                        />
                                    </Col>

                                    <Col md={4}>
                                        <Label>Card Number: </Label>
                                        <StringInput
                                            name="card_number"
                                            id="card_number"
                                            className="form-control"
                                            value={this.state.card_number}
                                            onChange={this.onChange}
                                            placeholder="8888 8888 8888 8888"
                                            required
                                        />
                                    </Col>

                                    <Col md={2}>
                                        <Label>Expired Date: </Label>
                                        <StringInput
                                            name="expired_input"
                                            id="expired_input"
                                            className="form-control"
                                            placeholder="MM/YY"
                                            maxLength="5"
                                            onChange={this.onChange}
                                            value={this.state.expired_input}
                                            required
                                        />
                                    </Col>

                                    <Col md={2}>
                                        <Label>CVC: </Label>
                                        <StringInput
                                            name="cvc"
                                            id="cvc"
                                            className="form-control"
                                            placeholder="133"
                                            maxLength="3"
                                            value={this.state.cvc}
                                            onChange={this.onChange}
                                            required
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

CreditCard.propTypes = {
    detail: PropTypes.any,
    get_user_profile: PropTypes.func.isRequired,
    update_member_card_response: PropTypes.any,
    post_update_credit_card: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    detail: state.member.detail,
    update_response: state.member.update_member_card_response
});

const mapDispatchToProps = {
    get_user_profile,
    post_update_credit_card
};

export default connect(mapStateToProps, mapDispatchToProps)(CreditCard);