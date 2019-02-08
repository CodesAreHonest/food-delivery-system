import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';
import NavigationBar from "../NavigationBar/NavigationBar";
import {Link} from 'react-router-dom';

import {Container, Row, Col} from 'reactstrap';
import CartItem from "./CartItem";
import OrderSummary from "./OrderSummary";

import {connect} from 'react-redux';
import {get_cart} from "../../components/Cart/CartAction";

class ShoppingCart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cart: '',
            cart_total_delivery_fee: '',
            checkout_amount: '',
            cart_total_fee: '',
        };

        this.renderCart = this.renderCart.bind(this);
        this.emptyCart = this.emptyCart.bind(this);
    }

    emptyCart() {

        const empty_cart_layout = (
            <div className="text-center" style={{marginTop: '40px'}}>
                <h4>Your cart is empty, <Link to="/member">Order Your Food</Link> now ... </h4>
            </div>
        );

        this.setState({cart: empty_cart_layout});
    }

    renderCart(data) {

        const {cart_details, cart_total_delivery_fee, cart_total_fee} = data;

        const cart = cart_details.map((value, index) => {

            const {
                n_quantity,
                f_price,
                f_total_price,
                s_name,
                s_image,
                s_restaurant_name
            } = value;

            return (
                <CartItem
                    key={index}
                    image={s_image}
                    food_name={s_name}
                    restaurant_name={s_restaurant_name}
                    price={f_price}
                    quantity={n_quantity}
                    total_price={f_total_price}
                />
            );
        });

        const total_checkout_amount = parseFloat(cart_total_delivery_fee) + parseFloat(cart_total_fee);
        const checkout_amount = total_checkout_amount.toFixed(2);

        this.setState({
            cart, cart_total_fee, cart_total_delivery_fee, checkout_amount
        });

    }

    componentDidMount() {
        this.props.get_cart();
    }

    componentDidUpdate(prevProps) {

        if (this.props.cart_response !== prevProps.cart_response) {

            const {data} = this.props.cart_response;

            const {cart_amount} = data;

            if (cart_amount > 0)  {
                this.renderCart(data);
            }
            else {
                this.emptyCart();
            }
        }
    }

    render() {

        const {cart_total_fee, cart_total_delivery_fee, checkout_amount} = this.state;

        return (
            <Fragment>
                <NavigationBar />

                <Container>
                    <Row>
                        {this.state.cart !== null &&
                        <>
                            <Col md={8}>
                                {this.state.cart}
                            </Col>

                            <Col md={4} style={{marginBottom: '10px'}}>
                                <OrderSummary
                                    item_price = {cart_total_fee}
                                    delivery_fee = {cart_total_delivery_fee}
                                    total_price={checkout_amount}
                                />
                            </Col>
                        </>}

                    </Row>

                </Container>
            </Fragment>
        )
    }
}

ShoppingCart.propTypes = {
    get_cart: PropTypes.func.isRequired,
    cart_response: PropTypes.any

};

const mapStateToProps = state => ({
    cart_response: state.cart.cart_detail,
});

const mapDispatchToProps = {
    get_cart
};

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCart);