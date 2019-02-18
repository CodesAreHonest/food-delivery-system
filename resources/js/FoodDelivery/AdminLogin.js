import React, {Component} from 'react';

import Login from "../Admin/Login/Login";

class AdminLogin extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        document.body.classList.add('admin-app');
    }

    componentWillUnmount() {
        document.body.classList.remove('admin-app');
    }

    render() {
        return (
            <div className="container vertical-center">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <Login />
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminLogin;