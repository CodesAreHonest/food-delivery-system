import {applyMiddleware, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import reducer from './reducer';
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly';


const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

export default store;