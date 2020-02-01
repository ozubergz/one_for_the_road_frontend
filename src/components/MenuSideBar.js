import React from 'react';
import { Link } from 'react-router-dom';

const MenuSideBar = (props) => {

    const renderCategoryList = () => {
        return props.categories.map(category => {
            return (
                <div key={category.id}>
                    <Link to={`/order/menu/${category.id}`}>
                        {category.name}
                    </Link>
                </div>
            )
        });
    }

    return (
        <div className="menu-sidebar">
            <h1>Menu Sidebar</h1>
            {renderCategoryList()}
        </div>
    )
}

export default MenuSideBar;