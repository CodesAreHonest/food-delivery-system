import React, {Component, Fragment} from "react";
import NavigationBar from "../NavigationBar/NavigationBar";


import ReactTable from "react-table";
import "react-table/react-table.css";
import {getTheadProps, getTrProps} from "../../Admin/Home/AdminStyle";

import {Row, Col, ButtonGroup, Button} from 'reactstrap';
import FoodFilter from "./FoodFilter";

import {connect} from 'react-redux';
import AdminModal from "../../Admin/Home/AdminModal";
import AddFood from "./AddFood";

class FoodManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            table: [],
            addModal: false,
            updateModal: false,
            deleteModal: false
        };

        this.columns = [{
            Header: 'Created At',
            accessor: 'created_at'
        }, {
            Header: 'Food Name',
            accessor: 's_name'
        }, {
            Header: 'Food Category',
            accessor: 's_category'
        }, {
            Header: 'Food Price',
            accessor: 'f_price',
            Cell: row => (
                <div>RM {row.value}</div>
            )
        }, {
            Header: 'Action',
            accessor: 'id',
            Cell: row => (
                <ButtonGroup size="sm">
                    <Button color="success" id={row.value}>Update </Button>
                    <Button color="danger" id={row.value}>Delete</Button>
                </ButtonGroup>
            )
        }]
    }

    componentDidUpdate (prevProps) {

        if (prevProps.food_list !== this.props.food_list) {

            const {
                last_page: pageSize,
                data
            } = this.props.food_list;

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

        const {table, addModal, updateModal, deleteModal} = this.state;

        return (
            <Fragment>
                <NavigationBar />

                <Row className="admin-filter">
                    <Col md={3}>

                        <Button
                            color="primary"
                            block
                            style={{marginBottom: '10px'}}
                            onClick={() => this.setState({addModal: true})}
                        >
                            Add Food
                        </Button>

                        <FoodFilter />

                    </Col>

                    <Col md={9}>
                        {table}
                    </Col>
                </Row>

                {
                    addModal &&
                    <AddFood
                        modal={addModal}
                        isOpen={() => this.setState({addModal: false})}
                    />
                }
            </Fragment>

        )
    }
}

const mapStateToProps = state => ({
    food_list: state.restaurant.food_restaurant_list
});

export default connect(mapStateToProps, null)(FoodManagement);