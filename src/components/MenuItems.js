import React, {Component} from 'react';

class MenuItems extends Component {
    
    state = {
        position: null
    }

    handleMouseOver = (id) => {
        this.setState({position: id})
    }

    handleMouseOut = () => {
        this.setState({position: null})
    }
    
    opacity(id) {
        if(id === this.state.position) {
            return  {
                display: 'block',
                backgroundColor: "rgba(37, 48, 80, 0.8)",
                animation: "opacity 1s"
            };
        }
        return {display: 'none'}
    }
    
    render() {
        const { item } = this.props;
        const { price, name, description } = item;
            return (
                <div
                    onMouseOut={() => {this.handleMouseOut()}}
                    onMouseOver={() => this.handleMouseOver(item.id)}
                    onClick={() => this.props.addItemsToCart(item)}
                    className="items-body"
                >
                <div className="items-content">
                    <h5 className="items-name">{name.toUpperCase()}</h5>
                    <span className="items-description">{description}</span>
                </div>
                <div className="items-price">
                    <h5>{price.toFixed(2)}</h5>
                </div>
                
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