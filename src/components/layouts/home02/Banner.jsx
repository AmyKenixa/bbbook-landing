import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './Banner.css';

class Banner extends Component {
    constructor(props){
        super(props);
        this.state = {
            listItem: [
                {
                    id: 1,
                    icon: 'fa fa-check',
                    title: 'Step-by-step visa navigation including the Digital Nomad Visa',
                },
                {
                    id: 2,
                    icon: 'fa fa-check',
                    title: 'Neighborhood deep-dives from Gràcia to Poblenou',
                },
                {
                    id: 3,
                    icon: 'fa fa-check',
                    title: 'Interactive workbooks with practical timelines',
                },
                {
                    id: 4,
                    icon: 'fa fa-check',
                    title: 'Exclusive community access + regular updates',
                },
            ]
        }
    }
    render() {
        return (
            <section className="banner pb-80">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                        <div className="col-lg-6">
                            <div className="banner-img pe-3">
                                <img src="assets/images/banner/3d.png" alt="Bohemia Barcelona Book Cover" className="img-fluid"/>
                            </div>
                        </div>
                        <div className="col-md-12 col-lg-6">
                            <div className="banner-content mt-4 mt-lg-0">
                                <span className="subheading">Transform Your Barcelona Dream into Reality</span>
                                <h1>Bohemia Barcelona: The Ultimate Guide to Relocating & Living Well in Barcelona</h1>
                                <p className="lead mb-4">The most complete relocation guide ever written. Bridge the gap between tourist dreams and expat reality with insider knowledge from someone who made the leap over nine years ago.</p>
                                <ul>
                                    {
                                    this.state.listItem.map(data => (
                                        <li key={data.id}><i className={data.icon}></i> {data.title}</li>
                                        ))
                                    }
                                </ul>
                                <div className="pricing-info mb-4">
                                    <div className="price-options">
                                        <span className="price-label">Print Edition:</span>
                                        <span className="price-original">$55</span>
                                        <span className="price-sale">$39,99</span>
                                        <span className="price-divider">|</span>
                                        <span className="price-label">eBook:</span>
                                        <span className="price-ebook">$12,99</span>
                                    </div>
                                </div>
                                <div className="banner-buttons">
                                    <Link to="#" className="btn btn-main me-3">Get Print Edition - $39.99</Link>
                                    <Link to="#" className="btn btn-outline">Get eBook - $12,99</Link>
                                </div>
                                <p className="mt-3 mb-1">Written by <strong>Amy Cancryn</strong></p>
                                <p className="mb-1">9+ years in Barcelona</p>
                                <p className="mb-3"><HashLink to="#chapters">Preview chapters free</HashLink></p>
                                <p className="testimonial-quote mt-3 fst-italic">"Barcelona is a city that encourages reinvention. Here, you can rediscover your passions, explore new horizons, and find your tribe." —Amy Cancryn</p>
                            </div>
                        </div>
                       
                    </div> 
                </div> 
            </section>

        );
    }
}

export default Banner;