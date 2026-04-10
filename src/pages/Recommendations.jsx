import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import './Recommendations.css';

const Recommendations = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [ideas, setIdeas] = useState(null); // 🔥 object ga set chesam
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const propertyData = location.state?.propertyData;

    useEffect(() => {
        if (!propertyData) {
            navigate('/submit');
            return;
        }

        fetch("http://localhost:8080/api/recommendations", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(propertyData)
        })
            .then(res => {
                if (!res.ok) throw new Error("Failed to fetch data");
                return res.json();
            })
            .then(data => {
                console.log("Backend response:", data);

                setIdeas(data); // ✅ IMPORTANT FIX
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setError("Unable to load recommendations");
                setLoading(false);
            });

    }, [propertyData, navigate]);

    // ❌ no data
    if (!propertyData) {
        return <h2 style={{ textAlign: "center" }}>Please fill property details first ⚠️</h2>;
    }

    // ⏳ loading
    if (loading) {
        return <h2 style={{ textAlign: "center" }}>Loading recommendations... ⏳</h2>;
    }

    // ❌ error
    if (error) {
        return <h2 style={{ textAlign: "center", color: "red" }}>{error}</h2>;
    }

    return (
        <div className="recommendations-page container">

            {/* Back Button */}
            <button className="back-link" onClick={() => navigate('/submit')}>
                <ArrowLeft size={16} /> Edit Details
            </button>

            {/* Header */}
            <div className="results-header">
                <h1>Your Personalized Value Enhancement Report</h1>

                <p>
                    Property in <b>{ideas?.location}</b> ({ideas?.propertyType})
                </p>
            </div>

            <div className="recommendations-content">

                {/* 🔥 FRONTEND STATIC IDEAS */}
                <div className="section-title-wrapper">
                    <Sparkles className="text-accent" />
                    <h2>Recommended Upgrades</h2>
                </div>

                <div className="idea-card">
                    <ul>
                        <li>Interior Renovation</li>
                        <li>Smart Home Automation</li>
                        <li>Solar Panels</li>
                    </ul>
                </div>

                {/* 🔥 BACKEND DATA */}
                <div className="section-title-wrapper">
                    <h3>Backend Suggestion</h3>
                </div>

                <div className="idea-card">
                    <p><b>Location:</b> {ideas?.location}</p>
                    <p><b>Property Type:</b> {ideas?.propertyType}</p>
                    <p><b>Size:</b> {ideas?.sizeSqFt}</p>
                    <p><b>Suggestion:</b> {ideas?.suggestion}</p>
                </div>

                {/* CTA */}
                <div className="cta-section">
                    <Button
                        variant="primary"
                        size="lg"
                        onClick={() => alert("Backend connected successfully!")}
                    >
                        Done
                    </Button>
                </div>

            </div>
        </div>
    );
};

export default Recommendations;