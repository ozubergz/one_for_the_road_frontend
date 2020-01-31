import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Route } from "react-router";

class MenuSideBar extends Component {

    renderCategoryList() {
       return this.props.categories.map(category => {
            return (
                <div key={category.id}>
                    <Link 
                        to={`/order/menu/${category.id}`}
                    >
                        {category.name}
                    </Link>
                </div>
            )
        });
    }

    findCategory = (renderProps) => {
        let id = Number(renderProps.match.params.id);
        let foundCategory = this.props.categories.find(category => {
            return category.id === id
        });

        this.renderMenu(foundCategory);
    }

    renderMenu(category) {
        console.log(category)
    }

    render() {
        
        return (
            <div className="menu-sidebar">
                <h1>Menu Sidebar</h1>
                {this.renderCategoryList()}
                <Route path="/order/menu/:id" render={ this.findCategory }/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        categories: state.menu.menus
    }
}

export default connect(mapStateToProps)(MenuSideBar);