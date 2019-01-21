import React, {Component} from 'react';
import {NavbarToggler, NavbarBrand, Navbar, Collapse, Nav, Container} from 'reactstrap';
import {NavigationItem} from "./NavigationItem/NavigationItem";
import {UncontrolDropdown} from "./UncontrolDropdown/UncontrolDropdown";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drop_down_open: false
        };
    }

    toggle() {
        this.setState({drop_down_open: !this.state.drop_down_open})
    }

    render() {

        return (
            <header>
                <Navbar color="dark" dark expand="md">
                    <Container>
                        <NavbarBrand href="/tenancy/public/" className="logo">Tenancy</NavbarBrand>
                        <NavbarToggler onClick={this.toggle.bind(this)} />
                        <Collapse isOpen={this.state.drop_down_open} navbar className="dropdown">
                            <Nav className="ml-auto" navbar>
                                <NavigationItem
                                    name="Tenant Records"
                                    url="/tenancy/public/tenant/records"
                                />
                                <UncontrolDropdown />
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }


}

export default NavigationBar;