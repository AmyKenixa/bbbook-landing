import React, { Component } from 'react';
import {Header, Banner, Chapter, About, Features, Feature2,
    Cta, Review, Author, Contact, Footer} from '../layouts/home02/index';
import EmailCapture from '../EmailCapture';
import SEO from '../SEO';

class Home02 extends Component {
    render() {
        return (
            <div className="counter-scroll bg-home1 has-one-page">
                {/* Page-specific SEO */}
                <SEO 
                    title="Bohemia Barcelona - The Ultimate Guide to Relocating & Living Well in Barcelona"
                    description="Transform your Barcelona dream into reality with the most complete relocation guide ever written. Expert advice on visas, neighborhoods, work, education, and building your new life in Barcelona."
                    keywords="Barcelona relocation guide, move to Barcelona, Barcelona expat guide, living in Barcelona, Barcelona neighborhoods, Digital Nomad Visa Spain, Barcelona visa guide, expat life Barcelona"
                    url="https://guide.bohemiabarcelona.com"
                />
                
                <Header />       
                <Banner />
                <Feature2 />
                <About />
                <Chapter />
                <Features />
                
                {/* Email Capture Banner - Free Toolkit */}
                <EmailCapture 
                    type="banner"
                    title="Get Your FREE Barcelona Relocation Toolkit"
                    subtitle="Download the complete Barcelona neighborhood guide, visa checklist, and cost calculator - plus join our exclusive expat community for ongoing support."
                    buttonText="Get Free Toolkit"
                    source="main-banner"
                />
                
                <Review />
                <Author />
                <Cta />
                <Contact />
                <Footer />
            </div>
        );
    }
}

export default Home02;