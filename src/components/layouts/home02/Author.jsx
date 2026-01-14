import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Author extends Component {
    constructor(props){
        super(props);
        this.state = {
            listItem: [
                {
                    id: 1,
                    icon: 'fa fa-check',
                    title: '9+ years Barcelona resident with family integration success',
                },
                {
                    id: 2,
                    icon: 'fa fa-check',
                    title: 'Founder of Bohemia Barcelona Directory community',
                },
                {
                    id: 3,
                    icon: 'fa fa-check',
                    title: 'Helped expats successfully relocate to Barcelona',
                },
            ]
        }
    }
    render() {
        return (
            <section className="section-author section-padding bg-grey" id="author">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="section-heading center-heading text-center mb-60">
                                <h3 className="heading-title">About Amy Cancryn</h3>
                                <p>Written by someone who's walked this exact path—from overwhelmed newcomer to thriving Barcelona resident.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row align-items-center justify-content-center">
                        <div className="col-lg-5 col-md-6">
                            <div className="auhtor-img mb-4 mb-lg-0">
                                 <img src="assets/images/amy-cancryn.jpg" alt="Amy Cancryn, author of Bohemia Barcelona" className="img-fluid" />
                            </div>
                        </div>
                        <div className="col-lg-5 col-md-6 ps-4">
                            <div className="section-heading mb-0">
                                <h3 className="heading-title">Amy Cancryn</h3>
                                <p className="lead">Author</p>
                                <p>Amy immigrated from the United States with her husband and two young children armed with only school-level Spanish and zero knowledge of Catalan. Through trial, error, and determination, she successfully navigated every challenge covered in this guide.</p>
                                <p>Today, her children are fully integrated into local society—attending public schools, participating in festivals and colonias, and enriching their lives through travel. Her daughter is now studying at university in Barcelona while her son excels in ESO, proving that successful family integration is absolutely possible.</p>
                            </div>

                            <div className="author-desc">
                                <ul className="list-unstyled">
                                    {
                                    this.state.listItem.map((data,i) => (
                                        <li key={i}><i className={data.icon}></i> {data.title}</li>
                                        ))
                                    }
                                </ul>
                                <p>Connect with Amy: <Link to="https://bohemiabarcelona.com" target="_blank">Bohemia Barcelona</Link> | <Link to="https://linkedin.com/in/amy-cancryn" target="_blank">LinkedIn</Link> | <Link to="https://instagram.com/bohemiabarcelona" target="_blank">Instagram</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </section> 
        );
    }
}

export default Author;