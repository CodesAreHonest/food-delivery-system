import React, {Component} from 'react';
import {Col, Row,Label,Button} from "reactstrap";
import {connect} from 'react-redux';

import PropTypes from 'prop-types';
import {update_order_list} from "./OrderAction";

class OrderItem extends Component {
    constructor(props) {
        super(props);

        this.acceptOrder = this.acceptOrder.bind(this);
        this.rejectOrder = this.rejectOrder.bind(this);
    }

    acceptOrder() {

        this.props.update_order_list(this.props.id,'shipped');
    }

    rejectOrder() {

        this.props.update_order_list(this.props.id,'delivered');
    }

    render() {

        const { food_name, id, address, quantity,status} = this.props;

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

                    <div className="button-click">

                        <Button color="primary" type="button" onClick={this.acceptOrder}>Accept</Button>

                        <Button color="primary" type="button" style={{marginLeft: '10px'}} onClick={this.rejectOrder}>Reject</Button>
                    </div>

                </Col>
            </Row>
        )
    }
}

OrderItem.propTypes = {
    id: PropTypes.number.isRequired,
    food_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    update_order_list: PropTypes.func.isRequired,
    update_order_response: PropTypes.any
};

const mapStateToProps = state => ({
    update_order_response: state.delivery.update_order_response,
});

const mapDispatchToProps = {
    update_order_list
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderItem);