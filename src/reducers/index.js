import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';

export default combineReducers({
    menu: menuReducer,
    cart: cartReducer,
    user: userReducer
})