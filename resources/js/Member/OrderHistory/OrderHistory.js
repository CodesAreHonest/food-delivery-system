import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";
import {Col, Container, Row} from "reactstrap";
import ReactSelect from "../../components/Input/ReactSelect";
import {delivery_options} from "../Home/MenuType";
import SearchInput from "../../components/Input/SearchInput";

import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

import {connect} from 'react-redux';
import {order_summary} from "./OrderHistoryAction";
import OrderHistoryCard from "./OrderHistoryCard";

class OrderHistory extends Component {
    constructor(props) {
        super (props);

        this.state = {
            delivery: {value: 'all', label: 'All'},
            date_from: null,
            date_to: null,
        };

        this.renderLayout = this.renderLayout.bind(this);
    }

    componentDidMount() {
        this.props.order_summary();
    }

    componentDidUpdate (prevProps) {

        if (prevProps.summary_detail !== this.props.summary_detail) {
            this.renderLayout(this.props.summary_detail)
        }
    }

    renderLayout(summary_detail) {

        let orderSummary = summary_detail.map((value, key) => {

            const {
                s_image: food_image,
                s_delivery_status: delivery_status,
                dt_paid: paid_time,
                s_name: food_name,
                s_restaurant_name: restaurant_name,
                total_quantity: quantity
            } = value;

            return (
                <OrderHistoryCard
                    key={key}
                    restaurant_name={restaurant_name}
                    delivery_status={delivery_status}
                    food_name={food_name}
                    food_image={food_image}
                    paid_time={paid_time}
                    quantity={quantity}
                />
            )
        });

        this.setState({orderSummary});
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

                    {this.state.orderSummary}


                </Container>

            </Fragment>

        )
    }
}

const mapStateToProps = state => ({
  summary_detail: state.cart.order_summary_detail,
});

const mapDispatchToProps = {
    order_summary
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);