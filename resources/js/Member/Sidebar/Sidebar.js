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
            case 'CreditCard':
                document.getElementById('CreditCard').className = 'active';
                break;
            case 'EditProfile':
                document.getElementById('EditProfile').className = 'active';
                break;
            case 'EditLocation':
                document.getElementById('EditLocation').className = 'active';
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
                    <Link to="/member/manage/account" style={{textDecoration: 'none'}}>
                        <li id="EditProfile">
                            Edit Profile
                        </li>
                    </Link>
                    <Link to="/member/location/information" style={{textDecoration: 'none'}}>
                        <li id="EditLocation">
                            Location Information
                        </li>
                    </Link>

                    <Link to="/member/credit/card"  style={{textDecoration: 'none'}}>
                        <li id="CreditCard">
                            Credit Card
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
    feature: 'EditProfile'
};

export default Sidebar;