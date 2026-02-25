import React, { useContext, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, TrendingUp, IndianRupee, Sparkles } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import IdeaCard from '../components/IdeaCard';
import Button from '../components/ui/Button';
import './Recommendations.css';

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { ideas } = useContext(AppContext);

    const propertyData = location.state?.propertyData;

    useEffect(() => {
        if (!propertyData) {
            navigate('/submit');
        }
    }, [propertyData, navigate]);

    if (!propertyData) return null;

    // Simple logic to mock recommendations
    const recommendedIdeas = ideas.filter(idea =>
        idea.budgetLevel === propertyData.budgetLevel || idea.budgetLevel === 'Budget'
    ).slice(0, 3); // Top 3 ideas

    const baseValue = parseInt(propertyData.sizeSqFt) * 6000;

    // Simulated added value sum
    const totalValueAdded = recommendedIdeas.reduce((sum, idea) => {
        const isHigh = idea.valueAdded.includes('High');
        return sum + (isHigh ? 300000 : 150000);
    }, 0);

    const potentialValue = baseValue + totalValueAdded;

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="recommendations-page container">
            <button className="back-link" onClick={() => navigate('/submit')}>
                <ArrowLeft size={16} /> Edit Details
            </button>

            <div className="results-header">
                <h1>Your Personalized Value Enhancement Report</h1>
                <p>Prepared for {propertyData.propertyType} in {propertyData.location}</p>
            </div>

            <div className="value-estimator-card">
                <div className="value-section current-value">
                    <p className="value-label">Current Estimated Value</p>
                    <h2 className="value-amount">{formatCurrency(baseValue)}</h2>
                </div>

                <div className="value-arrow">
                    <TrendingUp size={32} />
                    <span>+{formatCurrency(totalValueAdded)}</span>
                </div>

                <div className="value-section potential-value">
                    <p className="value-label">Potential Value After Upgrades</p>
                    <h2 className="value-amount text-primary">{formatCurrency(potentialValue)}</h2>
                </div>
            </div>

            <div className="recommendations-content">
                <div className="section-title-wrapper">
                    <Sparkles className="text-accent" />
                    <h2>Top Recommended Upgrades</h2>
                    <span className="badge-sm">{propertyData.budgetLevel} Budget</span>
                </div>
                <p className="section-desc">
                    Based on your {propertyData.sizeSqFt} sq.ft space in {propertyData.location}, these are the highest ROI improvements.
                </p>

                <div className="grid-layout mt-30">
                    {recommendedIdeas.map(idea => (
                        <IdeaCard key={idea.id} idea={idea} />
                    ))}
                </div>

                <div className="cta-section">
                    <h3>Ready to increase your property value?</h3>
                    <p>Book a consultation with our verified enhancement experts to get accurate quotes.</p>
                    <Button variant="primary" size="lg">Consult an Expert</Button>
                </div>
            </div>
        </div>
    );
};

export default Recommendations;
