import React, {Component} from 'react';

class Login extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container" style={{marginTop: '30px'}}>
                <div className="row justify-content-center">
                    <div className="col-md-8">

                        <h1 style={{textAlign: 'center', marginBottom: '10px'}}>Food Delivery System </h1>
                        <div className="card">
                            <div className="card-body">
                                I'm a sohai.
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login;