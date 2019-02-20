import React, {Component} from 'react';
import {NavbarToggler, NavbarBrand, Navbar, Collapse, Nav, Container} from 'reactstrap';
import NavigationItem from "./NavigationItem/NavigationItem";
import UncontrolDropdown from "./UncontrolDropdown/UncontrolDropdown";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drop_down_open: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({drop_down_open: !this.state.drop_down_open})
    }

    render() {
        return (
            <header>
                <Navbar color="dark" dark expand="md" className="nav-bar-color-custom">
                    <Container>
                        <NavbarBrand href="/delivery">GOGO Restaurant Delivery Site</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.drop_down_open} navbar className="dropdown">
                            <Nav className="ml-auto" navbar>
                                <NavigationItem
                                    name="Check Delivery"
                                    url="/delivery/"
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