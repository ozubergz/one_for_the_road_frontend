import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer';
import userReducer from './userReducer';
import adminReducer from './adminReducer';

export default combineReducers({
    menu: menuReducer,
    cart: cartReducer,
    user: userReducer,
    admin: adminReducer
})