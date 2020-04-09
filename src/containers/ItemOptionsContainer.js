import React, { Component } from 'react';

class ItemOptionsContainer extends Component {

    renderOptions(itemOptionId, options) {
        return options.map(option => {
            return (
                <div key={option.id} className="form-check form-check-inline">
                    <input className="form-check-input" type={option.input_type} name={`option-${itemOptionId}`} value={option.id} id={option.id} />
                    <label className="form-check-label" htmlFor={option.id}>
                        {option.name} {option.price ? `$${option.price.toFixed(2)}` : null}
                    </label>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.props.itemOptions.map(itemOption => {
                    return(
                        <div 
                            key={itemOption.id} 
                            className="items-options" 
                            style={{display: this.props.displayOptions ? '' : 'none' }}
                        >
                            <h6>{itemOption.name}</h6>
                            {this.renderOptions(itemOption.id, itemOption.options)}
                        </div>
                    )
                })}
                
                { this.props.displayOptions ?
                    <div className="option-btn-group">
                        <button className="option-add-btn btn btn-danger btn-sm" >Add to Cart</button> 
                    </div>
                        : 
                    null
                } 
            </div>
        );
    }
}

export default ItemOptionsContainer;