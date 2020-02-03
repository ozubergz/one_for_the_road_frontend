import React from 'react';
import { Link } from 'react-router-dom';
import cartLogo from '../images/cart-logo.png';

const MenuSideBar = (props) => {

    const renderCategoryList = () => {
        return props.categories.map(category => {
            return (
                <div className="category-list" key={category.id}>
                    <Link to={`/order/menu/${category.id}`}>
                        {category.name}
                    </Link>
                </div>
            )
        });
    }

    return (
        <div className="menu-sidebar">
            <div className="cart-logo-container">
                <img className="cart-logo" src={cartLogo} alt="cart logo"/>
                <Link className="cart-link" to="/cart"></Link>
            </div>
            <div className="cart-number">
                {props.numOfItems}
            </div>
            {renderCategoryList()}
        </div>
    )
}

export default MenuSideBar;