import React, { Component } from 'react';

class ContainerMid extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            collMid: [
                {
                    id: 1,
                    subtitle: 'Part 3',
                    title: 'Working in Barcelona',
                    text: 'Navigate the job market, master freelancing as autónomo, explore startup opportunities, and understand the Digital Nomad Visa for remote workers.'
                },
                {
                    id: 2,
                    subtitle: 'Part 4',
                    title: 'Daily Life & Culture',
                    text: 'Master Catalan vs Spanish, navigate transportation, discover food culture, build your social network, and integrate into Barcelona\'s vibrant lifestyle.'
                }
            ]
        }
    }
    render() {
        return (
            <div className="chapter-list border-right-0">
                 {
                    this.state.collMid.map((data,i) => (
                        <div className="chapter-item" key={i}>
                            <h4><span>{data.subtitle} </span> {data.title}</h4>
                            <p>{data.text} </p>
                        </div>
                    ))
                }
            </div>
        );
    }
}

export default ContainerMid;