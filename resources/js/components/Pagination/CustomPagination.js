import React, {Component} from 'react';
import {Pagination, PaginationItem, PaginationLink} from "reactstrap";

class CustomPagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            page: this.props.page
        }
    }

    render() {
        return (
            <Pagination aria-label="Food Pagination" className="text-center">

                <PaginationItem disabled={this.state.page <= 1}>

                    <PaginationLink
                        onClick={e => this.handleClick(e, this.state.page - 1)}
                        previous
                    />

                </PaginationItem>

                {[...Array(this.state.pageSize)].map((page, i) =>
                    <PaginationItem active={i === this.state.page - 1} key={i}>
                        <PaginationLink onClick={e => this.handleClick(e, i + 1)}>
                            {i + 1}
                        </PaginationLink>
                    </PaginationItem>
                )}

                <PaginationItem disabled={this.state.page >= this.state.pageSize}>

                    <PaginationLink
                        onClick={e => this.handleClick(e, this.state.page + 1)}
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

export default CustomPagination;