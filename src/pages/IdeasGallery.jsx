import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import IdeaCard from '../components/IdeaCard';
import './IdeasGallery.css';

const IdeasGallery = () => {
    const { ideas } = useContext(AppContext);
    const [filter, setFilter] = useState('All');

    const categories = ['All', 'Interior', 'Exterior', 'Smart Upgrades', 'Premium', 'Budget'];

    const filteredIdeas = ideas.filter(idea => {
        if (filter === 'All') return true;
        if (filter === 'Premium') return idea.budgetLevel === 'Premium';
        if (filter === 'Budget') return idea.budgetLevel === 'Budget';
        return idea.category === filter;
    });

    return (
        <div className="ideas-page container">
            <div className="page-header">
                <h1>Enhancement Ideas Gallery</h1>
                <p>Curated upgrades designed to maximize the resale value of your property.</p>
            </div>

            <div className="filter-bar">
                {categories.map(cat => (
                    <button
                        key={cat}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                        onClick={() => setFilter(cat)}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            <div className="grid-layout">
                {filteredIdeas.length > 0 ? (
                    filteredIdeas.map(idea => (
                        <IdeaCard key={idea.id} idea={idea} />
                    ))
                ) : (
                    <div className="empty-state">
                        <p>No ideas found for the selected category.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default IdeasGallery;
