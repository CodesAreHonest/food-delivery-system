import React, {Component} from 'react';
import {NavbarToggler, NavbarBrand, Navbar, Collapse, Nav, Container} from 'reactstrap';
import NavigationItem from "./NavigationItem/NavigationItem";

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
                        <NavbarBrand href="/member">GOGO Admin Site</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.drop_down_open} navbar className="dropdown">
                            <Nav className="ml-auto" navbar>
                                <NavigationItem
                                    name="Food Order"
                                    url="/admin"
                                />

                                <NavigationItem
                                    name="Add Admin"
                                    url="/member/order/history"
                                />
                            </Nav>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        )
    }


}

export default NavigationBar;