import React, { Component } from 'react';

class ContainerRight extends Component {
    constructor(props){
        super(props);
        this.state = {
            collRight: [
                {
                    id: 1,
                    subtitle: 'Chapter 7',
                    title: 'The rise of trend Design',
                    text: 'Well-written book is concerned with creating typography and is essential for professionals who regularly'
                },
                {
                    id: 2,
                    subtitle: 'Chapter 8',
                    title: 'Data Science Process',
                    text: 'Well-written book is concerned with creating typography and is essential for professionals who regularly'
                },
                {
                    id: 3,
                    subtitle: 'Chapter 9',
                    title: 'The rise of trend Design',
                    text: 'Well-written book is concerned with creating typography and is essential for professionals who regularly '
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
