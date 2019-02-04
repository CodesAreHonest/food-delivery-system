import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";

import {Container, Row, Col} from 'reactstrap';

class ShoppingCart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Fragment>
                <NavigationBar />

                <Container>
                    <Row>
                        <Col md={9}>
                            <Row className="cart-division">
                                <Col md={2} className="cart-food-division">
                                    <div className="cart-food">
                                        <img
                                            src="https://cdn0.iconfinder.com/data/icons/webshop-essentials/100/shopping-cart-512.png"
                                            alt="Food Image"
                                            className="cart-food-image"
                                        />
                                    </div>
                                </Col>

                                <Col md={7} className="cart-information-division">

                                    <div className="cart-food-name">
                                        <h5>Food Name</h5>
                                    </div>

                                    <div className="cart-restaurant-name">
                                        Restaurant Name
                                    </div>
                                </Col>

                                <Col md={3} className="cart-price-division">

                                    <div className="cart-price">
                                        <table>
                                            <tr>
                                                <td><b>Price</b></td>
                                                <td>12.00</td>
                                            </tr>
                                            <tr>
                                                <td><b>Quantity</b></td>
                                                <td>1</td>
                                            </tr>
                                            <tr className="total-row">
                                                <td><b>Total</b></td>
                                                <td>12.00</td>
                                            </tr>
                                        </table>
                                    </div>

                                </Col>
                            </Row>
                        </Col>

                        <Col md={3}>
                            <div className="checkout-division">
                                123
                            </div>
                        </Col>
                    </Row>

                </Container>
            </Fragment>
        )
    }
}

export default ShoppingCart;