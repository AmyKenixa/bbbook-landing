import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

class Footer extends Component {
    render() {
        return (          
            <section className="footer pt-120">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-8 text-center">
                            <div className="footer-content">
                          
                                <div className="social-links mb-4">
                                    <Link to="https://bohemiabarcelona.com" target="_blank" rel="noopener noreferrer" className="social-link me-4">
                                        <i className="fa fa-globe me-2"></i>Bohemia Barcelona
                                    </Link>
                                    <Link to="https://instagram.com/bohemiabarcelona" target="_blank" rel="noopener noreferrer" className="social-link me-4">
                                        <i className="fa fa-instagram me-2"></i>Instagram
                                    </Link>
                                    <Link to="mailto:info@bohemiabarcelona.com" className="social-link">
                                        <i className="fa fa-envelope me-2"></i>Contact Amy
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="footer-btm">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <div className="copyright">
                                    <p>© 2025 Bohemia Barcelona. All rights reserved. Written by Amy Cancryn</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                            
                <div className="fixed-btm-top">
                    <a href="#top-header" className="js-scroll-trigger scroll-to-top"><i className="fa fa-angle-up"></i></a>
                </div>
            </section>
        );
    }
}

export default Footer;