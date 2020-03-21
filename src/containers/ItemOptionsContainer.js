import React, { Component } from 'react';

class ItemOptionsContainer extends Component {

    renderOptions(options) {
        return options.map(option => {
            return (
                <div className="form-check">
                    <input className="form-check-input" type="radio" name={option.name} id={option.id} />
                    <label className="form-check-label" htmlFor={option.id}>
                        {option.name}
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
                        <div key={itemOption.id} className="items-options" style={{display: this.props.displayOptions ? '' : 'none' }}>
                            <h6>{itemOption.name}</h6>
                            {this.renderOptions(itemOption.options)}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default ItemOptionsContainer;