import React, {Component} from 'react';

class MenuItems extends Component {
    
    state = {
        position: null,
        displayOptions: false
    }

    handleMouseOver = (id) => {
        this.setState({position: id})
    }

    handleMouseOut = () => {
        this.setState({position: null})
    }
    
    //add opacity effect when item is hovered 
    opacity(id) {
        if(id === this.state.position && !this.state.displayOptions) {
            //add style when item is hovered
            return  {
                display: 'block',
                backgroundColor: "rgba(37, 48, 80, 0.8)",
                animation: "opacity 1s"
            };
        }
        //else display overlay as none
        return {display: 'none'}
    }

    //render items' options
    renderItemOptions(itemOptions) {
        return itemOptions.map(itemOption => {
           return(
               <div key={itemOption.id} className="items-options" style={{display: this.state.displayOptions ? '' : 'none' }}>
                   <h6>{itemOption.name}</h6>
               </div>
           ) 
        });
    }
    
    //toggle to show items' options
    toggleOptions() {
        this.setState({
            displayOptions: !this.state.displayOptions
        });
    }
    
    render() {
        const { item } = this.props;
        const { price, name, description, item_options } = item;
        return (
            <div
                className="items"
                onMouseOut={() => {this.handleMouseOut()}}
                onMouseOver={() => this.handleMouseOver(item.id)}
                onClick={() => { 
                    item_options.length !== 0 ? 
                        this.toggleOptions()
                        :
                        this.props.addItemsToCart(item)                        
                 }
                }
            >
                <div className="items-body">

                    <div className="items-content">
                        <h6 className="items-name">{name.toUpperCase()}</h6>
                        <span className="items-description">{description}</span>
                    </div>

                    <div className="items-price">
                        <h6>{price.toFixed(2)}</h6>
                    </div>
                    
                    {/* <div className="overlay" style={this.opacity(item.id)}>
                        <div className="overlay-text" >
                            <i className="fa fa-plus"></i> Add to Cart <i className="fa fa-shopping-cart"></i>
                        </div>
                    </div> */}

                </div>

                {item_options.length !== 0 ? this.renderItemOptions(item_options) : null }

                <div className="overlay" style={this.opacity(item.id)}>
                    <div className="overlay-text" >
                        <i className="fa fa-plus"></i> Add to Cart <i className="fa fa-shopping-cart"></i>
                    </div>
                </div>

            </div>
        )
    }
}

export default MenuItems;