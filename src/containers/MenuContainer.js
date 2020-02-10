import React, { Component } from 'react';
import { connect } from 'react-redux';
// import { Route } from 'react-router';
import MenuItems from '../components/MenuItems';
// import MenuSideBar from '../components/MenuSideBar';
import { addItemToCart } from '../actions';
import CartBox from '../components/CartBox';
import Banner from '../components/Banner'


class MenuContainer extends Component {
    

    //render the main menu page of food items
    renderMenu() {
        let categories = this.props.menus;
        return categories.map(category => {
            return (
                
                <div className="menu-page" key={category.id}>
                    <div className="menu-body">
                        <div className="menu-header">
                            <h3>{category.name.toUpperCase()}</h3>
                        </div>
                        {this.renderMenuItems(category.items)}
                    </div>
                </div>
                
            )
        });
    }

    //render all menu items
    renderMenuItems = (items) => {
        return items.map(item => {
            return ( 
                <MenuItems 
                    key={item.id} 
                    addItemsToCart={this.addItemsToCart}
                    item={item}
                />
            )
        });
    }

    //add item to redux state and localStorage
    addItemsToCart = (item) => {
        // call dispatch to addItems
        this.props.addItem(item);
        
        if(!localStorage.cart) {
            //create new cart array when cart does not exists from localStorage
            let newCart = [];
            newCart[0] = item;
            localStorage.cart = JSON.stringify(newCart);
        } else {
            //else get cart from localStorage and push items into cart array
            let cartLS = JSON.parse(localStorage.cart);
            cartLS.push(item);
            localStorage.cart = JSON.stringify(cartLS)
        }
    }

    // nestedArray() {
    //     let arr = this.props.menus;
    //     let nestedArr = [];
    //     for(let i = 0; i < arr.length; i++) {
    //         nestedArr.push(arr.splice(0, 6));
    //         if(arr.length < 6) nestedArr.push(arr.splice(0, arr.length))
    //     }        
    //     return nestedArr;
    // }

    // carouselItems = () => {
    //     let nestedArr = this.nestedArray();
    //     let firstArr = nestedArr[0];
    //     let lastArrs = nestedArr.slice(0, nestedArr.length);
        
    //     return(
    //         <div className="container carousel-inner no-padding">
    //             <div className="carousel-item active">
    //                 {this.renderCarouselItems(firstArr)}
    //             </div> 
    //             {lastArrs.map(arr => {
    //                 return (
    //                     <div className="carousal-item">
    //                         {arr.map(category => {
    //                             return (
    //                                 <div className="col-sm-2">
    //                                     <span>{category.name}</span>
    //                                 </div>
    //                             )
    //                         })}
    //                     </div>
    //                 )
    //             })}
    //         </div>
    //     );
    // }

    // allCarouselItems = () => {
    //     // let items = this.nestedArray();
    //     // console.log(items)
    //     // let carouselItems = items.slice(1, items.length - 1);
    //     // console.log(items)
    //     // return carouselItems.map(arr => {
    //     //     return (
    //     //         <div className="carousel-item">
    //     //             {this.renderCarouselItems(arr)}
    //     //         </div>
    //     //     )
    //     // })
    // }

    // renderCarouselItems(arr) {
    //     if(arr) {
    //         return arr.map(category => {
    //             return (
    //                 <div className="col-sm-2" key={category.id}>
    //                     <span>{category.name}</span>
    //                 </div>
    //             )
    //         });
    //     }
    // }

    // activeCarouselItems() {
    //     let firstSixArr = this.props.menus.slice(0, 6);
    //     return firstSixArr.map(category => {
    //         return (
    //             <div className="col-sm-2" key={category.id}>
    //                 <span>{category.name}</span>
    //             </div>
    //         )
    //     });
    // }

    // renderRestofCarouselItems = () => {
    //     let carouselItems = this.restofCarouselItems();
    //     if(carouselItems) {
    //         return carouselItems.map(arr => {
    //             return (
    //                 <div className="carousel-item">
    //                     {arr.map(category => {
    //                         return (
    //                             <div className="col-sm-2">
    //                                 <span>{category.name}</span>
    //                             </div>
    //                         )
    //                     })}
    //                 </div>
    //             )
    //         });
    //     }
    // }
    
    render() {
        return (
            <div>
                <Banner/>

                {/* START CAROUSEL */}

                {/* <div id="demo" className="carousel slide" data-ride="carousel"> */}

                    {/* <!-- The slideshow --> */}
                    {/* <div className="container carousel-inner no-padding"> */}
                        {/* {this.carouselItems()}÷ */}
                    {/* </div> */}

                    {/* <!-- Left and right controls --> */}
                    {/* <a className="carousel-control-prev" href="#demo" data-slide="prev"> */}
                        {/* <span className="carousel-control-prev-icon"></span> */}
                    {/* </a> */}
                    {/* <a className="carousel-control-next" href="#demo" data-slide="next"> */}
                        {/* <span className="carousel-control-next-icon"></span> */}
                    {/* </a> */}
                {/* </div> */}
                  
                {/* END CAROUSEL */}

                {this.renderMenu()}
                <CartBox items={this.props.cartItems} />
                
                {/* <MenuSideBar categories={this.props.categories} /> */}
                {/* <Route path="/order/menu/:id" render={this.renderMenu}/> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    
    return {
        menus: state.menu,
        cartItems: state.cart
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem:(item) => dispatch(addItemToCart(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);