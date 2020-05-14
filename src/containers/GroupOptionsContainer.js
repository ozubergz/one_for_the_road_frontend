import React, { Component } from 'react';

class GroupOptionsContainer extends Component {

    state = {}

    handleChange = (e) => {
        // console.log(e.target.value)

        const { target } = e;
        const { checked, name } = target;
        const value = checked ? target.value : "";
        
        this.setState({
            [name]: value
        });
       
    }

    handleClick = () => {
        const optionIds = Object.values(this.state);

        // store options
        const arrOptions = [];

        // iterate over group options to collect only options
        this.props.groupOptions.forEach(groupOption => {
            groupOption.options.forEach(option => arrOptions.push(option))
        });
        
        const options = arrOptions.filter(option => optionIds.find(id => id === option.id));

        //assign new property with selected options
        const item = { ...this.props.item };
        item.select_options = options;
        
        //add item to cart
        this.props.addItemsToCart(item);
    }

    //this renders all radio or checkbox inputs
    renderInputOptions(itemOptionId, options) {
        const selectOptions = options.filter((option) => {
           return option.input_type === 'radio' 
        });
        
        if (selectOptions.length !== 0 ) {
            return (
                <select onChange={this.handleChange}>
                    {
                        selectOptions.map(option => {
                            return ( 
                                <option 
                                    
                                    value={option.id}
                                    key={option.id} 
                                >
                                    {option.name}
                                </option>
                            )
                        })
                    }
                </select>
            )
        } else {
            return options.map(({ id, input_type, name, price }) => {
                return (
                    <div key={id} className="form-check form-check-inline">
                        { input_type === 'checkbox' ? 
                            <input
                                onChange={this.handleChange}
                                className="form-check-input" 
                                type={input_type} 
                                name={`option-${itemOptionId}`} 
                                value={id} 
                                id={id} 
                            />
                            : null
                        }
                        <label className="form-check-label" htmlFor={id}>
                            {name} { price && price !== 0 ? `$${price.toFixed(2)}` : null}
                        </label>
                    </div>
                )
            });
        }
    }

    render() {
        const { groupOptions, displayOptions } = this.props;

        return (
            <div>
                {
                    groupOptions.map(({id, name, required, options}) => {
                    
                        required = (required === 'true') ? true : false;              

                        return(
                            <div 
                                key={id} 
                                className="items-options" 
                                style={{display: displayOptions ? '' : 'none' }}
                            >
                                <div className="item-options-title">
                                    <h6>{name}</h6>
                                </div>
                                <div className="item-optitons-required">
                                    { 
                                        <span style={{ color: required ? "red" : "grey" }}>
                                            { required ? "Required - Choose 1" : "Optional" }
                                        </span>
                                    }
                                </div>

                                {/* each item have groups of inputs */}
                                <div className="input-option-group">
                                    { this.renderInputOptions(id, options) }
                                </div>
                            </div>
                        )
                    })
                }
                
                { 
                    displayOptions ?
                        <div className="option-btn-group">
                            <button 
                                className="option-add-btn btn btn-danger btn-sm"
                                onClick={this.handleClick}
                                // disabled
                            >Add to Cart
                            </button> 
                        </div>
                            :
                        null
                } 
            </div>
        );
    }
}

export default GroupOptionsContainer;