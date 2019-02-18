import React, {Component, Fragment} from 'react';
import NavigationBar from "../../Admin/NavigationBar/NavigationBar";

import {Row, Col} from 'reactstrap';
import AdminFilter from "./AdminFilter";
import CustomPagination from "../../components/Pagination/CustomPagination";

import ReactTable from "react-table";
import "react-table/react-table.css";
import {getTheadProps, getTrProps} from "./AdminStyle";

import {connect} from 'react-redux';
import {get_food_order} from "./AdminAction";

class Admin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            status: {value: 'delivered', label: 'Delivered'},
            start_date: null,
            end_date: null,
            user_email: '',
            limit: 10,
            data: []
        };

        this.columns = [{

        }]
    }

    componentDidMount() {
        this.setState({loading: true});
        this.props.get_food_order (this.state);
    }

    componentDidUpdate(prevProps) {

        if (prevProps.food_order !== this.props.food_order) {

            const {
                current_page: page,
                per_page: limit,
                to: total_records,
                last_page: pageSize
            } = this.props.food_order.data;
            const {data} = this.props.food_order.data.data;

            const table = (
                <ReactTable
                    defaultPageSize={10}
                    manual
                    data = {data}
                    showPaginationTop = {false}
                    showPaginationBottom = {false}
                    showPageSizeOptions = {false}
                    pageSize={pageSize}
                    columns = {this.columns}
                    // defaultSorted = {[{id: '0', desc: false}]}
                    onSortedChange = {sorted => this.setState({ sorted })}
                    loading={this.state.loading}
                    getTheadProps={getTheadProps}
                    getTrProps={getTrProps}
                />
            );

            this.setState({
                loading: false,
                page,
                limit,
                total_records,
                pageSize,
                data,
                table
            });
        }
    }

    render() {

        // const {loading, data} = this.state;

        return (
            <Fragment>
                <NavigationBar />

                <Row>
                    <Col md={3} className="admin-filter">

                        <AdminFilter />

                        <div style={{marginTop: '20px'}}>
                            <CustomPagination page={1} pageSize={1}/>
                        </div>
                    </Col>

                    <Col md={9}>
                        {/*<ReactTable*/}
                            {/*defaultPageSize={10}*/}
                            {/*manual*/}
                            {/*data = {data}*/}
                            {/*showPaginationTop = {false}*/}
                            {/*showPaginationBottom = {false}*/}
                            {/*showPageSizeOptions = {false}*/}
                            {/*// pageSize={total_page}*/}
                            {/*columns = {this.columns}*/}
                            {/*// defaultSorted = {[{id: '0', desc: false}]}*/}
                            {/*onSortedChange = {sorted => this.setState({ sorted })}*/}
                            {/*loading={loading}*/}
                            {/*getTheadProps={getTheadProps}*/}
                            {/*getTrProps={getTrProps}*/}
                        {/*/>*/}
                    </Col>

                </Row>

            </Fragment>
        )
    }
}

const mapStateToProps = state => ({
    food_order: state.admin.food_order
});

const mapDispatchToProps = {
    get_food_order
};

export default connect(mapStateToProps, mapDispatchToProps)(Admin);