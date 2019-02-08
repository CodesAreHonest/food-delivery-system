import React, {Component} from 'react';
import {Col, Row} from "reactstrap";

import PropTypes from 'prop-types';

class CartItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        const {image, food_name, restaurant_name, price, quantity, total_price} = this.props;

        return (
            <Row className="cart-division">
                <Col md={2} className="cart-food-division">
                    <div className="cart-food">

                        {image !== null &&
                        <img
                            src={image}
                            alt="Food Image"
                            className="cart-food-image"
                        />}

                    </div>
                </Col>

                <Col md={7} className="cart-information-division">

                    <div className="cart-food-name">
                        <h5>{food_name}</h5>
                    </div>

                    <div className="cart-restaurant-name">
                        {restaurant_name}
                    </div>
                </Col>

                <Col md={3} className="cart-price-division">

                    <div className="cart-price">
                        <table>
                            <tbody>
                            <tr>
                                <td align="left"><b>Price</b></td>
                                <td align="right">{price}</td>
                            </tr>
                            <tr>
                                <td align="left"><b>Quantity</b></td>
                                <td align="right">{quantity}</td>
                            </tr>
                            <tr className="total-row">
                                <td align="left"><b>Total</b></td>
                                <td align="right">{total_price}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>

                </Col>
            </Row>
        )
    }
}

CartItem.propTypes = {
    image: PropTypes.string.isRequired,
    food_name: PropTypes.string.isRequired,
    restaurant_name: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    total_price: PropTypes.string.isRequired,
};

export default CartItem;