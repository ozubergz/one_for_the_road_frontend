import React, { Component } from 'react';
import Banner from './Banner';
import ribs from '../images/ribs.jpg';
import chicken from '../images/roasted-chicken.jpg';


class Home extends Component {
    render() {
        return (
            <div>
                <Banner />
                <div className="home-body">
                    <div className="bg-1">
                        <div style={{backgroundColor: '#fdd365'}} className="text-col">
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
                        <div className="img-col">
                            <div 
                                style={{backgroundImage: `url(${ribs})`}}
                                className="img-col-content"
                            ></div>
                        </div>
                    </div>
                    <div className="bg-1" style={{backgroundColor: "#ffae8f"}} >
                        <div className="img-col">
                            <div 
                                style={{backgroundImage: `url(${chicken})`}}
                                className="img-col-content">
                            </div>
                        </div>
                        <div className="text-col">
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
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;