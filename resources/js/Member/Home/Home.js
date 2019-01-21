import React, {Component, Fragment} from 'react';

import {Container, Row, Col} from 'reactstrap';

import NavigationBar from "../NavigationBar/NavigationBar";
import SearchInput from "../../components/Input/SearchInput";
import ReactSelect from "../../components/Input/ReactSelect";

import {menu_options} from "./MenuType";

class Home extends Component {
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

                <div className="search-division">
                    <Container>
                        <Row>
                            <Col md={3}>
                                <ReactSelect
                                    name="category"
                                    className="form-control"
                                    closeMenuOnSelect={true}
                                    options={menu_options}
                                    value={this.state.category}
                                    onChange={this.onSelectChange}
                                    placeholder="Select Category"
                                />
                            </Col>

                            <Col md={9}>
                                <SearchInput/>
                            </Col>
                        </Row>
                    </Container>
                </div>


            </Fragment>
        )
    }
}

export default Home;