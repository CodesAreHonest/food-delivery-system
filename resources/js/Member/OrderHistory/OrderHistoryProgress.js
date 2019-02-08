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

        this.renderProgress = this.renderProgress.bind(this);
    }

    componentDidMount() {
        this.renderProgress(this.props.status);
    }

    renderProgress(status) {
        switch (status) {
            case 'paid':
                this.setState({color: 'info', value: 35});
                break;
            case 'shipped':
                this.setState({color: 'primary', value: 70});
                break;
            case 'delivered':
                this.setState({color: 'success', value: 100});
                break;
        }

    }

    render() {

        return (
            <div>
                <Progress
                    animated={this.props.animated}
                    color={this.state.color}
                    value={this.state.value}
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