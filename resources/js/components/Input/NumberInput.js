import React, {Component} from 'react';
import {Input} from 'reactstrap';
import PropTypes from 'prop-types';

class NumberInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
        }
    }

    render() {
        return (
            <Input
                type="number"
                id={this.props.id}
                name={this.props.name}
                className={this.props.className}
                value={this.props.value}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                required={this.props.required}
                disabled={this.props.disabled}
                min={this.props.min}
                max={this.props.max}
                pattern={this.props.pattern}

                valid={this.state.valid}
            />
        )
    }
}

export default NumberInput;

NumberInput.defaultProps = {
    required: false,
    disabled: false
};

NumberInput.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    min: PropTypes.number,
    max: PropTypes.number,
    value: PropTypes.any,
    pattern: PropTypes.string,
    onkeypress: PropTypes.func,

};



