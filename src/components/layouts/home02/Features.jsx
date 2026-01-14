import React, { Component } from 'react';
import { FeatureLeft, FeatureRight } from './Features/index';

class Features extends Component {
    render() {
        return (
        <section className="book-preview section-padding"  id="topics">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="section-heading center-heading text-center mb-60">
                            <h3 className="heading-title text-white">Everything You Need to Thrive in Barcelona</h3>
                            <p className="text-white">This ultimate guide covers every aspect of relocating successfully. No stone left unturned, no detail overlooked.</p>
                        </div>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-lg-6">
                        <FeatureLeft />
                    </div>

                    <div className="col-lg-6">
                        <FeatureRight />
                    </div>
                </div>
            </div>
        </section> 
        );
    }
}

export default Features;