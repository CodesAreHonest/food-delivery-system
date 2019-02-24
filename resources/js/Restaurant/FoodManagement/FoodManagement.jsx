import React, {Component, Fragment} from "react";
import NavigationBar from "../NavigationBar/NavigationBar";

import ReactTable from "react-table";
import "react-table/react-table.css";
import {getTheadProps, getTrProps} from "../../Admin/Home/AdminStyle";

import {Row, Col, ButtonGroup, Button} from 'reactstrap';
import FoodFilter from "./FoodFilter";

import {connect} from 'react-redux';
import AddFood from "./AddFood";
import UpdateFood from "./UpdateFood";
import Swal from "sweetalert2";

import {get_restaurant_food, delete_food} from "./FoodManagementAction";

class FoodManagement extends Component {
    constructor(props) {
        super(props);

        this.state = {
            table: [],
            addModal: false,
            updateModal: false,
        };

        this.deleteFood = this.deleteFood.bind(this);

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
            Cell: ({row}) => (
                <ButtonGroup size="sm">
                    <Button
                        color="success"
                        id={row.id}
                        onClick={(e) => this.setState({updateModal: true, food_id: e.target.id})}
                    >Update </Button>
                    <Button color="danger" id={row.id} onClick={() => this.deleteFood(row.id, row.s_name)}>Delete</Button>
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

        if (prevProps.delete_response !== this.props.delete_response) {

            let {msgType, msgTitle, msg, response_code} = this.props.delete_response.data;

            if (response_code === 200) {
                this.props.get_restaurant_food();
            }

            Swal.fire({
                type: msgType,
                title: msgTitle,
                text: msg,
                allowOutsideClick: false,
                showConfirmButton: true,
                allowEnterKey: true,
                confirmButtonText: 'Ok',
                timer: 2000
            })
        }
    }

    deleteFood(id, name) {

        Swal.fire({
            type: 'warning',
            title: `Are you sure you want to delete ${name}`,
            text: 'The food deleted cannot be recovered.',
            allowOutsideClick: false,
            allowEscapeKey: true,
            allowEnterKey: true,
            showCancelButton: true,
            showConfirmButton: true,
            showCloseButton: true,
            confirmButtonText: 'Delete Food (Enter)',
            cancelButtonText: 'Cancel (Esc)',
            confirmButtonColor: '#b80e10',
            reverseButtons: true,
        }).then(response => {

            if (response.value) {
                this.props.delete_food(id);

                Swal.fire({
                    title: 'Submitting...',
                    allowOutsideClick: false,
                    showCancelButton: false,
                    showConfirmButton: false,
                    onBeforeOpen: () => {
                        Swal.showLoading();
                    }
                });
            }
        });
    }

    render() {

        const {table, addModal, updateModal, food_id} = this.state;

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

                {addModal &&
                    <AddFood
                        modal={addModal}
                        isOpen={() => this.setState({addModal: false})}
                    />
                }

                {updateModal &&
                    <UpdateFood
                        food_id={food_id}
                        modal={updateModal}
                        isOpen={() => this.setState({updateModal: false})}
                    />
                }
            </Fragment>

        )
    }
}

const mapStateToProps = state => ({
    food_list: state.restaurant.food_restaurant_list,
    delete_response: state.food.delete_food_response
});

const mapDispatchToProps = {
    get_restaurant_food,
    delete_food
};

export default connect(mapStateToProps, mapDispatchToProps)(FoodManagement);