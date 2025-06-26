import React, { Component } from 'react';
import Slider from "react-slick";

class Review extends Component {
    constructor(props){
        super(props);
        this.state = {
            testimonial: [
                {
                    id: 1,
                    quoteText: 'Saved Me Months of Confusion!',
                    text: 'This guide saved me months of confusion and expensive mistakes. The visa section alone was worth the price - I got my Digital Nomad visa approved on the first try! Amy\'s insider knowledge is pure gold.',
                    name: 'Sarah Mitchell',
                    desigantion: 'Digital Marketing Professional, Germany'
                },
                {
                    id: 2,
                    quoteText: 'Found Our Perfect Neighborhood!',
                    text: 'We found our perfect neighborhood in Sant Cugat and enrolled our kids in great schools thanks to Amy\'s detailed guides. The family-specific advice was invaluable for our relocation.',
                    name: 'Maria & Carlos López',
                    desigantion: 'Expat Family from Canada'
                },
                {
                    id: 3,
                    quoteText: 'Business Setup Made Easy!',
                    text: 'The business setup section helped me register as autónomo quickly and correctly. I\'m now running my startup from Barcelona with confidence. This guide is essential for entrepreneurs.',
                    name: 'James Robinson',
                    desigantion: 'Tech Entrepreneur, UK'
                },
                {
                    id: 4,
                    quoteText: 'Integrated Faster Than Expected!',
                    text: 'As a student, the education and daily life sections were perfect. I integrated much faster than my classmates who didn\'t have this resource. Worth every penny for the insider knowledge.',
                    name: 'Elena Chen',
                    desigantion: 'University Student, Australia'
                },
                {
                    id: 5,
                    quoteText: 'The Ultimate Relocation Bible!',
                    text: 'I wish I had this guide when I first moved here 3 years ago! Amy covers everything you need to know. This is the ultimate relocation bible for anyone serious about Barcelona.',
                    name: 'Marcus Schmidt',
                    desigantion: 'Software Developer, Netherlands'
                }
            ]
        }
    }

    render() {
        const settings = {
            arrows: false,
            dots: true,
            infinite: true,
            centerMode: true,
            autoplay: true,
            autoplaySpeed: 4000,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 1,
            responsive: [
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                  }
                }
            ]
          };
        return (
        <section className="testimonial section-padding bg-grey pb-0" id="testimonial">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-xl-8 col-lg-10">
                        <div className="section-heading center-heading text-center mb-60">
                            <h3 className="heading-title">Join Thousands Who've Successfully Relocated</h3>
                            <p>Real stories from digital nomads, families, professionals, and entrepreneurs who transformed their Barcelona dreams into reality with this ultimate guide.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-12">
                        <div className="testimonials-slides">
                            <Slider useRef="reviews" {...settings}>
                            {
                                this.state.testimonial.map((data) => (
                                    <div className="review-item" key={data.id}>
                                        <div className="client-info">
                                            <div className="rating">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <h4>{data.quoteText}</h4>
                                            <p>{data.text}</p>
                                        </div>

                                        <div className="client-desc">
                                            <div className="client-text text-center">
                                                <h5>{data.name}</h5>
                                                <span className="designation">{data.desigantion}</span>
                                            </div>
                                        </div>
                                    </div> 
                                ))
                            }
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        );
    }
}

export default Review;