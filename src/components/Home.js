import React, { Component } from 'react';
import logo from '../images/banner-logo.png';
import SideNavBar from './SideNavBar';

class Home extends Component {
    
    sections = [];

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll)
    }

    handleScroll = () => {
        let scroll = window.scrollY;
        let velocity = 30;

        //filter any refs that are null or duplicates
        let sections = this.sections.filter((sect, i, s) => {
            return sect && s.indexOf(sect) === i
        });

        sections.forEach(section => {
            let height = section.clientHeight;
            let position = `${50 + (scroll / height) * velocity}%`;        
            section.style.backgroundPosition = `50% ${position}`;
        });
    }

    render() {
        return (
            <div>
                <SideNavBar />
                <div className="home-body">

                    <div className="section-1" ref={ sect => this.sections.push(sect) }>
                        <div className="section-1-body">
                            <img className="section-1-logo" src={logo} alt="One for the Road Logo" />
                            
                            <div className="section-1-content">
                                <div className="schedule">
                                    <h5 className="schedule-title">
                                        <i className="fa fa-clock-o"></i> 
                                        Business Hours
                                    </h5>
                                    <div className="schedule-time-day">
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
                                <div className="address-contact">
                                    <div className="address-container">
                                        <h5 className="address-title">
                                            <i className="fa fa-home"></i>
                                            Address
                                        </h5>
                                        <div className="address">
                                            <div>
                                                40-25 150th Street
                                            </div>
                                            <div>
                                                Flushing, NY 11354
                                            </div>
                                        </div>
                                    </div>
                                    <div className="contact-container">
                                        <h5 className="contact-title"> 
                                            <i className="fa fa-phone"></i>
                                            Contact
                                        </h5>
                                        <h6>347-732-9732</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="section-2" ref={ sect => this.sections.push(sect) }>
                        <div className="about">
                            <h1>About Us</h1>
                            <p>One for the Road works to please our customers with various
                            delicious home baked pastries, Sweet and Savory crepes, Peruvian Chicken, 
                            Sandwiches (Continental, Bahnmi, Korean) Frozen Yogurt/ Gelato, and 
                            locally Roasted Hot & Cold Brewed coffee, Summer Drinks, Dessert 
                            (freshly baked cheese cakes, Tiramisu) plus many more! Stop by 
                            and take one for the road or seat and relax outside street cafe 
                            and dining room.</p>              
                        </div>
                        <div className="specialties">
                            <h1>Specialties</h1>
                            <p>Our specialty is asian fusion food. We offer varieties of omellettes, 
                            homebaked desserts, Banh Mi, korean style food, cold/hot sandwiches, smoothies and juice 
                            that are all made fresh. We also offer peruvain style food with juicy
                            and well seasoned roasted chicken, beans, rice and burritos.</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;