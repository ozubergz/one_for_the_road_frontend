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
                    </div>
                </div>

                {/* <Banner /> */}
                {/* <div className="home-body">
                    <div className="bg-1 row">
                        <div style={{backgroundColor: '#fdd365'}} className="text-col col-12 col-lg-6">
                            <div className="text-col-content">
                                <h1>About</h1>
                                One for the Road works to please our customers with various
                                delicious home baked pastries, Sweet and Savory crepes, Peruvian Chicken, 
                                Sandwiches (Continental, Bahnmi, Korean) Frozen Yogurt/ Gelato, and 
                                locally Roasted Hot & Cold Brewed coffee, Summer Drinks, Dessert 
                                (freshly baked cheese cakes, Tiramisu) plus many more! Stop by 
                                and take one for the road or seat and relax outside street cafe 
                                and dining room.
                            </div>
                        </div>
                        <div className="img-col col-12 col-lg-6">
                            <div 
                                style={{backgroundImage: `url(${ribs})`}}
                                className="img-col-content"
                            ></div>
                        </div>
                    </div>
                    <div className="bg-1 row" style={{backgroundColor: "#ffae8f"}} >
                        <div className="img-col col-12 col-lg-6">
                            <div 
                                style={{backgroundImage: `url(${chicken})`}}
                                className="img-col-content">
                            </div>
                        </div>
                        <div className="text-col col-12 col-lg-6">
                            <div className="text-col-content">
                                <h1>Specialties</h1>
                                Our specialty is asian fusion food. We offer varieties of omellettes, 
                                homebaked desserts, Banh Mi, korean style food, cold/hot sandwiches, smoothies and juice 
                                that are all made fresh. We also offer peruvain style food with juicy
                                and well seasoned roasted chicken, beans, rice and burritos.
                            </div>
                        </div>
                    </div>
                    
                    <div className='footer'>
                        <div className="footer-col mx-5">
                            <div className="business-hours">
                                <h5 className="footer-heading"><i className="fa fa-clock-o"></i> Business Hours</h5>
                                <div className="schedule">
                                    <div className="days">Mon</div>
                                    <div>6:30am - 9:00pm</div>
                                </div>
                                <div className="schedule">
                                    <div className="days">Tues</div>
                                    <div>6:30am - 9:00pm</div>
                                </div>
                                <div className="schedule">
                                    <div className="days">Wed</div>
                                    <div>6:30am - 9:00pm</div>
                                </div>
                                <div className="schedule">
                                    <div className="days">Thu</div>
                                    <div>6:30am - 9:00pm</div>
                                </div>
                                <div className="schedule">
                                    <div className="days">Fri</div>
                                    <div>6:30am - 9:00pm</div>
                                </div>
                                <div className="schedule">
                                    <div className="days">Sat</div>
                                    <div>6:30am - 9:00pm</div>
                                </div>
                                <div className="schedule">
                                    <div className="days">Sun</div>
                                    <div>6:30am - 9:00pm</div>
                                </div>
                            </div>
                        </div>
                        <div className="footer-col mr-5">
                            <h5 className="footer-heading">Address <i className="fa fa-home"></i></h5>
                            <div className="address">
                                <div className="address_1">
                                    40-25 150th Street
                                </div>
                                <div>
                                    Flushing, NY 11354
                                </div>
                            </div>
                        </div>
                        <div className="footer-col">
                            <h5 className="footer-heading">Contact <i className="fa fa-phone"></i></h5>
                            <h6>347-732-9732</h6>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

export default Home;