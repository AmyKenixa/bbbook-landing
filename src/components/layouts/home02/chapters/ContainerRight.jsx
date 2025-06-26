import React, { Component } from 'react';

class ContainerRight extends Component {
    constructor(props){
        super(props);
        this.state = {
            collRight: [
                {
                    id: 1,
                    subtitle: 'Part 5',
                    title: 'Practical Tips & Resources',
                    text: 'Essential safety information, emergency contacts, must-have apps, useful websites, and ongoing support resources for thriving in Barcelona.'
                },
                {
                    id: 2,
                    subtitle: 'Bonus',
                    title: 'Interactive Workbooks',
                    text: '15 practical worksheets for visa planning, budgeting, neighborhood selection, and action plans to keep you organized and on track.'
                },
                {
                    id: 3,
                    subtitle: 'Bonus',
                    title: 'Community Access',
                    text: 'Exclusive access to our Barcelona expat community, regular updates, and ongoing support from Amy and fellow relocators.'
                }
            ]
        }
    }
    render() {
        return (
            <div className="chapter-list border-right-0">
                 {
                    this.state.collRight.map((data,i) => (
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

export default ContainerRight;