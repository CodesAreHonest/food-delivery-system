import React, {Component, Fragment} from 'react';

import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

import ReactTable from "react-table";
import {getTheadProps, getTrProps} from "../Home/AdminStyle";

import {connect} from 'react-redux';
import {get_admin_list} from "./ManagementAction";

import {Row, Col} from 'reactstrap';

class Management extends Component {

    constructor(props) {
        super(props);

        this.state = {
            table: ''
        };

        this.columns = [{
            Header: 'Created On',
            accessor: 'created_at'
        }, {
            Header: 'Username',
            accessor: 's_username'
        }, {
            Header: 'Email',
            accessor: 's_email'
        }, {
            Header: 'Role',
            accessor: 's_role'
        }];
    }

    componentDidMount() {
        this.props.get_admin_list();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.list !== this.props.list) {

            const {pageSize, data} = this.props.list;

            const table = (
                <ReactTable
                    manual
                    data = {data}
                    showPaginationTop = {false}
                    showPaginationBottom = {false}
                    showPageSizeOptions = {false}
                    pageSize={pageSize}
                    columns = {this.columns}
                    resizable = {false}
                    sortable = {false}
                    getTheadProps={getTheadProps}
                    getTrProps={getTrProps}
                />
            );

            this.setState({table});
        }
    }

    render() {

        const {table} = this.state;

        return (
            <Fragment>
                <NavigationBar />

                <Sidebar feature="AddAdmin" />

                <div className="account-manage-content">
                    <section>

                        <Row>
                            <Col md={5}>
                                <div className="edit-profile-background">
                                </div>
                            </Col>

                            <Col md={7}>
                                <div className="edit-profile-background">
                                    {table}
                                </div>
                            </Col>
                        </Row>

                    </section>
                </div>



            </Fragment>
        )

    }

}

const mapStateToProps = state => ({
    list: state.admin.list
});

const mapDispatchToProps = {
    get_admin_list
};

export default connect(mapStateToProps, mapDispatchToProps)(Management);