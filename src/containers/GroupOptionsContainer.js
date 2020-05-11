import React, { Component } from 'react';

class GroupOptionsContainer extends Component {

    state = {}

    handleChange = (e) => {
        const { target } = e;
        const { checked, name } = target;
        const value = checked ? target.value : ""
        
        this.setState({
            [name]:value
        });
       
    }

    handleClick = () => {
        // console.log(this.state)
        const optionIds = Object.values(this.state);

        // store options
        const arrOptions = [];

        // iterate over group options to collect only options
        this.props.groupOptions.forEach(groupOption => {
            groupOption.options.forEach(option => arrOptions.push(option))
        });
        
        const options = arrOptions.filter(option => optionIds.find(id => id === option.id));

        //resassign group_option with options that's been selected;
        const item = {...this.props.item };
        item.group_options = options;
        
        // console.log(item)
        this.props.addItemsToCart(item)

    }

    renderInputOptions(itemOptionId, options) {
        return options.map(option => {
            return (
                <div key={option.id} className="form-check form-check-inline">
                    <input
                        onChange={this.handleChange}
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
                
                { 
                    this.props.displayOptions ?
                        <div className="option-btn-group">
                            <button 
                                className="option-add-btn btn btn-danger btn-sm"
                                onClick={this.handleClick}
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