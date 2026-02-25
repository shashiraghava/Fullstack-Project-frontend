import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, TrendingUp, Home as HomeIcon } from 'lucide-react';
import Button from '../components/ui/Button';
import './Home.css';

const Home = () => {
    return (
        <div className="home-page">
            <section className="hero-section">
                <div className="container hero-content">
                    <div className="hero-text">
                        <div className="badge"><Sparkles size={16} /> Premium Upgrades</div>
                        <h1 className="hero-title">Urban Renovate.</h1>
                        <p className="hero-subtitle">
                            Discover curated, high-ROI property enhancement ideas that go beyond basic repairs. Transform your space to attract premium buyers in today's competitive real estate market.
                        </p>
                        <div className="hero-actions">
                            <Link to="/ideas">
                                <Button variant="primary" size="lg">Explore Ideas</Button>
                            </Link>
                            <Link to="/submit">
                                <Button variant="outline" size="lg">Get Free Estimate</Button>
                            </Link>
                        </div>
                    </div>
                    <div className="hero-image-wrapper">
                        <img
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800"
                            alt="Modern Indian Home Interior"
                            className="hero-image"
                        />
                        <div className="floating-card highlight-card">
                            <TrendingUp size={24} color="var(--primary)" />
                            <div>
                                <h4>+ ₹4.5L</h4>
                                <p>Average Value Added</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="features-section container">
                <div className="section-header">
                    <h2>Why Upgrade Before Selling?</h2>
                    <p>Strategic improvements can drastically shift your property from standard to premium.</p>
                </div>
                <div className="features-grid">
                    <div className="feature-card">
                        <div className="icon-wrapper"><HomeIcon size={28} /></div>
                        <h3>Stand Out Immediately</h3>
                        <p>Homes with smart modular kitchens or modern textures sell 40% faster than standard flats.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper"><TrendingUp size={28} /></div>
                        <h3>Maximize ROI</h3>
                        <p>Every ₹1 Lakh spent on the right upgrades can yield up to ₹2.5 Lakhs in final property value.</p>
                    </div>
                    <div className="feature-card">
                        <div className="icon-wrapper"><Sparkles size={28} /></div>
                        <h3>Premium Appeal</h3>
                        <p>Attract buyers willing to pay a premium for move-in-ready, aesthetically pleasing homes.</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
