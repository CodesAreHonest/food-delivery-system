import React, {Component, Fragment} from 'react';

import {Container, Row, Col} from 'reactstrap';

import NavigationBar from "../NavigationBar/NavigationBar";
import SearchInput from "../../components/Input/SearchInput";
import ReactSelect from "../../components/Input/ReactSelect";

import {menu_options} from "./MenuType";

const cartStyle = {
    backgroundColor: 'white',
    padding: '2px 3px',
    maxWidth: '40px',
    borderRadius: '10px',
    border: '1px solid darkgrey'
};

class RestaurantHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    onSelectChange(category) {
        this.setState({category});
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <Fragment>
                <NavigationBar />
            </Fragment>
        )
    }
}

export default RestaurantHome;