import React, {Component} from 'react';
import {Col, Row,Label,Button} from "reactstrap";
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {update_order_list} from "./OrderAction";
import Swal from "sweetalert2";

class OrderItem extends Component {
    constructor(props) {
        super(props);

        this.acceptOrder = this.acceptOrder.bind(this);
        this.rejectOrder = this.rejectOrder.bind(this);
    }

    acceptOrder() {

        Swal.fire({
            type: 'question',
            title: 'Are you sure you want to accept the order?',
            text: '',
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true,
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText: 'Yes (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {

                this.props.update_order_list(this.props.id,'shipped');

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

    rejectOrder() {

        Swal.fire({
            type: 'question',
            title: 'Are you sure you want to reject the order?',
            text: '',
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true,
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText: 'Yes (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#e3342f',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {

                this.props.update_order_list(this.props.id,'rejected');

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

        const { food_name, id, address, quantity,status} = this.props;

        const actionButtons = (
            <div className="button-click">

                <Button color="success" type="button" onClick={this.acceptOrder}>Accept</Button>

                <Button color="danger" type="button" style={{marginLeft: '10px'}} onClick={this.rejectOrder}>Reject</Button>
            </div>
        );

        return (
            <Row className="cart-division">

                <Col md={9} className="cart-information-division">

                    <div className="cart-food-name">
                        <h5><Label>Food Name: {food_name}</Label></h5>
                    </div>

                    <div className="cart-member-address">
                        <Label>Address: {address}</Label>
                    </div>

                    <div className="cart-quantity">
                        <Label>Quantity: {quantity}</Label>
                    </div>
                </Col>


                <Col md={3} className="cart-information-division">

                    <div className="cart-status">
                        <Label>Status: {status}</Label>
                    </div>

                    { status === 'paid' && actionButtons}

                </Col>
            </Row>
        )
    }
}

OrderItem.defaultProps = {
    status: ''
};

OrderItem.propTypes = {
    id: PropTypes.number.isRequired,
    food_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    update_order_list: PropTypes.func.isRequired,
    update_order_response: PropTypes.any
};

const mapDispatchToProps = {
    update_order_list
};

export default connect(null, mapDispatchToProps)(OrderItem);