import React, { Component } from 'react';
import logo from '../images/banner-logo.png';
// import Banner from './Banner';
// import ribs from '../images/ribs.jpg';
// import chicken from '../images/roasted-chicken.jpg';
import SideNavBar from './SideNavBar';

class Home extends Component {
    render() {
        return (
            <div>
                <SideNavBar />
                <div className="home-body">

                    <div className="section-1">
                        <img className="home-page-logo" src={logo} alt="One for the Road Logo" />

                        <div className="schedule">
                            {/* <h5 className="footer-heading"><i className="fa fa-clock-o"></i> Business Hours</h5> */}
                            <div className="days">
                                <div>Mon</div>
                                <div>Tues</div>
                                <div>Wed</div>
                                <div>Thu</div>
                                <div>Fri</div>
                                <div>Sat</div>
                                <div>Sun</div>
                            </div>
                            <div className="time">
                                <div>6:30am - 9:00pm</div>
                                <div>6:30am - 9:00pm</div>
                                <div>6:30am - 9:00pm</div>
                                <div>6:30am - 9:00pm</div>
                                <div>6:30am - 9:00pm</div>
                                <div>6:30am - 9:00pm</div>
                                <div>6:30am - 9:00pm</div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        );
    }
}

export default Home;