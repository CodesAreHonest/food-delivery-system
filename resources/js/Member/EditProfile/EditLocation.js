import React, {Component, Fragment} from 'react';
import {Row, Col, Label, Button} from 'reactstrap';
import PropTypes from 'prop-types';

import StringInput from "../../components/Input/StringInput";
import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";
import ReactSelect from "../../components/Input/ReactSelect";

import {connect} from 'react-redux';
import {get_user_profile} from "./EditMemberAction";

class EditLocation extends Component {
    constructor(props){
        super(props);

        this.state = {
            address: '',
            city: '',
            state: '',
            country: '',
        };

        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        this.props.get_user_profile();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.detail !== this.props.detail) {

            const {
                s_address: address,
                s_city: city,
                s_state: state,
                s_country: country
            } = this.props.detail;

            this.setState({
                address, city, state, country
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
                                        value={this.state.address}
                                        placeholder="75 Kg Sg Ramal Luar"
                                        onChange={this.onChange}
                                        required={true}
                                    />
                                </Col>

                                <Col md={6}>
                                    <Label for="city">City: </Label>
                                    <StringInput
                                        id="city"
                                        name="city"
                                        placeholder="Kajang"
                                        value={this.state.city}
                                        onChange={this.onChange}
                                        required={true}
                                    />
                                </Col>

                                <Col md={6} style={{marginTop: '20px'}}>
                                    <Label for="state">State: </Label>
                                    <StringInput
                                        id="state"
                                        name="state"
                                        placeholder="Selangor"
                                        value={this.state.state}
                                        onChange={this.onChange}
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

EditLocation.propTypes = {
    detail: PropTypes.any,
    get_user_profile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    detail: state.member.detail
});

const mapDispatchToProps = {
    get_user_profile
};

export default connect(mapStateToProps, mapDispatchToProps)(EditLocation);