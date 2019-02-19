import React, {Component, Fragment} from 'react';

import NavigationBar from "../NavigationBar/NavigationBar";
import Sidebar from "../Sidebar/Sidebar";

import ReactTable from "react-table";
import {getTheadProps, getTrProps} from "../Home/AdminStyle";

import {connect} from 'react-redux';
import {get_admin_list} from "./ManagementAction";

class Management extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.get_admin_list();
    }

    componentDidUpdate(prevProps) {

        if (prevProps.list !== this.props.list) {
            console.log (this.props.list);
        }
    }

    render() {

        return (
            <Fragment>
                <NavigationBar />

                <Sidebar feature="AddAdmin" />

                {/*<ReactTable*/}
                {/*manual*/}
                {/*data = {data}*/}
                {/*showPaginationTop = {false}*/}
                {/*showPaginationBottom = {false}*/}
                {/*showPageSizeOptions = {false}*/}
                {/*pageSize={pageSize}*/}
                {/*columns = {this.columns}*/}
                {/*resizable = {false}*/}
                {/*sortable = {false}*/}
                {/*getTheadProps={getTheadProps}*/}
                {/*getTrProps={getTrProps}*/}
                {/*/>*/}


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