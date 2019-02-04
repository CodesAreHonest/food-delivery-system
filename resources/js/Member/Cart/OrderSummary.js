import React, {Component} from 'react';
import {Button} from "reactstrap";

import PropTypes from 'prop-types';

class OrderSummary extends Component {
    constructor(props) {
        super(props);
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
                            <td align="right">12.00</td>
                        </tr>
                        <tr>
                            <td align="left"><b>Delivery Fees</b></td>
                            <td align="right">1</td>
                        </tr>
                        <tr className="total-row">
                            <td align="left"><b>Total</b></td>
                            <td align="right"><b>12.00</b></td>
                        </tr>
                        </tbody>
                    </table>

                    <Button
                        color="primary"
                        block
                        outline
                        style={{marginTop: '10px'}}
                    >Check Out</Button>
                </div>
            </div>
        )
    }
}

OrderSummary.propTypes = {
    item_price: PropTypes.string.isRequired,
    delivery_fee: PropTypes.string.isRequired,
    total_price: PropTypes.number.isRequired,
};

export default OrderSummary;