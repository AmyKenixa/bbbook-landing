import React, { Component } from 'react';

class ContainerLeft extends Component {
    constructor(props){
        super(props);
        this.state = {
            collLeft: [
                {
                    id: 1,
                    subtitle: 'Part 1',
                    title: 'Preparing for the Move',
                    text: 'Master visa applications, understand costs, find housing, and explore neighborhoods. Includes Digital Nomad Visa guide and the 30% budget buffer rule.'
                },
                {
                    id: 2,
                    subtitle: 'Part 2', 
                    title: 'Settling In',
                    text: 'Navigate essential admin procedures, healthcare systems, education options, and banking setup. Get your NIE, empadronamiento, and life essentials sorted.'
                }
            ]
        }
    }
    render() {
        return (
            <div className="chapter-list border-right-0">
                 {
                    this.state.collLeft.map((data,i) => (
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

export default ContainerLeft;