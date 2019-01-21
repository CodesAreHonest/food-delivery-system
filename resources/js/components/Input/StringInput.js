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
                required={this.props.required}
                disabled={this.props.disabled}

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
    name: PropTypes.string,
    id: PropTypes.string,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool
};



