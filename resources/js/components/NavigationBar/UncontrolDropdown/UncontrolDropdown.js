import React from 'react';
import {UncontrolledDropdown} from 'reactstrap';
import Dropdown from "./Dropdown/Dropdown";

export const UncontrolDropdown = ()=> (
    <UncontrolledDropdown nav inNavbar>
        <Dropdown/>
    </UncontrolledDropdown>
);
