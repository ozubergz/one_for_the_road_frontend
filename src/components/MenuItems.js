import React, {Component} from 'react';
import ItemOptionsContainer from '../containers/ItemOptionsContainer';
// import { v4 as uuidv4 } from 'uuid';

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
    
    //toggle to show items' options
    toggleOptions() {
        this.setState({
            displayOptions: !this.state.displayOptions
        });
    }
    
    render() {
        const { item } = this.props;
        const { price, name, description, group_options } = item;
        return (
            <div
                className="items"
                onMouseOut={() => {this.handleMouseOut()}}
                onMouseOver={() => this.handleMouseOver(item.id)}
            >
                <div 
                    className="items-body"
                    onClick={() => { 
                        group_options.length !== 0 ? 
                            this.toggleOptions()
                            :
                            this.props.addItemsToCart(item)                        
                     }
                    }
                >
                    <div className="items-content">
                        <h6 className="items-name">{name.toUpperCase()}</h6>
                        <span className="items-description">{description}</span>
                    </div>
                    <div className="items-price">
                        <h6>{price.toFixed(2)}</h6>
                    </div>

                    <div className="overlay" style={this.opacity(item.id)}>
                        <div className="overlay-text" >
                            <i className="fa fa-plus"></i> Add to Cart <i className="fa fa-shopping-cart"></i>
                        </div>
                    </div>
                </div>
                
                { 
                    group_options.length !== 0 ? 
                        <ItemOptionsContainer 
                            displayOptions={this.state.displayOptions} 
                            itemOptions={group_options}
                            // itemId={uuidv4()}
                        /> 
                            : 
                        null
                }
            </div>
        )
    }
}

export default MenuItems;