import React, {Component} from 'react';
import {Badge, Button, Col, Progress, Row} from "reactstrap";
import PropTypes from 'prop-types';
import OrderHistoryProgress from "./OrderHistoryProgress";

class OrderHistoryCard extends Component {
    constructor(props) {
        super (props);
    }

    render() {

        const {restaurant_name, delivery_status, food_image, food_name, paid_time, quantity} = this.props;

        return (

            <div id="order-summary" className="order-summary-division">
                <Row>
                    <Col md={12} className="order-restaurant-name">
                        <Row>
                            <Col md={6} style={{textAlign: 'left'}} className="border-bottom">
                                <h5><b>{restaurant_name}</b></h5>
                            </Col>
                            <Col md={5} className="border-bottom">
                                <OrderHistoryProgress
                                    animated={true}
                                    status={delivery_status}
                                    value={25}
                                    style={{marginTop: '5px'}}
                                />
                            </Col>
                            <Col md={1} style={{textAlign: 'right'}} className="border-bottom">
                                <h5 style={{color: 'white'}}><Badge color="info">{delivery_status}</Badge></h5>
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

                        <div className="order-accept-division">
                            <Button color="success">Delivery Received</Button>
                        </div>
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
    restaurant_name: PropTypes.string.isRequired,
    delivery_status: PropTypes.string.isRequired,
    food_image: PropTypes.string.isRequired,
    food_name: PropTypes.string.isRequired,
    paid_time: PropTypes.string.isRequired,
    quantity: PropTypes.string.isRequired
};

export default OrderHistoryCard;

