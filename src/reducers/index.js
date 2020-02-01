import { combineReducers } from 'redux';
import menuReducer from './menuReducer';
import cartReducer from './cartReducer'

export default combineReducers({
    menu: menuReducer,
    cart: cartReducer
})