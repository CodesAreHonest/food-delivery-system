import React, {Component, Fragment} from 'react';

import {Container, Row, Col} from 'reactstrap';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import NavigationBar from "../NavigationBar/NavigationBar";

import {get_delivery_list_detail} from "./OrderAction";
import OrderItem from "./OrderItem"



class DeliveryHome extends Component {
    constructor(props) {
        super(props);

        this.state = {
            order: '',
        };

        this.renderOrder = this.renderOrder.bind(this);

    }

    renderOrder(data) {

        const {delivery_list} = data;

        const order = delivery_list.map((value, index) => {

            const {
                n_quantity,
                id,
                s_name,
                s_address,
                s_delivery_status
            } = value;

            return (
                <OrderItem
                    key={index}
                    food_name={s_name}
                    id={id}
                    address={s_address}
                    quantity={n_quantity}
                    status={s_delivery_status}
                />
            );
        });

        this.setState({
            order
        });

    }

    componentDidMount() {
        this.props.get_delivery_list_detail();
    }

    componentDidUpdate(prevProps) {

        if (this.props.get_delivery_list_response !== prevProps.get_delivery_list_response) {

            const {data} = this.props.get_delivery_list_response;

            const {total_count} = data;

            if (total_count > 0)  {
                this.renderOrder(data);
            }
        }
    }


    render() {
        return (
            <Fragment>
                <NavigationBar />
                    <Container>
                    <Row>
                        {this.state.order !== null &&
                        <>
                            <Col md={12}>
                                {this.state.order}
                            </Col>
                        </>}

                    </Row>

                </Container>
            </Fragment>
        )
    }
}

DeliveryHome.propTypes = {
    get_delivery_list_detail: PropTypes.func.isRequired,
    get_delivery_list_response: PropTypes.any

};

const mapStateToProps = state => ({
    get_delivery_list_response: state.delivery.get_delivery_list_response,
});

const mapDispatchToProps = {
    get_delivery_list_detail
};

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryHome);