import React from 'react'
import {NavItem, NavLink} from 'reactstrap';
import {Link} from 'react-router-dom';

export const NavigationItem = props => (
    <NavItem>
        <Link to={props.url} style={{ textDecoration: 'none' }}>
            <NavLink>{props.name}</NavLink>
        </Link>
    </NavItem>
);