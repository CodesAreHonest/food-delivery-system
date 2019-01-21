import React, {Component} from 'react';
import {Input} from 'reactstrap';
import PropTypes from 'prop-types';

class SelectInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
        }
    }

    render() {
        return (
                <Input
                    type="select"
                    id={this.props.id}
                    name={this.props.name}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    className={this.props.className}
                    options={this.props.options}
                    placeholder={this.props.placeholder}
                    required={this.props.required}
                    disabled={this.props.disabled}
                    style={this.props.style}

                    valid={this.state.valid}
                />

        )
    }
}

export default SelectInput;

SelectInput.defaultProps = {
    required: false,
    disabled: false
};

SelectInput.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    options: PropTypes.array.isRequired,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.object,
};



