import React, {Component, Fragment} from 'react';
import NavigationBar from "../../Admin/NavigationBar/NavigationBar";

import {Row, Col, Button} from 'reactstrap';
import AdminFilter from "./AdminFilter";
import CustomPagination from "../../components/Pagination/CustomPagination";

import ReactTable from "react-table";
import "react-table/react-table.css";
import {getTheadProps, getTrProps} from "./AdminStyle";

import {connect} from 'react-redux';
import AdminModal from "./AdminModal";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            modalOpen: false,
        };

        this.columns = [{
            Header: "Created On",
            accessor: 'created_at'
        }, {
            Header: 'Username',
            accessor: 's_username'
        }, {
            Header:  'Email',
            accessor: 's_email'
        }, {
            Header: 'Country',
            accessor: 's_country'
        }, {
            Header: 'Delivery Information',
            accessor: 'id',
            sortable: false,
            Cell: row => (
                <div>
                    <Button
                        color="success"
                        size="sm"
                        outline
                        id={row.value}
                        onClick={this.showDetail}
                    >More</Button>
                </div>
            )
        }];

        this.showDetail = this.showDetail.bind(this);
    }

    showDetail(e) {
        this.setState({modalOpen: true, order_id: e.target.id});
    }

    componentDidUpdate(prevProps) {

        if (prevProps.food_order !== this.props.food_order) {

            const {
                current_page: page,
                per_page: limit,
                to: total_records,
                last_page: pageSize
            } = this.props.food_order.data.data;

            const {data} = this.props.food_order.data.data;

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

            this.setState({
                page,
                limit,
                total_records,
                pageSize,
                data,
                table,
            });
        }
    }

    render() {

        const {table, modalOpen, order_id} = this.state;

        return (
            <Fragment>
                <NavigationBar />

                <Row className="admin-filter">
                    <Col md={3}>

                        <AdminFilter />
                    </Col>

                    <Col md={9}>
                        {table}
                    </Col>

                </Row>

                {
                    modalOpen &&
                        <AdminModal
                            order_id={order_id}
                            modal={modalOpen}
                            isOpen={() => this.setState({modalOpen: false})}
                        />
                }

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    food_order: state.admin.food_order
});

export default connect(mapStateToProps, null)(Admin);