import React  from 'react';
import ReactDOM from 'react-dom';

import Example from './components/Example';

if (document.getElementById('food_delivery')) {
    ReactDOM.render(<Example />, document.getElementById('food_delivery'));
}