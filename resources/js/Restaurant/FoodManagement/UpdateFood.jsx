import React, {Component} from 'react';
import {Button, Modal, ModalBody, Row, Col, Form, Label} from 'reactstrap';
import Swal from "sweetalert2";

import StringInput from "../../components/Input/StringInput";
import NumberInput from "../../components/Input/NumberInput";
import ReactSelect from "../../components/Input/ReactSelect";
import {category_options} from "../../Member/Home/MenuType";
import FileInput from "../../components/Input/FileInput";
import TextArea from "../../components/Input/TextArea";
import FoodCard from "../../components/Food/FoodCard";

import PropTypes from "prop-types";
import {get_food_detail, add_food_preview, update_food, get_restaurant_food} from "./FoodManagementAction";

import {connect} from 'react-redux';

const labelStyle = {
    marginTop: '10px'
};

class UpdateFood extends Component {
    constructor(props) {
        super (props);

        this.state = {
            modal: this.props.modal,
            food_name: '',
            food_price: '',
            food_image_preview: null,
            food_image: '',
            food_category: {label: 'Soup', value: 'soup'},
            food_description: ''
        };

        this.toggle = this.toggle.bind(this);
        this.updateFood = this.updateFood.bind(this);
        this.foodPreview = this.foodPreview.bind(this);
    }

    componentDidMount() {
        this.props.get_food_detail(this.props.food_id);
    }

    foodPreview(e) {
        this.setState({food_image: e.target.files[0]}, () => {

            const data = new FormData();
            data.append('food_image', this.state.food_image);
            this.props.add_food_preview(data);
        })
    }

    updateFood(e) {

        e.preventDefault();

        let form = document.getElementById('update_food_form');

        if (!form.checkValidity()) {
            return false;
        }

        const data = new FormData(form);
        data.append('food_id', this.state.food_id);

        Swal.fire({
            type: 'warning',
            title: 'Are you sure?',
            text: 'The food updated cannot be modify.',
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true,
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText: 'Update Food (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#5cb85c',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {
                this.props.update_food(data);

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

    componentDidUpdate(prevProps) {

        if (prevProps.update_food_response !== this.props.update_food_response) {

            let {msgType, msgTitle, msg, response_code} = this.props.update_food_response.data;

            Swal.fire({
                type: msgType,
                title: msgTitle,
                text: msg,
                allowOutsideClick: false,
                showConfirmButton: true,
                allowEnterKey: true,
                confirmButtonText: 'Ok',
                timer: 2000
            }).then(() => {

                if (response_code === 200) {
                    this.props.get_restaurant_food();
                    this.toggle();
                }

            })
        }

        if (prevProps.add_food_preview_response !== this.props.add_food_preview_response) {

            let {data: url} = this.props.add_food_preview_response.data;

            const food_image_preview = `/${url}`;

            this.setState({food_image_preview});
        }

        if (prevProps.food_information !== this.props.food_information) {

            const {
                id: food_id,
                s_name: food_name,
                f_price: food_price,
                s_category: category,
                s_image: food_image_preview,
                s_description: food_description
            } = this.props.food_information;

            const food_category = {label: category, value: category};

            this.setState({
                food_id,
                food_name,
                food_price,
                food_category,
                food_image_preview,
                food_description
            });
        }
    }

    toggle() {
        this.props.isOpen();
    }

    render() {

        const {modal} = this.state;

        return (
            <Modal isOpen={modal} toggle={this.toggle} size="lg">
                <ModalBody>
                    <section>
                        <Form
                            id="update_food_form"
                            onSubmit={this.updateFood}
                        >
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
                                        cart_disabled={true}
                                    />
                                </Col>
                            </Row>
                        </Form>
                    </section>

                </ModalBody>
            </Modal>

        )
    }
}

UpdateFood.propTypes = {
    get_food_detail: PropTypes.func.isRequired,
    food_information: PropTypes.any,

    add_food_preview: PropTypes.func.isRequired,
    add_food_preview_response: PropTypes.any,

    update_food: PropTypes.func.isRequired,
    update_food_response: PropTypes.any,

    get_restaurant_food: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    update_food_response: state.food.update_food_response,
    food_information: state.food.food_information,
    add_food_preview_response: state.food.add_food_preview_response,
});

const mapDispatchToProps = {
    get_food_detail,
    add_food_preview,
    update_food,
    get_restaurant_food
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateFood);