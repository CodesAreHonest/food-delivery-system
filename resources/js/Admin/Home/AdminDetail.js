import React from 'react';
import {Card, CardBody, Col, Label, Row} from "reactstrap";

export const FoodDetail = props => {

    const {name, category, quantity, total_price} = props;
    return (
        <Card className="card-shadow">
            <CardBody>
                <h5 className="text-center"><b>Food Detail</b></h5>
                <hr />

                <Row>
                    <Label md={6}>Food Name:</Label>
                    <Label md={6}><b>{name}</b></Label>

                    <Label md={6}>Food Category:</Label>
                    <Label md={6}><b>{category}</b></Label>

                    <Label md={6}>Quantity:</Label>
                    <Label md={6}><b>{quantity}</b></Label>

                    <Label md={6}>Total Price:</Label>
                    <Label md={6}><b>RM {total_price}</b></Label>
                </Row>
            </CardBody>
        </Card>
    )
};


export const DeliveryDetail = props => {

    const {delivery_status, delivery_company, delivery_fee} = props;

    return (
        <Card className="card-shadow">
            <CardBody>
                <h5 className="text-center"><b>Delivery Detail</b></h5>
                <hr />

                <Row>
                    <Label md={6}>Delivery Company:</Label>
                    <Label md={6}><b>{delivery_company}</b></Label>

                    <Label md={6}>Delivery Fee:</Label>
                    <Label md={6}>RM <b>{delivery_fee}</b></Label>

                    <Label md={6}>Delivery Status:</Label>
                    <Label md={6}><b>{delivery_status}</b></Label>
                </Row>
            </CardBody>
        </Card>
    )
};