import React from 'react';

const Menu = (props) => {
    return (
        <div className="menu-container container">
            <div onClick={() => props.addItem(props.item)} className="items">
                <h4>{props.item.name} <span>{props.item.price}</span> </h4>
            </div>
        </div>
    )
}

export default Menu;