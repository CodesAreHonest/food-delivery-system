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
import Swal from "sweetalert2";

class OrderHistory extends Component {
    constructor(props) {
        super (props);

        this.state = {
            delivery: {value: 'all', label: 'All'},
            start_date: null,
            end_date: null,
            search: '',
        };

        this.renderLayout = this.renderLayout.bind(this);
        this.searchOrder = this.searchOrder.bind(this);
        this.statusChange = this.statusChange.bind(this);
        this.startDateChange = this.startDateChange.bind(this);
        this.endDateChange = this.endDateChange.bind(this);
    }

    componentDidMount() {
        this.props.order_summary(this.state);
    }

    componentDidUpdate (prevProps) {
        if (prevProps.summary_detail !== this.props.summary_detail) {
            this.renderLayout(this.props.summary_detail)
        }

        if (prevProps.order_confirmation_response !== this.props.order_confirmation_response) {

            let {msgType, msgTitle, msg, response_code} = this.props.order_confirmation_response.data;

            Swal.fire({
                type: msgType,
                title: msgTitle,
                text: msg,
                allowOutsideClick: false,
                showConfirmButton: true,
                allowEnterKey: true,
                confirmButtonText: 'Ok',
                timer: 2000
            }).then (() => {

                if (response_code === 200) {
                    this.props.order_summary(this.state);
                }
            })

        }
    }

    statusChange(delivery) {
        this.setState({delivery},() => {
           this.props.order_summary(this.state);
        });
    }

    startDateChange(start_date) {
        this.setState({start_date}, () => {
            this.props.order_summary(this.state);
        });
    }

    endDateChange(end_date) {
        this.setState({end_date}, () => {
            this.props.order_summary(this.state);
        });
    }

    searchOrder(search) {
        this.setState({search}, () => {
            this.props.order_summary(this.state);
        })
    }

    renderLayout(summary_detail) {

        let orderSummary = summary_detail.map((value, key) => {

            const {
                id,
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
                    id={id}
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
                                    onChange={this.statusChange}
                                />
                            </Col>

                            <Col md={2}>
                                <DatePicker
                                    className="form-control"
                                    dropdownMode="select"
                                    selected={this.state.start_date}
                                    dateFormat="dd-MM-YYYY"
                                    placeholderText="Start Date"
                                    onChange={this.startDateChange}
                                />
                            </Col>

                            <Col md={2}>
                                <DatePicker
                                    className="form-control"
                                    dropdownMode="select"
                                    selected={this.state.end_date}
                                    dateFormat="dd-MM-YYYY"
                                    placeholderText="End Date"
                                    onChange={this.endDateChange}
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
    order_confirmation_response: state.cart.order_received_response
});

const mapDispatchToProps = {
    order_summary
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);