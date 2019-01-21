import React, {Component} from 'react';
import {
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
} from 'reactstrap';

export default class Dropdown extends Component {

    // constructor(props) {
    //     super(props);
    // }
    render() {

        return (
            <div>
                <DropdownToggle nav caret>
                    Yinghua
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        Change Password
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem>
                        Sign Out
                    </DropdownItem>
                </DropdownMenu>
            </div>
        )
    }
}