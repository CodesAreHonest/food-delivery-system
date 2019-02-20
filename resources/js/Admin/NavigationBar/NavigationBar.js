import React, {Component} from 'react';
import {NavbarToggler, NavbarBrand, Navbar, Collapse, Nav, Container, NavItem, NavLink, Button} from 'reactstrap';
import NavigationItem from "./NavigationItem/NavigationItem";

class NavigationBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drop_down_open: false
        };

        this.toggle = this.toggle.bind(this);
        this.logout = this.logout.bind(this);
    }

    toggle() {
        this.setState({drop_down_open: !this.state.drop_down_open})
    }

    logout() {
        window.location.replace ('/admin/logout');
    }

    render() {

        return (
            <header>
                <Navbar color="dark" dark expand="md" className="nav-bar-color-custom" sticky="top">
                    <Container>
                        <NavbarBrand href="/member">GOGO Admin Site</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.drop_down_open} navbar className="dropdown">
                            <Nav className="ml-auto" navbar>
                                <NavigationItem
                                    name="Food Order Monitoring"
                                    url="/admin"
                                />

                                <NavigationItem
                                    name="Admin Management"
                                    url="/admin/management"
                                />

                                <NavItem className="nav-bar-custom">
                                    <Button color="secondary" onClick={this.logout}>Sign Out </Button>
                                </NavItem>
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }


}

export default NavigationBar;