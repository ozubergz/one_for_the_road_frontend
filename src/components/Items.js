import React from 'react';

const Items = (props) => {
    
    const { item } = props;
    const { price, name, description } = item;

    return (
        <div 
            
            className="items-body"
        >
            <div className="items-title">
                <h5>{name.toUpperCase()}</h5>
                <span>{description}</span>
            </div>
            <div className="items-price">
                <h5>{price.toFixed(2)}</h5>
            </div>
            <div className="btn-groups">
                <button 
                    onClick={() => props.addItemsToCart(item)}
                    className="btn btn-warning btn-sm add-btns">
                    <i className="fa fa-plus"></i>
                </button>
            </div>
            
        </div>
    )
}

export default Items;