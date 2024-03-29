import {applyMiddleware, createStore, compose} from "redux";
import thunk from 'redux-thunk';
import reducer from './reducer';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    reducer,
    initialState,
    compose(
        applyMiddleware(...middleware)
    )
);

export default store;