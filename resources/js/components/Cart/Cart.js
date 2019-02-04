import React, {Component} from 'react';
import {Badge} from 'reactstrap';
import {CartLogo} from "../Logo/CartLogo";

import {connect} from 'react-redux';
import {get_cart} from "./CartAction";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item_amount: 0
        }
    }

    componentDidMount() {
        this.props.get_cart();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.item_amount !== this.props.item_amount) {
            const {cart_amount} = this.props.item_amount.data;
            this.setState({item_amount: cart_amount});
        }

        if (prevProps.item_response !== this.props.item_response) {
            const {cart_amount} = this.props.item_response.data.data;
            this.setState({item_amount: cart_amount});
        }
    }

    render() {
        return (
            <button style={cartStyle}>
                <div>
                    <CartLogo width={30} height={30} />

                    <Badge color="danger" style={{marginLeft: '5px'}}>{this.state.item_amount}</Badge>
                </div>
            </button>
        )
    }
}

const cartStyle = {
    backgroundColor: 'white',
    padding: '2px 3px',
    maxWidth: '70px',
    minHeight: '38px',
    borderRadius: '5px',
    border: '1px solid darkgrey'
};

const mapStateToProps = state => ({
    item_amount: state.cart.cart_amount,
    item_response: state.cart.add_cart_response,
});

const mapDispatchToProps = {
    get_cart
};

export default connect(mapStateToProps, mapDispatchToProps)(Cart);