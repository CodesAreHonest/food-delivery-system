import React, {Component} from 'react';
import {Badge, Button, Col, Progress, Row} from "reactstrap";
import PropTypes from 'prop-types';
import OrderHistoryProgress from "./OrderHistoryProgress";
import Swal from "sweetalert2";

import {order_received} from "./OrderHistoryAction";
import {connect} from 'react-redux';

class OrderHistoryCard extends Component {
    constructor(props) {
        super (props);

        this.state = {
            color: ''
        };

        this.renderLayout = this.renderLayout.bind(this);
        this.orderReceived = this.orderReceived.bind(this);
    }

    componentDidMount() {
        this.renderLayout(this.props.delivery_status);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.delivery_status !== this.props.delivery_status) {
            this.renderLayout(this.props.delivery_status);
        }
    }

    renderLayout(delivery_status) {

        switch (delivery_status) {
            case 'paid':
                this.setState({color: 'info', value: 35});
                break;
            case 'shipped':
                this.setState({color: 'primary', value: 70});
                break;
            case 'delivered':
                this.setState({color: 'success', value: 100});
                break;
            case 'rejected':
                this.setState({color: 'danger', value: 100});
                break;
        }
    }

    orderReceived (e) {

        const id = e.target.id;

        Swal.fire({
            type: 'question',
            title: 'Are you sure?',
            text: `Do you receive ${this.props.food_name} from ${this.props.restaurant_name} ? `,
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

                this.props.order_received(id);

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

        const {id, restaurant_name, delivery_status, food_image, food_name, paid_time, quantity} = this.props;

        return (

            <div id="order-summary" className="order-summary-division card-shadow">
                <Row>
                    <Col md={12} className="order-restaurant-name">
                        <Row>
                            <Col md={6} style={{textAlign: 'left'}} className="border-bottom">
                                <h5><b>{restaurant_name}</b></h5>
                            </Col>
                            <Col md={5} className="border-bottom">
                                <OrderHistoryProgress
                                    animated={true}
                                    color={this.state.color}
                                    value={this.state.value}
                                    style={{marginTop: '5px'}}
                                />
                            </Col>
                            <Col md={1} style={{textAlign: 'right'}} className="border-bottom">
                                <h5 style={{color: 'white'}}>
                                    <Badge color={this.state.color}>{delivery_status}</Badge>
                                </h5>
                            </Col>
                        </Row>
                    </Col>
                </Row>

                <Row className="food-items">
                    <Col md={2} className="order-food-division">
                        <img
                            src={food_image}
                            className="order-food-image"
                        />
                    </Col>

                    <Col md={8} className="order-food-information">
                        <div className="order-food-name">
                            <h4>{food_name}</h4>

                            <p><b>Paid on: </b>{paid_time}</p>

                        </div>

                        {
                            this.props.delivery_status === 'shipped' &&
                            <div className="order-accept-division">
                                <Button color="success" id={id} onClick={this.orderReceived}>Delivery Received</Button>
                            </div>
                        }
                    </Col>

                    <Col md={2} className="order-quantity-information">

                        <div className="order-quantity-division">
                            <h3>Quantity</h3>

                            <h1><b>{quantity}</b></h1>
                        </div>
                    </Col>

                </Row>
            </div>

        )
    }
}

OrderHistoryCard.propTypes = {
    id: PropTypes.any.isRequired,
    restaurant_name: PropTypes.string.isRequired,
    delivery_status: PropTypes.string.isRequired,
    food_image: PropTypes.string.isRequired,
    food_name: PropTypes.string.isRequired,
    paid_time: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired,

    order_received: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    order_received
};

export default connect(null, mapDispatchToProps)(OrderHistoryCard);

