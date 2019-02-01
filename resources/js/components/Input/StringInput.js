import React, {Component} from 'react';
import {Input} from 'reactstrap';
import PropTypes from 'prop-types';

class StringInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
        }
    }

    render() {
        return (
            <Input
                type="string"
                id={this.props.id}
                name={this.props.name}
                className={this.props.className}
                placeholder={this.props.placeholder}
                onChange={this.props.onChange}
                required={this.props.required}
                disabled={this.props.disabled}
                maxLength={this.props.maxLength}
                value={this.props.value}

                valid={this.state.valid}
            />
        )
    }
}

export default StringInput;

StringInput.defaultProps = {
    required: false,
    disabled: false
};

StringInput.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    maxLength: PropTypes.string,
    value: PropTypes.any,
};



