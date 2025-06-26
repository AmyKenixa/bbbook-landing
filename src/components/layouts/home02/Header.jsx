import React, { Component } from 'react';
import { HashLink } from 'react-router-hash-link';

class Header extends Component {
    render() {
        return (
            <header>
                <div className="site-navigation main_menu" id="mainmenu-area">
                    <nav className="navbar navbar-expand-lg">
                        <div className="container">
                            <HashLink to="#top" className="navbar-brand">
                                <img src="assets/images/logo-small.png" alt="Bohemia Barcelona" className="img-fluid"/>
                            </HashLink>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarMenu" aria-controls="navbarMenu" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="fa fa-bars"></span>
                            </button>
                           
                            <div className="collapse navbar-collapse" id="navbarMenu">
                                <ul className="navbar-nav me-auto">
                                    <li className="nav-item">
                                        <HashLink to="#about" className="nav-link">About</HashLink>
                                    </li>
                                    <li className="nav-item">
                                        <HashLink to="#chapters" className="nav-link">Contents</HashLink>
                                    </li>
                                    <li className="nav-item">
                                        <HashLink to="#topics" className="nav-link">What You'll Learn</HashLink>
                                    </li>
                                    <li className="nav-item">
                                        <HashLink to="#testimonial" className="nav-link">Reviews</HashLink>
                                    </li>
                                    <li className="nav-item">
                                        <HashLink to="#author" className="nav-link">About Amy</HashLink>
                                    </li>
                                    <li className="nav-item">
                                        <HashLink to="#contact" className="nav-link">Contact</HashLink>
                                    </li>
                                </ul>
                            </div> 

                            <div className="header-right-info d-none d-lg-block">
                                <HashLink to="#contact" className="btn btn-main-tp btn-small">
                                    <i className="fa fa-shopping-cart me-2"></i>Get Your Copy
                                </HashLink>
                            </div>
                        </div> 
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;