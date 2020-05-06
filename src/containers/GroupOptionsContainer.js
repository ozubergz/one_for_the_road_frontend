import React, { Component } from 'react';

class ItemOptionsContainer extends Component {

    renderInputOptions(itemOptionId, options) {
        return options.map(option => {
            return (
                <div key={option.id} className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type={option.input_type} 
                        name={`option-${itemOptionId}`} 
                        value={option.id} 
                        id={option.id} 
                    />
                    <label className="form-check-label" htmlFor={option.id}>
                        {option.name} {option.price && option.price !== 0 ? `$${option.price.toFixed(2)}` : null}
                    </label>
                </div>
            )
        })
    }

    render() {
        return (
            <div>
                {this.props.groupOptions.map(groupOption => {
                    return(
                        <div 
                            key={groupOption.id} 
                            className="items-options" 
                            style={{display: this.props.displayOptions ? '' : 'none' }}
                        >
                            <div className="item-options-title">
                                <h6>{groupOption.name}</h6>
                            </div>
                            <div className="item-optitons-required">
                                { 
                                    groupOption.required === 'true' ?
                                        <span style={{color: "red"}}>Required - Choose 1</span>
                                            :
                                        <span style={{color: "grey"}}>Optional</span>
                                }
                            </div>
                            <div className="input-option-group">
                                {this.renderInputOptions(groupOption.id, groupOption.options)}
                            </div>
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