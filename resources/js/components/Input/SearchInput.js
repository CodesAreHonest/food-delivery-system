import React, {Component} from 'react';
import {InputGroup, InputGroupAddon, Button} from 'reactstrap';
import StringInput from "./StringInput";
import PropTypes from 'prop-types';

class SearchInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search_string: ''
        };

        this.search = this.search.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    search() {
        this.props.onSearchClick(this.state.search_string);
    }

    onChange(e) {
        this.setState({search_string: e.target.value}, () => {
            if (this.state.search_string.length === 0) {
                this.search();
            }
        })
    }
    render() {
        return (
            <InputGroup>
                <StringInput
                    id="search_food_restaurant"
                    name="search_food_restaurant"
                    placeholder={this.props.placeholder}
                    onChange={this.onChange}
                    value={this.state.search_string}
                />
                <InputGroupAddon addonType="append" style={{marginRight: '10px'}}>
                    <Button color="primary" onClick={this.search}>
                        Search
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        )
    }
}

SearchInput.propTypes = {
    onSearchClick: PropTypes.func.isRequired
};

SearchInput.defaultProps = {
    placeholder: 'Search Food'
};

export default SearchInput;