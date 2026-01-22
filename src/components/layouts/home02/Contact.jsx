import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Contact extends Component {
    render() {
        return (
            <section className="section-padding contact bg-white" id="contact">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8">
                            <div className="section-heading center-heading text-center mb-60">
                                <h3 className="heading-title">Connect with Amy</h3>
                                <p>Have questions about relocating to Barcelona? Want to share your expat story? Amy loves connecting with fellow Barcelona enthusiasts and helping future expats navigate their journey.</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center mb-5">
                        <div className="col-lg-10">
                            <div className="row text-center">
                                <div className="col-md-4 mb-4">
                                    <div className="contact-info-item">
                                        <i className="fa fa-envelope fa-2x text-primary mb-3"></i>
                                        <h5>Email</h5>
                                        <p>amy@bohemiabarcelona.com</p>
                                        <Link to="mailto:amy@bohemiabarcelona.com" className="btn btn-outline btn-sm">Send Email</Link>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="contact-info-item">
                                        <i className="fa fa-users fa-2x text-primary mb-3"></i>
                                        <h5>Community</h5>
                                        <p>Join our Barcelona expat community</p>
                                        <Link to="https://bohemiabarcelona.com/" className="btn btn-outline btn-sm" target="_blank">Join Community</Link>
                                    </div>
                                </div>
                            
                            </div>
                        </div>
                    </div>
                    
                    
                                
                                <div className="mt-4 text-center">
                                    <p className="text-muted">
                                        <small>You can also find Amy on social media:</small>
                                    </p>
                                    <div className="social-links">
                                        <Link to="https://linkedin.com/in/amy-cancryn" className="social-link me-3" target="_blank">
                                            <i className="fa fa-linkedin"></i> LinkedIn
                                        </Link>
                                        <Link to="https://instagram.com/bohemiabarcelona" className="social-link me-3" target="_blank">
                                            <i className="fa fa-instagram"></i> Instagram
                                        </Link>
                                        <Link to="https://bohemiabarcelona.com" className="social-link" target="_blank">
                                            <i className="fa fa-globe"></i> Website
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        
                 
                
            </section>
        );
    }
}

export default Contact;