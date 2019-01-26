import React, {Component, Fragment} from 'react';
import {Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import EmailInput from "../../components/Input/EmailInput";
import TextArea from "../../components/Input/TextArea";
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

class CreditCard extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Sidebar feature="CreditCard" />

                <div className="account-manage-content">
                    <section>

                        <h3 style={{marginLeft: '5px'}}> Credit Card </h3>
                        <hr />

                        <div className="edit-profile-background">
                            <Row>
                                <Col md={4}>
                                    <Label>Card Name: </Label>
                                    <StringInput
                                        name="card_name"
                                        id="card_name"
                                        className="form-control"
                                        placeholder="Ali bin Ahmad"
                                        required
                                    />
                                </Col>

                                <Col md={4}>
                                    <Label>Card Number: </Label>
                                    <StringInput
                                        name="card_number"
                                        id="card_number"
                                        className="form-control"
                                        placeholder="8888 8888 8888 8888"
                                        required
                                    />
                                </Col>

                                <Col md={2}>
                                    <Label>Expired Date: </Label>
                                    <StringInput
                                        name="expired_input"
                                        id="expired_input"
                                        className="form-control"
                                        placeholder="MM/YY"
                                        maxLength="5"
                                        required
                                    />
                                </Col>

                                <Col md={2}>
                                    <Label>CVC: </Label>
                                    <StringInput
                                        name="CVC"
                                        id="CVC"
                                        className="form-control"
                                        placeholder="133"
                                        maxLength="3"
                                        required
                                    />
                                </Col>
                            </Row>

                            <Button color="primary" style={{marginTop: '20px'}}>Save Changes</Button>
                        </div>
                    </section>
                </div>
            </Fragment>

        )
    }
}

export default CreditCard;