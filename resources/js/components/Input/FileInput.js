import React, {Component} from 'react';
import {Input} from 'reactstrap';
import PropTypes from 'prop-types';

class FileInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
        }
    }

    render() {
        return (
            <Input
                type="file"
                id={this.props.id}
                name={this.props.name}
                className={this.props.className}
                onChange={this.props.onChange}
                placeholder={this.props.placeholder}
                required={this.props.required}
                disabled={this.props.disabled}
                value={this.props.value}

                valid={this.state.valid}
            />
        )
    }
}

export default FileInput;

FileInput.defaultProps = {
    required: false,
    disabled: false
};

FileInput.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    value: PropTypes.any
};



