import React, {Component, Fragment} from 'react';
import PropTypes from 'prop-types';

import {Container, Row, Col, Pagination, PaginationItem, PaginationLink, Spinner} from 'reactstrap';

import NavigationBar from "../NavigationBar/NavigationBar";
import SearchInput from "../../components/Input/SearchInput";
import ReactSelect from "../../components/Input/ReactSelect";

import {category_options} from "./MenuType";

import {connect} from 'react-redux';
import {get_food_menu} from "./HomeAction";
import FoodCard from "../../components/Food/FoodCard";
import Cart from "../../components/Cart/Cart";

const cartStyle = {
    backgroundColor: 'white',
    padding: '2px 3px',
    maxWidth: '40px',
    borderRadius: '10px',
    border: '1px solid darkgrey'
};

class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category: {label: 'All', value: 'all'},
            page: 1,
            limit: 3,
            total_records: 0,
            search: ''
        };

        this.onChange = this.onChange.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.renderFood = this.renderFood.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.searchFood = this.searchFood.bind(this);
    }

    componentDidMount() {

        this.setState({spinner: (
                <div className="text-center">
                    <Spinner color="primary" style={{ width: '5rem', height: '5rem' }}/>
                </div>
            )
        });

        this.props.get_food_menu(this.state);
    }

    componentDidUpdate (prevProps) {

        if (this.props.food_detail !== prevProps.food_detail) {
            this.renderFood(this.props.food_detail);
        }
    }

    renderFood(food_detail) {

        const {data, current_page, per_page, to, last_page} = food_detail;

        const food = data.map ((value, index) =>  {

            const {
                id, s_name, f_price, s_description, s_image
            } = value;

            return (
                <Col md={4} key={index}>
                    <FoodCard
                        id={id}
                        className="card-shadow"
                        food_name={s_name}
                        food_price={f_price}
                        food_description={s_description}
                        image={s_image}
                        quantity_disabled={false}
                        cart_disabled={false}
                    />
                </Col>
            )
        });

        this.setState({
            food,
            page: current_page,
            limit: per_page,
            total_records: to,
            pageSize: last_page,
            spinner: null
        });

    }

    onSelectChange(category) {
        this.setState({category}, () => {
            this.props.get_food_menu(this.state);
        });
    }

    onChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    handleClick(e, page) {

        e.preventDefault();

        this.setState({page}, () => {
            this.props.get_food_menu(this.state);
        });
    }

    searchFood (search) {
        this.setState({search}, () => {
            this.props.get_food_menu(this.state);
        })
    }

    render() {
        return (
            <Fragment>
                <NavigationBar />

                <div className="search-division">
                    <Container>
                        <Row style={{marginBottom: '10px'}}>
                            <Col md={3}>
                                <ReactSelect
                                    name="category"
                                    className="form-control"
                                    closeMenuOnSelect={true}
                                    options={category_options}
                                    value={this.state.category}
                                    onChange={this.onSelectChange}
                                    placeholder="All"
                                />
                            </Col>

                            <Col md={7}>
                                <SearchInput onSearchClick={this.searchFood}/>
                            </Col>

                            <Col md={2}>
                                <Cart />
                            </Col>
                        </Row>


                    </Container>
                </div>

                <Container>
                    <div style={{marginTop: '10px'}}>

                        {this.state.spinner}

                        <Row>
                            {this.state.food}
                        </Row>
                    </div>

                    <hr />

                    <div>
                        <Pagination aria-label="Food Pagination">

                            <PaginationItem disabled={this.state.page <= 1}>

                                <PaginationLink
                                    onClick={e => this.handleClick(e, this.state.page - 1)}
                                    previous
                                />

                            </PaginationItem>

                            {[...Array(this.state.pageSize)].map((page, i) =>
                                <PaginationItem active={i === this.state.page - 1} key={i}>
                                    <PaginationLink onClick={e => this.handleClick(e, i + 1)}>
                                        {i + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            )}

                            <PaginationItem disabled={this.state.page >= this.state.pageSize}>

                                <PaginationLink
                                    onClick={e => this.handleClick(e, this.state.page + 1)}
                                    next
                                />

                            </PaginationItem>

                        </Pagination>
                    </div>
                </Container>
            </Fragment>
        )
    }
}

Home.propTypes = {
    food_detail: PropTypes.any,
    get_food_menu: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    food_detail: state.food.food_detail
});

const mapDispatchToProps = {
    get_food_menu
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);