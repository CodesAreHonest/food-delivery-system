import React, {Component} from 'react';
import {Button, Card, CardBody, CardHeader, Col, Form, FormGroup, Label, Row} from "reactstrap";

import StringInput from "../../components/Input/StringInput";
import ReactSelect from "../../components/Input/ReactSelect";
import {statusSelect} from "./AdminUtility";

import DatePicker from "react-datepicker/es";
import {get_food_order} from "./AdminAction";
import connect from "react-redux/es/connect/connect";

class AdminFilter extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: {value: 'all', label: 'All'},
            start_date: null,
            end_date: null,
            user_email: '',
            limit: 10
        };

        this.defaultState = this.state;

        this.resetFilter = this.resetFilter.bind(this);
        this.search = this.search.bind(this);
    }

    componentDidMount() {
        this.props.get_food_order (this.state);
    }

    resetFilter() {
        this.setState(this.defaultState, () => {
            this.props.get_food_order(this.defaultState);
        })
    }

    search () {
        this.props.get_food_order(this.state);
    }

    render() {
        return (
            <Card>

                <CardHeader className="search-header text-center">Content Filter</CardHeader>
                <CardBody>
                    <Form id="admin-filter-form">
                        <FormGroup row>
                            <Label for="user_email" className="admin-filter-label" md={5}>User's Email:</Label>
                            <Col md={7}>
                                <StringInput
                                    name="user_email"
                                    id="user_email"
                                    placeholder="test@gmail.com"
                                    bsSize="sm"
                                    value={this.state.user_email}
                                    onChange={(e) => this.setState({user_email: e.target.value})}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="status" className="admin-filter-label" md={5}>Order Status:</Label>
                            <Col md={7}>
                                <ReactSelect
                                    name="status"
                                    options={statusSelect}
                                    closeMenuOnSelect={true}
                                    value={this.state.status}
                                    onChange={(status) => this.setState({status})}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="start_date"className="admin-filter-label" md={5}>Start Date:</Label>
                            <Col md={7}>
                                <DatePicker
                                    className="form-control form-control-sm"
                                    dropdownMode="select"
                                    selected={this.state.start_date}
                                    dateFormat="dd-MM-YYYY"
                                    placeholderText="YYYY-MM-DD"
                                    onChange={start_date => this.setState({start_date})}
                                />
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="end_date" className="admin-filter-label" md={5}>End Date:</Label>
                            <Col md={7}>
                                <DatePicker
                                    className="form-control form-control-sm"
                                    dropdownMode="select"
                                    selected={this.state.end_date}
                                    dateFormat="dd-MM-YYYY"
                                    placeholderText="YYYY-MM-DD"
                                    onChange={end_date => this.setState({end_date})}
                                />
                            </Col>
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

const mapDispatchToProps = {
    get_food_order
};

export default connect(null, mapDispatchToProps)(AdminFilter);
