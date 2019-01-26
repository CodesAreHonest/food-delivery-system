import React, {Component, Fragment} from 'react';

import {Container, Row, Col} from 'reactstrap';

import NavigationBar from "../NavigationBar/NavigationBar";
import SearchInput from "../../components/Input/SearchInput";
import ReactSelect from "../../components/Input/ReactSelect";

import {category_options} from "./MenuType";

const cartStyle = {
    backgroundColor: 'white',
    padding: '2px 3px',
    maxWidth: '40px',
    borderRadius: '10px',
    border: '1px solid darkgrey'
};

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
                                    options={category_options}
                                    value={this.state.category}
                                    onChange={this.onSelectChange}
                                    placeholder="Category"
                                />
                            </Col>

                            <Col md={8}>
                                <SearchInput/>
                            </Col>

                            <Col md={1}>
                                <button style={cartStyle}>
                                    <div>
                                        <img
                                            src="https://cdn0.iconfinder.com/data/icons/webshop-essentials/100/shopping-cart-512.png"
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                </button>
                            </Col>
                        </Row>
                    </Container>
                </div>


            </Fragment>
        )
    }
}

export default Home;