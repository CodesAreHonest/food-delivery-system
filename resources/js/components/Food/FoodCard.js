import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Card, CardBody, CardImg, CardFooter, Col, Row, Label, Button, Badge} from "reactstrap";
import NumberInput from "../Input/NumberInput";

class FoodCard extends Component {
    constructor(props) {
        super(props);
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
                            alt="Food Image"
                            src={this.props.image}
                        />}

                    <hr />

                    <div style={{marginTop: '5px'}}>
                        {this.props.food_description}
                    </div>

                </CardBody>

                <CardFooter>
                    <Row>
                        <Label md={3}>Quantity </Label>
                        <Col md={3}>
                            <NumberInput
                                name="checkout_quantity"
                                id="checkout_quantity"
                                onChange={this.props.quantity_changes}
                                value={this.props.checkout_quantity}
                                min={0}
                                disabled={this.props.quantity_disabled}
                            />
                        </Col>

                        <Col md={6} className="text-right">
                            <Button
                                id={this.props.id}
                                color="success"
                                disabled={this.props.cart_disabled}
                            >Add to Cart</Button>
                        </Col>
                    </Row>

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
    checkout_quantity: PropTypes.any,
    quantity_disabled: PropTypes.bool,
    cart_disabled: PropTypes.bool,
    image: PropTypes.string,
    category_name: PropTypes.string,
    quantity_changes: PropTypes.func,
};

FoodCard.defaultProps = {
    checkout_quantity: 1,
    quantity_disabled: true,
    cart_disabled: true,
};

export default FoodCard;