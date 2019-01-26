import React, {Component, Fragment} from 'react';
import {Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../components/Input/StringInput";
import EmailInput from "../../components/Input/EmailInput";
import TextArea from "../../components/Input/TextArea";
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";
import PasswordInput from "../../components/Input/PasswordInput";
import ReactSelect from "../../components/Input/ReactSelect";

class EditLocation extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return (

            <Fragment>
                <NavigationBar/>

                <Sidebar feature="EditLocation"/>

                <div className="account-manage-content">
                    <section>

                        <h3 style={{marginLeft: '5px'}}> Edit Location </h3>
                        <hr />


                        <div className="edit-profile-background">
                            <Row>
                                <Col md={6}>
                                    <Label for="address">Address: </Label>
                                    <StringInput
                                        id="address"
                                        name="address"
                                        placeholder="75 Kg Sg Ramal Luar"
                                        required={true}
                                    />
                                </Col>

                                <Col md={6}>
                                    <Label for="city">City: </Label>
                                    <StringInput
                                        id="city"
                                        name="city"
                                        placeholder="Kajang"
                                        required={true}
                                    />
                                </Col>

                                <Col md={6} style={{marginTop: '20px'}}>
                                    <Label for="state">State: </Label>
                                    <StringInput
                                        id="state"
                                        name="state"
                                        placeholder="Selangor"
                                        required={true}
                                    />
                                </Col>

                                <Col md={6} style={{marginTop: '20px'}}>
                                    <Label for="country">Country: </Label>
                                    <ReactSelect
                                        className="form-control"
                                        closeMenuOnSelect={true}
                                        name="country"
                                        options={[{value: 'malaysia', label: 'Malaysia'}]}
                                        value={{value: 'malaysia', label: 'Malaysia'}}
                                        onChange={(country) => this.setState({country})}
                                        placeholder="Country"
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

export default EditLocation;