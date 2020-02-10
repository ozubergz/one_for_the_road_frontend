import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeAllCartItems, removeUser } from '../actions';

class SideNavBar extends Component {


    clearLocalStorage = () => {
        //clear localStorage
        localStorage.clear();
        //clear user state
        this.props.removeUser();
        //clear state's cart
        this.props.removeAllCartItems();
    }

    renderLoginAndRegisterLinks() {
        return (
            <div className="mt-4">
                <button className="btn btn-primary link-btn">
                    Login
                    <Link className="sidebar-link" to="/login"></Link>
                </button>
                    <div className="text-center my-1 or">or</div>
                <button className="btn btn-success link-btn">
                    Sign Up
                    <Link className="sidebar-link" to="/register"></Link>
                </button>
            </div>
        )
    }

    renderLogoutBtn() {
        return (
            <button onClick={this.clearLocalStorage} className="btn btn-danger link-btn mt-4">
                Log Out
            </button>
        );
    }
    
    render() {
        return (
            <div className="main-sidebar">

                <div className="side-bar-logo">
                    <Link className="sidebar-link" to="/"></Link>
                </div>

                <div className="side-bar-btn-group">
                    <button className="btn btn-light link-btn">
                        Order Online
                        <Link className="sidebar-link" to="/order" ></Link>
                    </button>
                    
                    {localStorage.token ? this.renderLogoutBtn() : this.renderLoginAndRegisterLinks()}
                </div>

                {/* <div className="side-bar-footer">
                    <div className="contact mt-3">
                        <h6 className="info-heading">Contact <i className="fa fa-phone"></i></h6>
                        <div>
                            347-732-9732
                        </div>
                    </div>
                    <div className="location mt-3">
                        <h6 className="info-heading">Address <i className="fa fa-home"></i></h6>
                        <div className="address">
                            <div className="address_1">
                                40-25 150th Street
                            </div>
                            <div>
                                Flushing, NY 11354
                            </div>
                        </div>
                    </div>
                    <div className="business-hours mt-3">
                        <h6 className="info-heading"><i className="fa fa-clock-o"></i> Business Hours</h6>
                        <div className="time-row">
                            <div className="days">Mon</div>
                            <div>6:30am - 9:00pm</div>
                        </div>
                        <div className="time-row">
                            <div className="days">Tues</div>
                            <div>6:30am - 9:00pm</div>
                        </div>
                        <div className="time-row">
                            <div className="days">Wed</div>
                            <div>6:30am - 9:00pm</div>
                        </div>
                        <div className="time-row">
                            <div className="days">Thu</div>
                            <div>6:30am - 9:00pm</div>
                        </div>
                        <div className="time-row">
                            <div className="days">Fri</div>
                            <div>6:30am - 9:00pm</div>
                        </div>
                        <div className="time-row">
                            <div className="days">Sat</div>
                            <div>6:30am - 9:00pm</div>
                        </div>
                        <div className="time-row">
                            <div className="days">Sun</div>
                            <div>6:30am - 9:00pm</div>
                        </div>
                    </div>
                </div> */}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {removeAllCartItems, removeUser})(SideNavBar);