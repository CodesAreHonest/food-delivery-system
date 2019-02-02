import React, {Component} from 'react';
import {Input} from 'reactstrap';
import PropTypes from 'prop-types';

class EmailInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
        }
    }

    render() {
        return (
            <Input
                type="email"
                id={this.props.id}
                name={this.props.name}
                value={this.props.value}
                onChange={this.props.onChange}
                className={this.props.className}
                placeholder={this.props.placeholder}
                required={this.props.required}
                disabled={this.props.disabled}

                valid={this.state.valid}
            />
        )
    }
}

export default EmailInput;

EmailInput.defaultProps = {
    required: false,
    disabled: false
};

EmailInput.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func
};




