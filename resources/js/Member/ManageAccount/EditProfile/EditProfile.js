import React, {Component} from 'react';
import {Row, Col, Label, Button} from 'reactstrap';

import StringInput from "../../../components/Input/StringInput";
import EmailInput from "../../../components/Input/EmailInput";
import TextArea from "../../../components/Input/TextArea";

class EditProfile extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div className="edit-profile-background">
                <Row>
                    <Col md={6}>
                        <Label>Username: </Label>
                        <StringInput
                            name="username"
                            id="username"
                            className="form-control"
                        />
                    </Col>

                    <Col md={6} style={{marginBottom: '20px'}}>
                        <Label>Email: </Label>
                        <EmailInput
                            name="email"
                            id="email"
                            className="form-control"
                            disabled={true}
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
        )
    }
}

export default EditProfile;