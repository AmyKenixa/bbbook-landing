import React, { Component } from 'react';

class Feature2 extends Component {
    constructor(props){
        super(props);

        this.state = {
           feature: [
                {
                    id: 1,
                    icon: 'fa fa-laptop',
                    title: 'Digital Nomads',
                    text: 'Learn about the Digital Nomad Visa, discover co-working spaces, and build your remote career while living the Mediterranean dream in Barcelona.'
                },
                {
                    id: 2,
                    icon: 'fa fa-briefcase',
                    title: 'Career Professionals',
                    text: 'Navigate the Spanish job market, understand work visas, build professional networks, and advance your career in Europe\'s most dynamic startup hub.'
                },
                {
                    id: 3,
                    icon: 'fa fa-home',
                    title: 'Families & Couples',
                    text: 'Find the perfect neighborhoods, choose schools for your children, access healthcare, and create a stable, thriving family life in Barcelona.'
                }
            ]
        }
    }

    render() {
        return (
            <section className="feature-2 pt-100 bg-grey">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="section-heading center-heading text-center mb-60">
                                <h3 className="heading-title">Transform Your Barcelona Dream into Reality</h3>
                                <p>This ultimate guide provides the roadmap for every type of Barcelona relocator. Join Expats who've successfully made the leap.</p>
                            </div>
                        </div>
                    </div>
                    <div className="row ">
                        {
                            this.state.feature.map((data) => (
                                <div className="col-lg-4 col-md-6" key={data.id}>
                                    <div className="feature-style-2 mb-4 mb-lg-0">
                                        <i className={data.icon}></i>
                                        <div className="feature-text">
                                            <h4>{data.title}</h4>
                                            <p>{data.text}</p>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                        
                    </div>
                </div>
            </section> 
        );
    }
}

export default Feature2;