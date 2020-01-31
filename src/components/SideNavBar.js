import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class SideNavBar extends Component {
    render() {
        return (
            <div className="main-sidebar">
                <h1>Main NavBar</h1>
                <Link className="links" to="/order" >Order Online</Link>
            </div>
        );
    }
}

export default SideNavBar;