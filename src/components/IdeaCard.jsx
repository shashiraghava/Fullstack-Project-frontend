import React from 'react';
import { IndianRupee, TrendingUp, Tag } from 'lucide-react';
import './IdeaCard.css';

const IdeaCard = ({ idea }) => {
    return (
        <div className="idea-card">
            <div className="card-image-wrapper">
                <img src={idea.imageUrl} alt={idea.title} className="card-image" />
                <span className="category-badge">{idea.category}</span>
                <span className={`budget-badge budget-${idea.budgetLevel.toLowerCase()}`}>
                    {idea.budgetLevel}
                </span>
            </div>
            <div className="card-content">
                <h3 className="card-title">{idea.title}</h3>
                <p className="card-desc">{idea.description.substring(0, 100)}...</p>

                <div className="card-stats">
                    <div className="stat-item">
                        <IndianRupee size={16} className="stat-icon text-muted" />
                        <div>
                            <span className="stat-label">Est. Cost</span>
                            <p className="stat-value">{idea.estimatedCost}</p>
                        </div>
                    </div>
                    <div className="stat-item">
                        <TrendingUp size={16} className="stat-icon text-primary" />
                        <div>
                            <span className="stat-label">Value Added</span>
                            <p className="stat-value text-primary">{idea.valueAdded}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaCard;
