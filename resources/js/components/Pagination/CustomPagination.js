import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

class CustomPagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: this.props.page,
            pageSize: this.props.pageSize,
        };

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e, page) {

        e.preventDefault();

        this.setState({page}, () => {
            this.props.get_food_menu(this.state);
        });
    }

    render() {

        const {page, pageSize} = this.state;

        return (
            <Pagination aria-label="Food Pagination" className="text-center">

                <PaginationItem disabled={page <= 1}>

                    <PaginationLink
                        onClick={e => this.handleClick(e, page - 1)}
                        previous
                    />

                </PaginationItem>

                {[...Array(pageSize)].map((page, i) =>
                    <PaginationItem active={i === page - 1} key={i}>
                        <PaginationLink onClick={e => this.handleClick(e, i + 1)}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem disabled={page >= pageSize}>

                    <PaginationLink
                        onClick={e => this.handleClick(e, page + 1)}
                        next
                    />

                </PaginationItem>
            </Pagination>
        )
    }
}

CustomPagination.defaultProps = {
    page: 1
};

CustomPagination.propTypes = {
    page: PropTypes.any.isRequired,
    pageSize: PropTypes.any.isRequired,
};

export default CustomPagination;