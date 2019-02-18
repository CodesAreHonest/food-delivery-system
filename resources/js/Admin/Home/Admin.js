import React, {Component, Fragment} from 'react';
import NavigationBar from "../../Admin/NavigationBar/NavigationBar";

import {Row, Col} from 'reactstrap';
import ContentFilter from "./ContentFilter";
import CustomPagination from "../../components/Pagination/CustomPagination";


class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: {value: 'paid', label: 'Paid'},
            start_date: null,
            end_date: null,
            user_email: ''
        }
    }

    render() {
        return (
            <Fragment>
                <NavigationBar />

                <Row>
                    <Col md={3} className="admin-filter">

                        <ContentFilter />

                        <div style={{marginTop: '20px'}}>
                            <CustomPagination />
                        </div>
                    </Col>

                    <Col md={9}>

                    </Col>
                </Row>

            </Fragment>
        )
    }
}

export default Admin;