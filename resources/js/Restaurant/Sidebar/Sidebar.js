import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import PropTypes from 'prop-types';

class Sidebar extends Component {

    constructor (props) {
        super (props);

        this.state = {
            feature: this.props.feature
        };

        this.sidebarClasses = this.sidebarClasses.bind(this);
    }

    sidebarClasses() {

        switch (this.props.feature) {
            case 'DeliveryList':
                document.getElementById('DeliveryList').className = 'active';
                break;
            case 'DeliveryTeam':
                document.getElementById('DeliveryTeam').className = 'active';
                break;
        }

    }

    componentDidMount() {
        this.sidebarClasses();
    }

    render() {
        return (
            <aside>
                <ul id="sidebar" className="sidebar">
                    <Link to="/restaurant/delivery/list" style={{textDecoration: 'none'}}>
                        <li id="DeliveryList">
                            Delivery List
                        </li>
                    </Link>
                    <Link to="/restaurant/delivery/team" style={{textDecoration: 'none'}}>
                        <li id="DeliveryTeam">
                            Delivery Team
                        </li>
                    </Link>
                </ul>
            </aside>
        )
    }
}

Sidebar.propTypes = {
    feature: PropTypes.string.isRequired,
};

Sidebar.defaultProps = {
    feature: 'SalesHistory'
};

export default Sidebar;