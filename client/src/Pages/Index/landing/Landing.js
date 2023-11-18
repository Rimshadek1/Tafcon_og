import React, { useRef } from 'react';
import './Landing.css';
import { Link } from 'react-router-dom'

function Landing() {
    const imageUrls = [
        "/index/1.jpeg",
        "/index/2.jpeg",
        "/index/4.jpg",
        "/index/5.jpg",
        "/index/6.jpeg",
        "/index/7.jpg",
        "/index/8.jpg",



    ];
    // Create a ref for the gallery container
    const galleryRef = useRef(null);

    // Function to scroll the gallery container left
    const scrollLeft = () => {
        if (galleryRef.current) {
            galleryRef.current.scrollLeft -= 30; // Adjust the scroll distance as needed
        }
    };

    // Function to scroll the gallery container right
    const scrollRight = () => {
        if (galleryRef.current) {
            galleryRef.current.scrollLeft += 30; // Adjust the scroll distance as needed
        }
    };
    return (
        <div className='tafcon'>
            <div className="back">
                <div className="headerss container">
                    <div className="logo">
                        <img src="/logo/tafcon.png" alt="logo" className="img-fluid" />
                    </div>
                    <ul className="header-list d-flex justify-content-end align-items-center m-0">
                        <li className="mx-3"><a href="#home">Home</a></li>
                        <li className="mx-3"><Link to="/career">Career</Link></li>
                        <li className="mx-3"><a href="#about">About</a></li>
                    </ul>
                    <div class="buttons-container">
                        <button className='btn button-arounder' to='signup'>Register</button>
                    </div>
                </div>

                <div className="content-container rounded">
                    <div className="text-container">
                        <h1>TAFCON EVENTS ...</h1>
                        <p className="text-light">
                            With a passion for creating unforgettable moments, TAFCON EVENTS specializes in crafting extraordinary marriage events.
                            With over 6 years of experience, our dedicated team is committed to turning your dreams into reality.
                            We pride ourselves on meticulous planning, attention to detail, and seamless execution to ensure every event is a success.
                            From intimate ceremonies to grand celebrations, we tailor our services to meet your unique needs and preferences.
                            Trust TAFCON EVENTS to make your special day truly exceptional.
                        </p>
                        <h2 className="mt-4">Our services</h2>
                        <ul className="text-light">
                            <li>Stage decor</li>
                            <li>Catering</li>
                            <li>Boys for assistance</li>
                            <li>Pandari setup</li>
                            <li>Food services</li>
                            <li>Pandhal works</li>
                            <li>Sittings decor</li>
                            {/* Add more services as needed */}
                        </ul>
                    </div>

                    <div className="image-container d-none d-md-block">

                        <img src="/index/event.jpg" alt="Event_Image" className="img-fluid rounded" />
                    </div>
                </div>
            </div>

            {/* Centered and responsive gallery */}
            <div ref={galleryRef} className="container gallery rounded">
                <h1 className="text-light services-header">OUR GALLERY</h1>
                <div className="scroll-buttons">

                    <svg className="scroll-button left" onClick={scrollLeft} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100" id="left" fill='#FFFFFF' stroke='#FFFFFF'>
                        <path d="M57.9 67.9c-.4.4-.9.6-1.4.6s-1-.2-1.4-.6L38.1 51c-.8-.8-.8-2 0-2.8l16.1-16.1c.8-.8 2.1-.8 2.8 0 .8.8.8 2 0 2.8L42.4 49.6l15.5 15.5c.7.8.7 2 0 2.8zM88 50c0 21-17 38-38 38S12 71 12 50s17-38 38-38 38 17 38 38zm-4 0c0-18.8-15.2-34-34-34S16 31.2 16 50s15.2 34 34 34 34-15.2 34-34z">
                        </path>
                        <path fill="#FFFFFF" d="M804-1210V474H-980v-1684H804m8-8H-988V482H812v-1700z"></path>
                    </svg>

                </div>
                <div className="row">
                    {imageUrls.map((imageUrl, index) => (
                        <div key={index} className="col-6 col-md-2">
                            <img src={imageUrl} alt={`Gallery_Image ${index + 1}`} className="img-fluid gallery-image mt-4 rounded" />
                        </div>
                    ))}
                </div>
                <div className="scroll-buttons">
                    <svg className="scroll-button right" onClick={scrollRight} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100" id="right" fill='#FFFFFF' stroke='#FFFF'>
                        <g>
                            <path d="M61.4 51.8L45.3 67.9c-.8.8-2 .8-2.8 0-.8-.8-.8-2 0-2.8l14.7-14.7-15.5-15.5c-.8-.8-.8-2 0-2.8.8-.8 2-.8 2.8 0L61.4 49c.8.8.8 2 0 2.8zM88 50c0 21-17 38-38 38S12 71 12 50s17-38 38-38 38 17 38 38zm-4 0c0-18.8-15.2-34-34-34S16 31.2 16 50s15.2 34 34 34 34-15.2 34-34z"></path>
                        </g>
                        <g>
                            <path fill="#FFFFFF" d="M1084-1210V474H-700v-1684h1784m8-8H-708V482h1800v-1700z"></path>
                        </g>
                    </svg>

                </div>
            </div>
            <div className="services rounded">
                <h1 className="services-header">OUR SERVICES ARE</h1>
                <div className="service">
                    <h3>Food Services</h3>
                    <p>From appetizers to desserts, our comprehensive food services promise a delightful culinary journey for your guests.</p>
                </div>
                <div className="service">
                    <h3>Stage Decoration</h3>
                    <p>Transform your venue with our stunning stage decor, creating a captivating and memorable atmosphere for your event.</p>
                </div>
                <div className="service">
                    <h3>Catering</h3>
                    <p>Indulge your guests with a delectable culinary experience. Our catering services ensure a delightful array of dishes to suit every palate.</p>
                </div>
                <div className="service">
                    <h3>Boys for Assistance</h3>
                    <p>Our professional and courteous staff is here to assist you, ensuring that every aspect of your event runs smoothly.</p>
                </div>
                <div className="service">
                    <h3>Pandari Setup</h3>
                    <p>Create a traditional and elegant setting with our Pandari setup, adding cultural richness to your celebration.</p>
                </div>
                <div className="service">
                    <h3>Sittings Decoration</h3>
                    <p>Create a comfortable and stylish seating arrangement with our Sittings Decor, ensuring your guests are relaxed and immersed in the celebration.</p>
                </div>
                <div className="service">
                    <h3>Hosting Boys</h3>
                    <p>Our hosting boys ensure a welcoming and organized atmosphere for your guests, making your event memorable and stress-free.</p>
                </div>
                <div className="service">
                    <h3>Pandhal Works</h3>
                    <p>Enhance the visual appeal of your venue with our Pandhal works, offering aesthetic and functional coverings for your event.</p>
                </div>


                <div className="service">
                    <h3>Rent Vehicles</h3>
                    <p>Make transportation seamless with our vehicle rental services, providing reliable and comfortable options for your wedding day.</p>
                </div>
            </div>
            <div className="footer p-4 mt-4">
                <div className="get-in-touch mt-4">
                    <h3>Get In Touch</h3>
                    <p>Kattikulangara, Vengara, Malappuram, Kerala, India – 676304</p>
                    <p>+91 9567 503 268</p>
                    <p>tafconevents@gmail.com</p>
                </div>
                <div className="quick-links mt-4">
                    <h3>Quick Links</h3>
                    <ul>
                        <li>Home</li>
                        <li>Our Services</li>
                        <li>Career</li>
                        <li>Invest</li>
                    </ul>
                </div>
                <div className="newsletter mt-4 d-none d-md-block">
                    <h3>Newsletter</h3>
                    <p>We are thrilled to invite you to subscribe to our exclusive newsletter, where you'll receive the latest updates on our exceptional marriage event services and products. Be among the first to know about new arrivals,
                        insightful industry trends, and exclusive offers tailored to your needs.</p>
                </div>
                <div className="copyright mt-4 d-none d-md-block">
                    <p>&copy; tafconevents.com. All Rights Reserved. Designed by <span style={{ color: 'rgb(222,0,0)' }}>Rimshad EK</span> </p>
                    <p>Distributed By: <p className='port'>portexim IT solution</p></p>
                </div>

            </div>
        </div >
    );
}

export default Landing;
