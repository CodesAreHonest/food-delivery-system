import React, {Component} from 'react';
import {Badge} from 'reactstrap';
import {CartLogo} from "./Logo/CartLogo";

class Cart extends Component {
    constructor(props) {
        super(props);

        this.state = {
            item_amount: 0
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
    maxWidth: '60px',
    minHeight: '38px',
    borderRadius: '5px',
    border: '1px solid darkgrey'
};

export default Cart;