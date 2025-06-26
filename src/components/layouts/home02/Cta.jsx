import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Cta extends Component {
    render() {
        return (
        <section className="section-cta">
            <div className="container">
                <div className="row justify-content-center cta-inner">
                    <div className="col-lg-8">
                        <div className="cta-content text-center">
                            <span className="subheading2">Ready to Start Your Barcelona Journey?</span>
                            <h2 className="heading-title">Get Your Complete Relocation Guide Today</h2>
                            <p className="lead mb-4">Join hundreds of successful expats who used this guide to make Barcelona home. Don't navigate the move alone—get insider knowledge that saves time, money, and stress.</p>
                            
                            <div className="pricing-info mb-4">
                                <div className="price-options justify-content-center">
                                    <span className="price-label">Print Edition:</span>
                                    <span className="price-original">$99</span>
                                    <span className="price-sale">$79</span>
                                    <span className="price-divider">|</span>
                                    <span className="price-label">eBook:</span>
                                    <span className="price-ebook">$49</span>
                                </div>
                            </div>
                            
                            <div className="footer-buttons d-flex gap-3 justify-content-center flex-wrap mb-4">
                                <Link to="#" className="btn btn-main">
                                    <i className="fa fa-book me-2"></i>Get Print Edition - $79
                                </Link>
                                <Link to="#" className="btn btn-outline">
                                    <i className="fa fa-download me-2"></i>Get eBook - $49
                                </Link>
                            </div>
                            
                            <div className="benefits-list">
                                <ul className="list-unstyled d-flex flex-wrap justify-content-center gap-4">
                                    <li><i className="fa fa-check"></i> Instant Download</li>
                                    <li><i className="fa fa-check"></i> Lifetime Updates</li>
                                    <li><i className="fa fa-check"></i> Community Access</li>
                                    <li><i className="fa fa-check"></i> 30-Day Guarantee</li>
                                </ul>
                            </div>
                            
                            <p className="mt-3 text-muted">
                                <small>* eBook includes PDF, ePub, and Kindle versions. Print edition ships worldwide.</small>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}

export default Cta;