import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeAllCartItems, removeUser } from '../actions';

class SideNavBar extends Component {

    state = {
        redirect: null
    }

    clearLocalStorage = () => {
        //clear localStorage
        localStorage.clear();
        this.setState({redirect: true});
        //clear user state
        this.props.removeUser();
        //clear state's cart
        this.props.removeAllCartItems();
    }

    renderLoginAndRegisterLinks() {
        return (
            <div>
                <Link className="login-link" to="/login">Login</Link>
                    <br/>
                <Link className="register-link" to="/register">Sign Up</Link>
            </div>
        )
    }

    renderLogoutBtn() {
        return (
            <button 
                onClick={this.clearLocalStorage} 
                className="btn btn-primary"
            >
                Log Out
            </button>
        );
    }

    redirectToHome() {
        //when state redirect is true return to main page
        if(this.state.redirect) {
            return <Redirect to="/" />
        }
    }
    
    render() {
        return (
            <div className="main-sidebar">

                <div>
                    
                </div>

                {this.redirectToHome()}
                
                <Link className="links" to="/order" >Order Online</Link>
                
                <br/>

                {localStorage.token ? this.renderLogoutBtn() : this.renderLoginAndRegisterLinks()}

                <div className="side-bar-footer">
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
                </div>

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