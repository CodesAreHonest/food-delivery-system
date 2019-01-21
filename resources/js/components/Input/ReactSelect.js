import Select from 'react-select';
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class ReactSelect extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Select
                    name={this.props.name}
                    closeMenuOnSelect={this.props.closeMenuOnSelect}
                    isMulti={this.props.isMulti}
                    options={this.props.options}
                    value={this.props.value}
                    defaultValue={this.props.defaultValue}
                    onChange={this.props.onChange}
                    formatGroupLabel={this.props.formatGroupLabel}
                    placeholder={this.props.placeholder}
                />
            </div>
        )
    }

}

export default ReactSelect;

ReactSelect.propTypes = {
    name: PropTypes.string.isRequired,
    closeMenuOnSelect: PropTypes.bool,
    options: PropTypes.array.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.any.isRequired,
    defaultValue: PropTypes.object,
};

ReactSelect.defaultProps = {
    closeMenuOnSelect: false,
};