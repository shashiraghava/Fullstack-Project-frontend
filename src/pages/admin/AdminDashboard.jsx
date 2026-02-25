import React, { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { Plus, Trash2, Edit2, LayoutList, Building } from 'lucide-react';
import Button from '../../components/ui/Button';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { ideas, addIdea, deleteIdea, properties } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('ideas');
    const [showAddForm, setShowAddForm] = useState(false);

    const [newIdea, setNewIdea] = useState({
        title: '',
        category: 'Interior',
        description: '',
        estimatedCost: '',
        valueAdded: '',
        imageUrl: '',
        budgetLevel: 'Medium'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewIdea({ ...newIdea, [name]: value });
    };

    const handleAddSubmit = (e) => {
        e.preventDefault();
        addIdea(newIdea);
        setShowAddForm(false);
        setNewIdea({
            title: '', category: 'Interior', description: '',
            estimatedCost: '', valueAdded: '', imageUrl: '', budgetLevel: 'Medium'
        });
    };

    return (
        <div className="admin-page container">
            <div className="admin-header">
                <h1>Admin Dashboard</h1>
                <div className="tab-controls">
                    <button
                        className={`tab-btn ${activeTab === 'ideas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('ideas')}
                    >
                        <LayoutList size={18} /> Manage Ideas
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
                        onClick={() => setActiveTab('properties')}
                    >
                        <Building size={18} /> Property Submissions
                    </button>
                </div>
            </div>

            <div className="admin-content">
                {activeTab === 'ideas' && (
                    <div className="ideas-management">
                        <div className="section-header">
                            <h2>Recommendation Ideas</h2>
                            <Button
                                variant="primary"
                                onClick={() => setShowAddForm(!showAddForm)}
                            >
                                <Plus size={16} /> {showAddForm ? 'Cancel' : 'Add New Idea'}
                            </Button>
                        </div>

                        {showAddForm && (
                            <form className="add-idea-form" onSubmit={handleAddSubmit}>
                                <h3>Add New Enhancement Idea</h3>
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Title</label>
                                        <input name="title" value={newIdea.title} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Category</label>
                                        <select name="category" value={newIdea.category} onChange={handleInputChange}>
                                            <option value="Interior">Interior</option>
                                            <option value="Exterior">Exterior</option>
                                            <option value="Smart Upgrades">Smart Upgrades</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Budget Level</label>
                                        <select name="budgetLevel" value={newIdea.budgetLevel} onChange={handleInputChange}>
                                            <option value="Budget">Budget</option>
                                            <option value="Medium">Medium</option>
                                            <option value="Premium">Premium</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label>Image URL</label>
                                        <input name="imageUrl" value={newIdea.imageUrl} onChange={handleInputChange} required />
                                    </div>
                                    <div className="form-group">
                                        <label>Estimated Cost</label>
                                        <input name="estimatedCost" value={newIdea.estimatedCost} onChange={handleInputChange} placeholder="e.g. ₹50,000" required />
                                    </div>
                                    <div className="form-group">
                                        <label>Value Added (ROI)</label>
                                        <input name="valueAdded" value={newIdea.valueAdded} onChange={handleInputChange} placeholder="e.g. High (₹1.5L)" required />
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Description</label>
                                        <textarea name="description" value={newIdea.description} onChange={handleInputChange} rows="3" required></textarea>
                                    </div>
                                </div>
                                <Button type="submit" variant="secondary" className="mt-4">Save Idea</Button>
                            </form>
                        )}

                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Idea</th>
                                        <th>Category</th>
                                        <th>Budget</th>
                                        <th>Est. Cost</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {ideas.map(idea => (
                                        <tr key={idea.id}>
                                            <td>
                                                <div className="idea-cell">
                                                    <img src={idea.imageUrl} alt={idea.title} />
                                                    <span>{idea.title}</span>
                                                </div>
                                            </td>
                                            <td><span className="badge category-badge-sm">{idea.category}</span></td>
                                            <td><span className={`budget-badge budget-${idea.budgetLevel.toLowerCase()}`}>{idea.budgetLevel}</span></td>
                                            <td>{idea.estimatedCost}</td>
                                            <td>
                                                <div className="action-buttons">
                                                    <button className="icon-btn text-muted"><Edit2 size={16} /></button>
                                                    <button
                                                        className="icon-btn text-danger"
                                                        onClick={() => deleteIdea(idea.id)}
                                                    ><Trash2 size={16} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'properties' && (
                    <div className="properties-management">
                        <h2>User Property Submissions</h2>
                        <p className="text-muted mb-20">View properties submitted by users seeking enhancement recommendations.</p>

                        <div className="table-responsive">
                            <table className="admin-table">
                                <thead>
                                    <tr>
                                        <th>Owner Name</th>
                                        <th>Location</th>
                                        <th>Property Type</th>
                                        <th>Size (SqFt)</th>
                                        <th>Target Budget</th>
                                        <th>Est. Base Value</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {properties.length === 0 ? (
                                        <tr><td colSpan="7" className="text-center">No submissions yet.</td></tr>
                                    ) : (
                                        properties.map(prop => (
                                            <tr key={prop.id}>
                                                <td className="font-medium">{prop.ownerName}</td>
                                                <td>{prop.location}</td>
                                                <td>{prop.propertyType}</td>
                                                <td>{prop.sizeSqFt}</td>
                                                <td><span className="badge-sm">{prop.budgetLevel}</span></td>
                                                <td>₹{(prop.currentEstimatedValue || 0).toLocaleString('en-IN')}</td>
                                                <td><span className="status-badge status-pending">{prop.status}</span></td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;
