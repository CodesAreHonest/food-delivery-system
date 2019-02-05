import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";
import {Col, Container, Row, Progress, Badge, Button} from "reactstrap";
import ReactSelect from "../../components/Input/ReactSelect";
import {delivery_options} from "../Home/MenuType";
import SearchInput from "../../components/Input/SearchInput";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";


class OrderHistory extends Component {
    constructor(props) {
        super (props);

        this.state = {
            delivery: {value: 'all', label: 'All'},
            date_from: null,
            date_to: null,
        };

        this.searchOrder = this.searchOrder.bind(this);
    }

    searchOrder() {

    }

    render() {
        return (
            <Fragment>
                <NavigationBar />

                <div className="search-division">
                    <Container>
                        <Row>
                            <Col md={2}>
                                <ReactSelect
                                    name="category"
                                    className="form-control"
                                    closeMenuOnSelect={true}
                                    options={delivery_options}
                                    value={this.state.delivery}
                                    onChange={delivery => this.setState({delivery})}
                                />
                            </Col>

                            <Col md={2}>
                                <DatePicker
                                    className="form-control"
                                    dropdownMode="select"
                                    selected={this.state.date_from}
                                    dateFormat="dd-MM-YYYY"
                                    placeholderText="Start Date"
                                    onSelect={date_from => this.setState({date_from})}
                                    onChange={date_from => this.setState({date_from})}
                                />
                            </Col>

                            <Col md={2}>
                                <DatePicker
                                    className="form-control"
                                    dropdownMode="select"
                                    selected={this.state.date_to}
                                    dateFormat="dd-MM-YYYY"
                                    placeholderText="End Date"
                                    onSelect={date_to => this.setState({date_to})}
                                    onChange={date_to => this.setState({date_to})}
                                />
                            </Col>

                            <Col md={6}>
                                <SearchInput
                                    onSearchClick={this.searchOrder}
                                    placeholder="Search Restaurant"
                                />
                            </Col>
                        </Row>


                    </Container>
                </div>

                <Container>

                    <div className="order-summary-division">
                        <Row>
                            <Col md={12} className="order-restaurant-name">
                                <Row>
                                    <Col md={6} style={{textAlign: 'left'}} className="border-bottom">
                                        <h5><b>Restaurant Name</b></h5>
                                    </Col>
                                    <Col md={5} className="border-bottom">
                                        <Progress animated color="info" value={25} style={{marginTop: '5px'}}/>
                                    </Col>
                                    <Col md={1} style={{textAlign: 'right'}} className="border-bottom">
                                        <h5 style={{color: 'white'}}><Badge color="info">Paid</Badge></h5>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={12} >
                                <Row className="food-items">
                                    <Col md={2} className="order-food-division">
                                        <img
                                            src="https://cdn0.iconfinder.com/data/icons/webshop-essentials/100/shopping-cart-512.png"
                                            className="order-food-image"
                                        />
                                    </Col>

                                    <Col md={8} className="order-food-information">
                                        <div className="order-food-name">
                                            <h4>Food Name</h4>

                                            <p><b>Paid at: </b>2019-09-20 12:00:00</p>

                                        </div>

                                        <div className="order-accept-division">
                                            <Button color="success">Delivery Received</Button>
                                        </div>
                                    </Col>

                                    <Col md={2} className="order-quantity-information">

                                        <div className="order-quantity-division">
                                            <h3>Quantity</h3>

                                            <h1><b>1</b></h1>
                                        </div>
                                    </Col>

                                </Row>
                            </Col>
                        </Row>
                    </div>

                </Container>

            </Fragment>

        )
    }
}

export default OrderHistory;