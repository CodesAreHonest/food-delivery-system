import React, {Component} from 'react'
import {NavItem, NavLink} from 'reactstrap';
import PropTypes from 'prop-types';

class NavigationItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <NavItem className="nav-bar-custom">
                <NavLink href={this.props.url}>{this.props.name}</NavLink>
            </NavItem>
        );
    }
}

NavigationItem.propTypes = {
    url: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    className: PropTypes.string,
};

export default NavigationItem;
