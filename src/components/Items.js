import React from 'react';

const Items = (props) => {
    
    const { item } = props;
    const price = item.price;
    const name = item.name;

    return (
        <div 
            onClick={() => props.addItemsToCart(item)}
            className="items"
        >
            <h4>{name} <span>{price.toFixed(2)}</span> </h4>
        </div>
    )
}

export default Items;