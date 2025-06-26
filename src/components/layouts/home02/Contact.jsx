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
                                        <Link to="https://bohemiabarcelona.com/community" className="btn btn-outline btn-sm" target="_blank">Join Community</Link>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-4">
                                    <div className="contact-info-item">
                                        <i className="fa fa-calendar fa-2x text-primary mb-3"></i>
                                        <h5>Consultation</h5>
                                        <p>Book a 1-on-1 relocation consultation</p>
                                        <Link to="https://calendly.com/bohemiabarcelona" className="btn btn-outline btn-sm" target="_blank">Book Call</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="row justify-content-center">
                        <div className="col-lg-10 col-sm-12 col-md-12">
                            <div className="contact-form-wrapper">
                                <h4 className="text-center mb-4">Send Amy a Message</h4>
                                <form className="contact__form form-row contact-form" method="post" action="mail.php" id="contactForm">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="alert alert-success contact__msg" style={{display:'none'}} role="alert">
                                                Thanks for reaching out! Amy will get back to you within 24 hours.
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="row">
                                        <div className="col-lg-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="name" className="form-label">Your Name *</label>
                                                <input 
                                                    type="text" 
                                                    id="name" 
                                                    name="name" 
                                                    className="form-control" 
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="email" className="form-label">Email Address *</label>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    id="email" 
                                                    className="form-control" 
                                                    placeholder="Enter your email address"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="subject" className="form-label">Subject</label>
                                                <select id="subject" name="subject" className="form-control">
                                                    <option value="">Select a topic...</option>
                                                    <option value="visa-questions">Visa & Immigration Questions</option>
                                                    <option value="housing-help">Housing & Neighborhoods</option>
                                                    <option value="family-relocation">Family Relocation</option>
                                                    <option value="business-entrepreneurship">Business & Entrepreneurship</option>
                                                    <option value="general-barcelona">General Barcelona Questions</option>
                                                    <option value="book-feedback">Book Feedback</option>
                                                    <option value="other">Other</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-6">
                                            <div className="form-group mb-3">
                                                <label htmlFor="timeline" className="form-label">When are you planning to move?</label>
                                                <select id="timeline" name="timeline" className="form-control">
                                                    <option value="">Select timeline...</option>
                                                    <option value="next-3-months">Next 3 months</option>
                                                    <option value="3-6-months">3-6 months</option>
                                                    <option value="6-12-months">6-12 months</option>
                                                    <option value="1-2-years">1-2 years</option>
                                                    <option value="just-exploring">Just exploring</option>
                                                    <option value="already-here">Already in Barcelona</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12">
                                            <div className="form-group mb-3">
                                                <label htmlFor="message" className="form-label">Your Message *</label>
                                                <textarea 
                                                    id="message" 
                                                    name="message" 
                                                    cols="30" 
                                                    rows="6" 
                                                    className="form-control" 
                                                    placeholder="Tell Amy about your Barcelona plans, questions, or how she can help you..."
                                                    required
                                                ></textarea>    
                                            </div>
                                        </div>
                                        
                                        <div className="col-lg-12">
                                            <div className="d-lg-flex justify-content-between align-items-center mt-4">
                                                <div className="contact-info mb-3 mb-lg-0">
                                                    <p className="mb-1"><i className="fa fa-check text-success me-2"></i>Typically responds within 24 hours</p>
                                                    <p className="mb-0 text-muted"><small>* We respect your privacy and never share your information</small></p>
                                                </div>
                                                <input 
                                                    id="submit" 
                                                    name="submit" 
                                                    type="submit" 
                                                    className="btn btn-main" 
                                                    value="Send Message"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                
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
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Contact;