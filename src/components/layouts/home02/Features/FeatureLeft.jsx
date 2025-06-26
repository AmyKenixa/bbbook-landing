import React, { Component } from 'react';

class FeatureLeft extends Component {
    constructor(props){
        super(props);
        this.state = {
            collLeft: [
                {
                    id: 1,
                    icon: 'fa fa-passport',
                    title: 'Master Visa Applications',
                    text: 'Navigate Spain\'s complex visa system with confidence. Step-by-step Digital Nomad Visa guidance, work permits, and residency pathways with actual timelines.'
                },
                {
                    id: 2,
                    icon: 'fa fa-home',
                    title: 'Conquer the Housing Market',
                    text: 'Stand out to landlords in Barcelona\'s competitive market. Proven strategies for finding neighborhoods, negotiating rent, and avoiding common pitfalls.'
                },
                {
                    id: 3,
                    icon: 'fa fa-calculator',
                    title: 'Budget Like a Pro',
                    text: 'Master the 30% buffer rule and real-world cost breakdowns. Avoid financial stress with insider knowledge of Barcelona\'s true living expenses.'
                }
            ]
        }
    }

    render() {
        return (
            <div className="topic-items">
            {
                    this.state.collLeft.map((data,i) => (
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

export default FeatureLeft;