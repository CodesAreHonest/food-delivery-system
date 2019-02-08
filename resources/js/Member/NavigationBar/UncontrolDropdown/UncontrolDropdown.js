import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Link} from 'react-router-dom';

import {connect} from 'react-redux';
import {get_username} from "./UncontrolDropDownAction";

class UncontrolDropdown extends Component {

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.onMouseEnter = this.onMouseEnter.bind(this);
        this.onMouseLeave = this.onMouseLeave.bind(this);

        this.state = {
            dropdownOpen: false
        };
    }

    componentDidMount() {
        this.props.get_username();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.username !== this.props.username) {

            const {username} = this.props;
            this.setState({username});
        }
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
    }

    onMouseEnter() {
        this.setState({dropdownOpen: true});
    }

    onMouseLeave() {
        this.setState({dropdownOpen: false});
    }

    render() {
        return (
            <Dropdown
                nav
                inNavbar
                isOpen={this.state.dropdownOpen}
                onMouseOver={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                toggle={this.toggle}
            >
                <DropdownToggle nav caret>
                    {this.state.username}
                </DropdownToggle>
                <DropdownMenu right>
                    <Link to="/member/manage/account">
                        <DropdownItem>
                            Manage Account
                        </DropdownItem>
                    </Link>
                    <DropdownItem divider />
                    <DropdownItem href="/member/logout">
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}

UncontrolDropdown.propTypes = {
    username: PropTypes.string.isRequired,
    get_username: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    username: state.member.username
});

const mapDispatchToProps = {
    get_username
};

export default connect(mapStateToProps, mapDispatchToProps)(UncontrolDropdown);

