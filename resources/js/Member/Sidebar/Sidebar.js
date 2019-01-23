import React, {Component} from 'react';

const navigateClick = (e) => {
    let active_menu = document.querySelector("#sidebar .active");
    active_menu.classList.remove("active");
    e.target.className = 'active';
};

class Sidebar extends Component {

    constructor (props) {
        super (props);
    }

    render() {
        return (
            <aside>
                <ul id="sidebar" className="sidebar">
                    <li className="active" onClick={(e) => navigateClick(e)}>Edit Profile</li>
                    <li onClick={(e) => navigateClick(e)}>Credit Card</li>
                </ul>
            </aside>
        )
    }
}

export default Sidebar;