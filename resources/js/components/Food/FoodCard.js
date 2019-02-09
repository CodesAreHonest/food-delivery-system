import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardImg, CardFooter, Col, Row, Label, Button, Form} from "reactstrap";
import NumberInput from "../Input/NumberInput";
import {CartLogo} from "../Logo/CartLogo";

import {connect} from 'react-redux';
import {add_cart} from "../../Member/Home/HomeAction";

class FoodCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            checkout_quantity: 1
        };

        this.quantityChange = this.quantityChange.bind(this);
        this.addCart = this.addCart.bind(this);
    }

    quantityChange (e) {
        if (e.target.value)
        this.setState({checkout_quantity: Math.floor(e.target.value)});
    }

    addCart(e) {
        e.preventDefault();

        const form = document.getElementById(e.target.id);

        if (!form.checkValidity()) {
            return false;
        }

        const data = {
            food_id: e.target.id,
            quantity: this.state.checkout_quantity,
            food_price: this.props.food_price
        };

        this.props.add_cart(data);
    }

    render() {

        return (

            <Card className={this.props.className}>
                <CardBody>

                    <Row>
                        <Col md={8} className="text-left">
                            <b>{this.props.food_name}</b>
                        </Col>

                        <Col md={4} className="text-right">
                            {this.props.food_price !== '' && `${this.props.food_price} MYR`}
                        </Col>
                    </Row>

                    <hr />

                    {this.props.image === null ? <h6 className="text-center">Food Image</h6> :
                        <CardImg
                            top
                            width="100%"
                            height="200px"
                            alt="Food Image"
                            src={this.props.image}
                        />}

                    <hr />

                    <div style={{marginTop: '5px'}}>
                        <p style={{fontSize: '12px'}}>{this.props.food_description}</p>
                    </div>

                </CardBody>

                <CardFooter>
                    <Form id={this.props.id} onSubmit={this.addCart}>
                    <Row>
                        <Label md={3}>Quantity </Label>
                        <Col md={4}>
                            <NumberInput
                                name="checkout_quantity"
                                id="checkout_quantity"
                                onChange={(e) => this.setState({checkout_quantity: e.target.value})}
                                value={this.state.checkout_quantity}
                                min={1}
                                max={9}
                                pattern="[0-9]"
                                disabled={this.props.quantity_disabled}
                                required
                            />
                        </Col>

                        <Col md={5} className="text-right">
                            <Button
                                type="submit"
                                color="success"
                                disabled={this.props.cart_disabled}
                                outline
                            >
                                <CartLogo width={25} height={25} />
                            </Button>
                        </Col>
                    </Row>
                    </Form>

                </CardFooter>
            </Card>

        )
    }
}

FoodCard.propTypes = {
    id: PropTypes.any,
    food_name: PropTypes.string,
    food_price: PropTypes.any,
    food_description: PropTypes.string,
    className: PropTypes.string,
    quantity_disabled: PropTypes.bool,
    cart_disabled: PropTypes.bool,
    image: PropTypes.string,
    category_name: PropTypes.string,

    add_cart_response: PropTypes.any,
    add_cart: PropTypes.func.isRequired,
};

FoodCard.defaultProps = {
    quantity_disabled: true,
    cart_disabled: true,
};

const mapStateToProps = state => ({
    add_cart_response: state.cart.add_cart_response,
});

const mapDispatchToProps = {
    add_cart
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodCard);