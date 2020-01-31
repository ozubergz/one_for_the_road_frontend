import React, { Component } from 'react';
import MenuSideBar from '../components/MenuSideBar';

class Menu extends Component {
    
    render() {
        return (
            <div>
                <MenuSideBar />
                <div className="menu-container">
                    <h1>Menu</h1>
                </div>
            </div>
        );
    }
}

export default Menu;