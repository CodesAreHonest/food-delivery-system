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
            case 'EditAdmin':
                document.getElementById('EditAdmin').className = 'active';
                break;
            case 'AddAdmin':
                document.getElementById('AddAdmin').className = 'active';
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
                    <Link to="/admin/management" style={{textDecoration: 'none'}}>
                        <li id="EditAdmin">
                            Edit Admin
                        </li>
                    </Link>
                    <Link to="/admin/add" style={{textDecoration: 'none'}}>
                        <li id="AddAdmin">
                            Add Admin
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
    feature: 'EditAdmin'
};

export default Sidebar;