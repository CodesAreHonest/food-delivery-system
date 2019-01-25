import React, {Component, Fragment} from 'react';
import {Container, Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import EmailInput from "../../components/Input/EmailInput";
import TextArea from "../../components/Input/TextArea";
import NavigationBar from "../NavigationBar/NavigationBar";

class EditRestaurant extends Component {
    constructor(props) {
        super(props);
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
                                        disabled={true}
                                    />
                                </Col>

                                <Col md={6} style={{marginBottom: '20px'}}>
                                    <Label>Restaurant Name: </Label>
                                    <EmailInput
                                        name="restaurant_name"
                                        id="restaurant_name"
                                        className="form-control"
                                    />
                                </Col>

                                <Col md={12}>
                                    <Label>Address: </Label>
                                    <TextArea
                                        name="address"
                                        id="address"
                                        className="form-control"
                                        style={{minWidth: '100%', minHeight: '40px', marginBottom: '20px'}}
                                    />
                                </Col>
                            </Row>

                            <Button color="primary">Save Changes</Button>
                        </div>
                    </section>
                </Container>
            </Fragment>

        )
    }
}

export default EditRestaurant;