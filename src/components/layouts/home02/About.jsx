import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

class About extends Component {
    constructor(props){
        super(props);
        this.state = {
            about: [
                {
                    id: 1,
                    icon: 'fa fa-passport',
                    title: 'Digital Nomads & Remote Workers',
                    text: 'Complete Digital Nomad Visa guidance, co-working spaces, and building your remote career while living the Mediterranean dream.'
                },
                {
                    id: 2,
                    icon: 'fa fa-home',
                    title: 'Families & Professionals',
                    text: 'International school guides, career transitions, healthcare navigation, and creating stability while embracing Barcelona\'s vibrant culture.'
                },
                {
                    id: 3,
                    icon: 'fa fa-heart',
                    title: 'Free Spirits & Adventurers',
                    text: 'Cultural integration secrets, finding your tribe, embracing local rhythms, and turning your Barcelona dream into sustainable reality.'
                }
            ]
        }
    }
    render() {
        return (
        <section className="about-section section-padding bg-grey" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6">
                        <div className="about-img">
                            <img src="assets/images/banner/bohemia-barcelona-lifestyle.jpg" alt="Barcelona lifestyle - expats enjoying life in the city" className="img-fluid"/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <div className="section-heading">
                            <span className="subheading">What Makes This the Ultimate Relocation Guide</span>
                            <h3 className="heading-title">Perfect for Every Type of Barcelona Relocator</h3>
                            <p>Unlike generic travel books, <strong>Bohemia Barcelona</strong> is crafted specifically for those ready to call Barcelona home. This isn't just about where to eat paella—it's about building a sustainable, fulfilling life in one of Europe's most dynamic cities.</p>
                        </div>

                        {
                            this.state.about.map((data,i) => (
                                <div className="about-text-block" key={i}>
                                    <i className={data.icon}></i>
                                    <h4>{data.title}</h4>
                                    <p>{data.text} </p>
                                </div>
                            ))
                        }
                        
                        <HashLink to="#topics" className="btn btn-main-2"><i className="fa fa-compass me-2"></i>Discover What's Inside</HashLink> 
                    </div>
                </div>
            </div>
        </section>  
        );
    }
}

export default About;