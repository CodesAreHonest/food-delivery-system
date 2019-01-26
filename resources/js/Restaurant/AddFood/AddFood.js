import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";

// ReactStrap
import {Container, Row, Col, Label, Card, CardBody, CardImg} from 'reactstrap';
import StringInput from "../../components/Input/StringInput";
import NumberInput from "../../components/Input/NumberInput";
import ReactSelect from "../../components/Input/ReactSelect";

import {category_options} from "../../Member/Home/MenuType";
import FileInput from "../../components/Input/FileInput";
import TextArea from "../../components/Input/TextArea";
import FoodCard from "../../components/Food/FoodCard";

const labelStyle = {
    marginTop: '10px'
};

class AddFood extends Component {
    constructor (props) {
        super(props);

        this.state = {
            food_name: '',
            food_price: null,
            food_image: null,
            food_category: {label: 'Soup', value: 'soup'},
            food_description: ''
        }
    }

    render() {
        return (
            <Fragment>
                <NavigationBar/>

                <Container style={{marginTop: '15px'}}>
                    <section>
                        <Row>
                            <Col md={7}>
                                <h4 style={{marginLeft: '5px'}}>Add Food</h4>

                                <hr />

                                <div className="edit-profile-background card-shadow" style={{borderRadius: '5px'}}>

                                    <Label for="food_name">Food Name: </Label>
                                    <StringInput
                                        name="food_name"
                                        id="food_name"
                                        placeholder="Creamy Mushroom Soup"
                                        value={this.state.food_name}
                                        onChange={(e) => this.setState({food_name: e.target.value})}
                                        required={true}
                                    />

                                    <Row>
                                        <Col md={6}>
                                            <Label
                                                for="food_price"
                                                style={labelStyle}
                                            >Food Price: </Label>
                                            <NumberInput
                                                name="food_price"
                                                id="food_price"
                                                placeholder="10.00"
                                                value={this.state.food_price}
                                                onChange={(e) => this.setState({food_price: e.target.value})}
                                                required={true}
                                            />
                                        </Col>

                                        <Col md={6}>
                                            <Label
                                                for="food_category"
                                                style={labelStyle}
                                            >Category: </Label>
                                            <ReactSelect
                                                className="form-control"
                                                closeMenuOnSelect={true}
                                                name="food_category"
                                                options={category_options}
                                                value={this.state.food_category}
                                                onChange={(food_category) => this.setState({food_category})}
                                                placeholder="food_category"
                                                required={true}
                                            />
                                        </Col>
                                    </Row>

                                    <Label
                                        for="food_image"
                                        style={labelStyle}
                                    >Upload Picture: </Label>
                                    <FileInput
                                        name="food_image"
                                        id="food_image"
                                        required={true}
                                    />

                                    <Label
                                        for="food_description"
                                        style={labelStyle}
                                    > Description: </Label>
                                    <TextArea
                                        id="food_description"
                                        style={{minWidth: '100%', minHeight: '40px', marginBottom: '20px'}}
                                        value={this.state.food_description}
                                        onChange={(e) => this.setState({food_description: e.target.value})}
                                        name="food_description"
                                        placeholder="Cream of mushroom soup is a simple type of soup where a basic roux is thinned with cream or milk"
                                        required={true}
                                    />
                                </div>
                            </Col>

                            <Col md={5} >

                                <h4 style={{marginLeft: '5px'}}>Preview</h4>

                                <hr />
                                <FoodCard
                                    className="card-shadow"
                                    food_name={this.state.food_name}
                                    food_price={this.state.food_price}
                                    food_description={this.state.food_description}
                                    checkout_quantity={1}
                                    quantity_disabled={true}
                                />
                            </Col>
                        </Row>
                    </section>
                </Container>
            </Fragment>

        )
    }
}

export default AddFood;