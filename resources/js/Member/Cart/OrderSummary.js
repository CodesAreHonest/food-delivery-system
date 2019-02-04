import React, {Component} from 'react';
import {Button} from "reactstrap";

import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {check_out, get_cart} from "../../components/Cart/CartAction";
import Swal from "sweetalert2";

class OrderSummary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            disabled: true
        };

        this.cartCheckout = this.cartCheckout.bind(this);
        this.hideCheckout = this.hideCheckout.bind(this);
    }

    componentDidUpdate (prevProps) {

        if (prevProps.response !== this.props.response) {

            let {msgType, msgTitle, msg, response_code} = this.props.response.data;

            Swal.fire({
                type: msgType,
                title: msgTitle,
                text: msg,
                allowOutsideClick: false,
                showConfirmButton: true,
                allowEnterKey: true,
                confirmButtonText: 'Ok',
                timer: 5000
            }).then (() => {

                switch (response_code) {
                    case 404:
                        window.location.href = '/member/credit/card';
                        break;
                    case 200:
                        this.props.get_cart();
                        break;
                }
            })
        }

        if (prevProps.item_price !== this.props.item_price) {
            this.hideCheckout();
        }
    }

    cartCheckout(e) {
        e.preventDefault();

        this.props.check_out();

        Swal.fire({
            title: 'Submitting...',
            allowOutsideClick: false,
            showCancelButton: false,
            showConfirmButton: false,
            onBeforeOpen: () => {
                Swal.showLoading();
            }
        });

    }

    hideCheckout() {

        if (this.props.item_price !== '') {
            this.setState({disabled: false});
        }
    }

    render() {

        return (
            <div className="checkout-division">
                <div className="order-summary-text">
                    <h5>Order Summary</h5>
                </div>

                <div className="summary-price">
                    <table>
                        <tbody>
                        <tr>
                            <td align="left"><b>Price</b></td>
                            <td align="right">{this.props.item_price}</td>
                        </tr>
                        <tr>
                            <td align="left"><b>Delivery Fees</b></td>
                            <td align="right">{this.props.delivery_fee}</td>
                        </tr>
                        <tr className="total-row">
                            <td align="left"><b>Total</b></td>
                            <td align="right"><b>{this.props.total_price}</b></td>
                        </tr>
                        </tbody>
                    </table>

                    {!this.state.disabled &&
                    <Button
                        color="primary"
                        block
                        outline
                        style={{marginTop: '10px'}}
                        onClick={this.cartCheckout}
                    >Check Out</Button>}


                </div>
            </div>
        )
    }
}

OrderSummary.defaultProps = {
    item_price: "0.00",
    delivery_fee: "0.00",
    total_price: "0.00"
};

OrderSummary.propTypes = {
    item_price: PropTypes.any.isRequired,
    delivery_fee: PropTypes.any.isRequired,
    total_price: PropTypes.any.isRequired,

    response: PropTypes.any,
    check_out: PropTypes.func.isRequired,
    get_cart: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    response: state.cart.cart_checkout_response,
});

const mapDispatchToProps = {
    check_out, get_cart
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);