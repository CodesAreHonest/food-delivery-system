import React, {Component} from 'react';
import {Input} from 'reactstrap';
import PropTypes from 'prop-types';
import StringInput from "./StringInput";

class PasswordInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
        }
    }

    render() {
        return (
            <Input
                type="password"
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

export default PasswordInput;

PasswordInput.defaultProps = {
    required: false,
    disabled: false
};

PasswordInput.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.string,
    onChange: PropTypes.func
};




