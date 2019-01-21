import React, {Component} from 'react';
import {InputGroup, InputGroupAddon, Button} from 'reactstrap';
import StringInput from "./StringInput";

class SearchInput extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <InputGroup>
                <StringInput
                    id="search_food_restaurant"
                    name="search_food_restaurant"
                    placeholder="Search food or restaurant"
                />
                <InputGroupAddon addonType="append" style={{marginRight: '10px'}}>
                    <Button color="primary">
                        Search
                    </Button>
                </InputGroupAddon>
            </InputGroup>
        )
    }
}

export default SearchInput;