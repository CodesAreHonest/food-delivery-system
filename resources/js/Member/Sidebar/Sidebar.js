import React, {Component} from 'react';

class Sidebar extends Component {

    constructor (props) {
        super (props);

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {

        let active_menu = document.querySelector("#sidebar .active");
        active_menu.classList.remove("active");

        console.log(e.target);

    }

    render() {
        return (
            <ul id="sidebar" className="sidebar">
                <li className="active" onClick={this.onClick}>Edit Profile</li>
                <li className="nactive" onClick={this.onClick}>Credit Card</li>
            </ul>
        )
    }

}

export default Sidebar;