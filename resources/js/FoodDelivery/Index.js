import React, {Component} from 'react';
import {Container, Row, Col, Button} from 'reactstrap';
import {Link} from 'react-router-dom';

export default class Index extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <h1 style={{textAlign: 'center', marginTop: '20px'}}>GOGO Delivery System</h1>

                <hr />

                <Row>
                    <Col md={4} className="feature-background">
                        <h4> Restaurant Site </h4>
                        <hr />

                        <ul>
                            <li>Authentication</li>
                            <ul>
                                <li>Login</li>
                                <li>Register</li>
                                <li>Sign Out</li>
                            </ul>
                            <li>Add Food</li>
                            <li>Edit Profile</li>
                        </ul>

                        <Link to="/restaurant/login">
                            <Button color="info" outline block>Restaurant Login</Button>
                        </Link>
                    </Col>

                    <Col md={4} className="feature-background">
                        <h4> Member Site </h4>
                        <hr />

                        <ul>
                            <li>Authentication</li>
                            <ul>
                                <li>Login</li>
                                <li>Register</li>
                                <li>Sign Out</li>
                            </ul>
                            <li>Food Menu with <b>Advanced Filtering and Search</b></li>
                            <li>Shopping Cart</li>
                            <li>Order Check Out</li>
                            <li>Profile Management</li>
                            <ul>
                                <li>Location Information</li>
                                <li>Edit Profile</li>
                                <li>Credit Card Management</li>
                            </ul>
                            <li>Food Order Tracking with <b>Advanced Filtering and Search</b></li>
                            <li>Delivery Tracking and Acceptance</li>
                        </ul>

                        <Link to="/member/login">
                            <Button color="primary" outline block>Member Login</Button>
                        </Link>
                    </Col>

                    <Col md={4} className="feature-background">
                        <h4> Delivery Site </h4>
                        <hr />

                        <ul>
                            <li>Authentication</li>
                            <ul>
                                <li>Login</li>
                                <li>Register</li>
                                <li>Sign Out</li>
                            </ul>
                            <li>Delivery Management</li>
                            <ul>
                                <li>Accept Order</li>
                                <li>Reject Order</li>
                            </ul>
                        </ul>

                        <Link to="/delivery/login">
                            <Button color="success" outline block>Delivery Login</Button>
                        </Link>
                    </Col>
                </Row>
            </Container>
        )
    }
}