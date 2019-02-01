import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import NavigationBar from "../NavigationBar/NavigationBar";
import TextArea from "../../components/Input/TextArea";

import {connect} from 'react-redux';
import PropTypes from "prop-types";

import {get_restaurant_detail} from "./EditRestaurantAction";

class EditRestaurant extends Component {
    constructor(props) {
        super(props);

        this.state = {
            restaurant_id: '',
            restaurant_name: '',
            address: '',
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.get_restaurant_detail();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.restaurant_detail !== this.props.restaurant_detail) {

            const {
                s_restaurant_id,
                s_restaurant_name,
                s_address
            } = this.props.restaurant_detail;

            this.setState({
                restaurant_id: s_restaurant_id,
                restaurant_name: s_restaurant_name,
                address: s_address,
            });
        }
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Container style={{marginTop: '20px'}}>
                    <section>

                        <h3 style={{marginLeft: '5px'}}>Edit Restaurant Profile</h3>
                        <hr />

                        <div className="edit-profile-background">
                            <Row>
                                <Col md={6}>
                                    <Label>Restaurant ID: </Label>
                                    <StringInput
                                        name="restaurant_id"
                                        id="restaurant_id"
                                        className="form-control"
                                        value={this.state.restaurant_id}
                                        disabled={true}
                                        required={true}
                                    />
                                </Col>

                                <Col md={6}>
                                    <Label>Restaurant Name: </Label>
                                    <StringInput
                                        name="restaurant_name"
                                        id="restaurant_name"
                                        className="form-control"
                                        value={this.state.restaurant_name}
                                        onChange={this.onChange}
                                        required={true}
                                    />
                                </Col>

                                <Col md={12} style={{marginTop: '20px'}}>
                                    <Label for="register_address">Address: </Label>
                                    <TextArea
                                        id="register_address"
                                        style={{minWidth: '100%', minHeight: '40px', mfarginBottom: '20px'}}
                                        name="address"
                                        value={this.state.address}
                                        onChange={this.onChange}
                                        required={true}
                                    />
                                </Col>
                            </Row>

                            <Button color="primary" style={{marginTop: '20px'}}>Save Changes</Button>
                        </div>
                    </section>
                </Container>
            </Fragment>

        )
    }
}

EditRestaurant.propTypes = {
    restaurant_detail: PropTypes.any,
};

const mapStateToProps = state => ({
    restaurant_detail: state.restaurant.restaurant_detail,
});

const mapDispatchToProps = {
    get_restaurant_detail,
};
export default connect(mapStateToProps, mapDispatchToProps)(EditRestaurant);