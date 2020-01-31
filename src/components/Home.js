import React, { Component } from 'react';
import SideNavBar from './SideNavBar';

class Home extends Component {
    render() {
        return (
            <div>
                <SideNavBar />
                <div className="home-container">
                    <h1>Home</h1>
                </div>
            </div>
        );
    }
}

export default Home;