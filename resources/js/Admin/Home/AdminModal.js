import React, {Component} from 'react';
import {Button, Modal, ModalBody, ModalFooter, Row, Col} from 'reactstrap';

import {connect} from 'react-redux';
import {get_food_detail} from "./AdminAction";
import {FoodDetail, DeliveryDetail} from "./AdminDetail";

class AdminModal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: this.props.modal
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.props.isOpen();
    }

    componentDidMount() {
        this.props.get_food_detail(this.props.order_id)
    }

    componentDidUpdate (prevProps) {

        if (prevProps.food_detail !== this.props.food_detail) {

            const data = this.props.food_detail.data.data.data[0];

            // food detail
            const {
                s_name: name,
                s_category: category,
                n_quantity: quantity,
                f_total_price: total_price,
            } = data;

            // delivery detail
            const {
                s_delivery_status: delivery_status,
                s_delivery_id: delivery_company,
                s_delivery_fee: delivery_fee
            } = data;

            this.setState({
                name, category, quantity, total_price, delivery_status, delivery_company, delivery_fee
            });
        }
    }


    render() {

        const {modal, className} = this.props;
        const {name, category, quantity, total_price, delivery_status, delivery_company, delivery_fee} = this.state;

        return (
            <Modal isOpen={modal} toggle={this.toggle} className={className} size="lg">
                <ModalBody>
                    <Row>
                        <Col md={6}>
                            <FoodDetail
                                name={name}
                                category={category}
                                quantity={quantity}
                                total_price={total_price}
                            />
                        </Col>

                        <Col md={6}>
                            <DeliveryDetail
                                delivery_status={delivery_status}
                                delivery_company={delivery_company}
                                delivery_fee={delivery_fee}
                            />
                        </Col>
                    </Row>

                </ModalBody>
                <ModalFooter>
                    <Button color="success" onClick={this.toggle}>OK</Button>

                </ModalFooter>
            </Modal>

        )
    }
}

const mapStateToProps = state => ({
    food_detail: state.admin.food_detail
});

const mapDispatchToProps = {
    get_food_detail
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminModal);