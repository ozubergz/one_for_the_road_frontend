import React from 'react';

const MenuItems = (props) => {
    
    const { item } = props;
    const { price, name, description } = item;

    return (
        <div onClick={() => props.addItemsToCart(item)} className="items-body">
            <div className="items-content">
                <h5 className="items-name">{name.toUpperCase()}</h5>
                <span className="items-description">{description}</span>
            </div>
            <div className="items-price">
                <h5>{price.toFixed(2)}</h5>
            </div>
            
            <div className="overlay">
                <div className="overlay-text">
                    <i class="fa fa-plus"></i> Add to Cart <i class="fa fa-shopping-cart"></i>
                </div>
            </div>

        </div>
    )
}

export default MenuItems;