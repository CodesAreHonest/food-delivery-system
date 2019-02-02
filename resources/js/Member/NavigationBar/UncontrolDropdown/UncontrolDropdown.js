import React, {Component} from 'react';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';
import {Link} from 'react-router-dom';

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
                    Yinghua
                </DropdownToggle>
                <DropdownMenu right>
                    <Link to="/member/manage/account">
                        <DropdownItem>
                            Manage Account
                        </DropdownItem>
                    </Link>
                    <DropdownItem>
                        Order History
                    </DropdownItem>
                    <DropdownItem>
                        Favourites
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="/member/logout">
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}

export default UncontrolDropdown;

