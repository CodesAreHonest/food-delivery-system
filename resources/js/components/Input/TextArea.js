import React, {Component} from 'react';
import {Input} from 'reactstrap';
import PropTypes from 'prop-types';

class TextArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            valid: false,
        }
    }

    render() {
        return (
            <Input
                type="textarea"
                id={this.props.id}
                name={this.props.name}
                onChange={this.props.onChange}
                className={this.props.className}
                value={this.props.value}
                placeholder={this.props.placeholder}
                required={this.props.required}
                disabled={this.props.disabled}
                style={this.props.style}

                valid={this.state.valid}
            />
        )
    }
}

export default TextArea;

TextArea.defaultProps = {
    required: false,
    disabled: false
};

TextArea.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    placeholder: PropTypes.string,
    required: PropTypes.bool,
    disabled: PropTypes.bool,
    style: PropTypes.object
};



