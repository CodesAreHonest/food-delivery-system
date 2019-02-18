import React  from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap';

import FoodDelivery from './FoodDelivery/FoodDelivery';

if (document.getElementById('food_delivery')) {
    ReactDOM.render(<FoodDelivery />, document.getElementById('food_delivery'));
}