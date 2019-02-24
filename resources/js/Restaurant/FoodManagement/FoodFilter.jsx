import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup,Label, Row} from "reactstrap";

import {category_options} from "../../Member/Home/MenuType";
import ReactSelect from "../../components/Input/ReactSelect";
import StringInput from "../../components/Input/StringInput";

import {get_restaurant_food} from "./FoodManagementAction";

import {connect} from 'react-redux';

class FoodFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {label: 'All', value: 'all'},
            search: '',
        };

        this.defaultState = this.state;

        this.resetFilter = this.resetFilter.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.props.get_restaurant_food();
    }

    resetFilter() {
        this.setState(this.defaultState, () => {
            this.props.get_restaurant_food();
        })
    }

    search () {
        const {category, search} = this.state;
        this.props.get_restaurant_food(search, category.value);
    }

    render() {
        return (
            <Card>
                <CardHeader className="search-header text-center">Content Filter</CardHeader>
                <CardBody>
                    <Form id="admin-filter-form">
                        <FormGroup>
                            <Label for="food_category" >Category:</Label>
                            <ReactSelect
                                name="category"
                                className="form-control form-control-sm"
                                closeMenuOnSelect={true}
                                options={category_options}
                                value={this.state.category}
                                onChange={(category) => this.setState({category})}
                                placeholder="All"
                            />
                        </FormGroup>

                        <FormGroup>
                            <Label for="search">Search:</Label>
                            <StringInput
                                id="search"
                                name="search"
                                placeholder="Food name"
                                className="form-control"
                                onChange={(e) => this.setState({search: e.target.value})}
                                value={this.state.search}
                            />
                        </FormGroup>
                    </Form>

                    <Row>
                        <Col md={6}>
                            <Button
                                color="secondary"
                                size="sm"
                                block
                                onClick={this.resetFilter}
                            >Clear</Button>
                        </Col>

                        <Col md={6}>
                            <Button
                                color="primary"
                                size="sm"
                                block
                                onClick={this.search}
                            >Search</Button>
                        </Col>
                    </Row>

                </CardBody>
            </Card>

        )
    }
}

FoodFilter.propTypes = {
    get_restaurant_food: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
    get_restaurant_food
};

export default connect(null, mapDispatchToProps)(FoodFilter);