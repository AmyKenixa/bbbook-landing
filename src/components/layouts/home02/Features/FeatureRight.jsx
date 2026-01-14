import React, { Component } from 'react';

class FeatureRight extends Component {
    constructor(props){
        super(props);
        this.state = {
            collRight: [
                {
                    id: 1,
                    icon: 'fa fa-comments',
                    title: 'Language & Culture',
                    text: 'Learn when to speak Catalan vs Spanish, navigate local customs, and integrate authentically into Barcelona\'s vibrant multicultural community.'
                },
                {
                    id: 2,
                    icon: 'fa fa-users',
                    title: 'Build Your Professional Network',
                    text: 'Connect with the startup ecosystem, find co-working spaces, join expat communities, and accelerate your career in Europe\'s innovation hub.'
                },
                {
                    id: 3,
                    icon: 'fa fa-heart',
                    title: 'Find Your Tribe & Thrive',
                    text: 'Discover social networks, join local festivals, embrace the Mediterranean lifestyle, and create lasting friendships in your new home.'
                }
            ]
        }
    }

    render() {
        return (
            <div className="topic-items">
                {
                    this.state.collRight.map((data,i) => (
                        <div className="topic-item" key={i}>
                            <div className="icon-box">
                                <i className={data.icon}></i>
                            </div>
                            <div className="topic-content">
                                <h4>{data.title}</h4>
                                <p>{data.text}</p>
                            </div>
                        </div>
                    
                    ))
            }
            </div>
        );
    }

}

export default FeatureRight;