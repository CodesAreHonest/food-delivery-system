import React, {Component} from 'react';
import {Progress} from "reactstrap";
import PropTypes from 'prop-types';

class OrderHistoryProgress extends Component {
    constructor(props) {
        super(props);

        this.state = {
            progress: '',
            color: '',
            value: ''
        };
    }

    render() {

        return (
            <div>
                <Progress
                    animated={this.props.animated}
                    color={this.props.color}
                    value={this.props.value}
                    style={{marginTop: '5px'}}
                />
            </div>
        )
    }
}

OrderHistoryProgress.propTypes = {
    animated: PropTypes.bool,
    status: PropTypes.string,
    style: PropTypes.object
};

export default OrderHistoryProgress;