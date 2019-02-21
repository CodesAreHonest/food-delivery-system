import React, {Component, Fragment} from 'react';
import NavigationBar from "../NavigationBar/NavigationBar";

// ReactStrap
import {Container, Row, Col, Label, Button, Form} from 'reactstrap';

import {category_options} from "../../Member/Home/MenuType";

import FileInput from "../../components/Input/FileInput";
import TextArea from "../../components/Input/TextArea";
import FoodCard from "../../components/Food/FoodCard";
import StringInput from "../../components/Input/StringInput";
import NumberInput from "../../components/Input/NumberInput";
import ReactSelect from "../../components/Input/ReactSelect";

import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss';
import DjangoCSRFToken from 'django-react-csrftoken';

import {add_food, add_food_preview} from "./AddFoodAction";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

const labelStyle = {
    marginTop: '10px'
};

const initialState = {
    food_name: '',
    food_price: '',
    food_image_preview: null,
    food_image: '',
    food_category: {label: 'Soup', value: 'soup'},
    food_description: ''
};

class AddFood extends Component {
    constructor (props) {
        super(props);

        this.state = initialState;

        this.addFood = this.addFood.bind(this);
        this.foodPreview = this.foodPreview.bind(this);
        this.resetState = this.resetState.bind(this);
    }

    resetState() {
        this.setState(initialState);
    }

    foodPreview(e) {
        this.setState({food_image: e.target.files[0]}, () => {

            const data = new FormData();
            data.append('food_image', this.state.food_image);
            this.props.add_food_preview(data);
        })
    }

    componentDidUpdate(prevProps) {

        if (prevProps.add_food_response !== this.props.add_food_response) {

            let {msgType, msgTitle, msg, response_code} = this.props.add_food_response.data;

            if (response_code === 200) {
                this.resetState();
            }

            Swal.fire({
                type: msgType,
                title: msgTitle,
                text: msg,
                allowOutsideClick: false,
                showConfirmButton: true,
                allowEnterKey: true,
                confirmButtonText: 'Ok',
                timer: 2000
            })
        }

        if (prevProps.add_food_preview_response !== this.props.add_food_preview_response) {

            let {data: url} = this.props.add_food_preview_response.data;

            const food_image_preview = `/${url}`;

            this.setState({food_image_preview});
        }
    }

    addFood(e) {

        e.preventDefault();

        let form = document.getElementById('add_food_form');

        if (!form.checkValidity()) {
            return false;
        }

        const data = new FormData(form);

        Swal.fire({
            type: 'question',
            title: 'Are you sure?',
            text: 'The food added cannot be modify.',
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true,
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText: 'Add Food (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {
                this.props.add_food(data);

                Swal.fire({
                    title: 'Submitting...',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    }
                });
            }
        });

    }

    render() {

        return (
            <Fragment>
                <NavigationBar/>

                <Container style={{marginTop: '15px'}}>
                    <section>
                        <Form
                            id="add_food_form"
                            onSubmit={this.addFood}
                        >
                            <DjangoCSRFToken />
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
                                        value={this.state.file}
                                        onChange={this.foodPreview}
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

                                    <Button color="primary" type="submit" block>Save Changes</Button>
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
                                    image={this.state.food_image_preview}
                                    checkout_quantity={1}
                                    quantity_disabled={true}
                                />
                            </Col>
                        </Row>
                        </Form>
                    </section>
                </Container>
            </Fragment>

        )
    }
}

AddFood.propTypes = {
    add_food: PropTypes.func.isRequired,
    add_food_response: PropTypes.any,
    add_food_preview: PropTypes.func.isRequired,
    add_food_preview_response: PropTypes.any,
};

const mapStateToProps = state => ({
    add_food_response: state.food.add_food_response,
    add_food_preview_response: state.food.add_food_preview_response,
});

const mapDispatchToProps = {
    add_food,
    add_food_preview
};

export default connect(mapStateToProps, mapDispatchToProps)(AddFood);