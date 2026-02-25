import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, MapPin, Home, IndianRupee, TrendingUp, CheckCircle, AlertCircle, Sparkles, Calendar } from 'lucide-react';
import { AppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import './SubmitProperty.css';

const upgradeOptions = [
    { id: 'interiorRenovation', label: 'Interior Renovation', increasePerc: 10 },
    { id: 'plumbingElectrical', label: 'Plumbing & Electrical Upgrade', increasePerc: 8 },
    { id: 'modularKitchen', label: 'Modular Kitchen', increasePerc: 12 },
    { id: 'smartHome', label: 'Smart Home Automation', increasePerc: 15 },
    { id: 'solarPanels', label: 'Solar Panels', increasePerc: 18 }
];

const SubmitProperty = () => {
    const { addProperty } = useContext(AppContext);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        ownerName: '',
        location: '',
        propertyType: 'Apartment',
        propertyAge: '',
        currentValue: '',
        budget: ''
    });

    const [recommendedUpgrades, setRecommendedUpgrades] = useState([]);
    const [recommendationReason, setRecommendationReason] = useState('');
    const [isCalculating, setIsCalculating] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const [calculationResults, setCalculationResults] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Reset results if user changes inputs after calculating
        if (showResult) {
            setShowResult(false);
        }
    };

    const calculateRecommendations = (budget, age, currentValue, type) => {
        let upgrades = [];
        let reason = '';

        if (age > 15) {
            upgrades = ['interiorRenovation', 'plumbingElectrical'];
            reason = `Since your property is over 15 years old, focusing on foundational updates like Plumbing & Electrical alongside an Interior Renovation provides the safest and highest return on investment.`;
        } else if (age >= 5 && age <= 15) {
            upgrades = ['modularKitchen', 'smartHome'];
            reason = `For a property between 5 to 15 years old, buyers look for modernizations. Upgrading to a Modular Kitchen and adding Smart Home Automation will make it highly competitive in the current market.`;
        } else {
            upgrades = ['smartHome'];
            reason = `Your property is fairly new (under 5 years). The structure is good, so adding premium features like Smart Home Automation is the best way to add instant premium value.`;
        }

        if (type === 'Independent House') {
            if (!upgrades.includes('solarPanels')) {
                upgrades.push('solarPanels');
                reason += ` Because it's an Independent House with roof access, we highly recommend Solar Panels to significantly boost the property's eco-friendly appeal and market value.`;
            }
        }

        const uniqueUpgrades = [...new Set(upgrades)];

        const totalIncreasePerc = uniqueUpgrades.reduce((total, id) => {
            const upgrade = upgradeOptions.find(u => u.id === id);
            return total + (upgrade ? upgrade.increasePerc : 0);
        }, 0);

        const appreciationAmount = (currentValue * totalIncreasePerc) / 100;
        const expectedNewValue = currentValue + appreciationAmount;
        const netProfit = expectedNewValue - currentValue - budget; // which matches appreciationAmount - budget
        const roiPercentage = budget > 0 ? (netProfit / budget) * 100 : 0;
        const isProfit = netProfit >= 0;

        return {
            upgrades: uniqueUpgrades,
            reason,
            currentValue,
            expectedNewValue,
            totalIncreasePerc,
            investmentAmount: budget,
            appreciationAmount,
            netProfit,
            roiPercentage,
            isProfit
        };
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!formData.propertyAge || !formData.currentValue || !formData.budget) {
            setErrorMsg('Please ensure all required fields are filled out.');
            return;
        }

        const ageNum = parseInt(formData.propertyAge);
        const valueNum = parseInt(formData.currentValue);
        const budgetNum = parseInt(formData.budget);

        if (ageNum < 0 || valueNum <= 0 || budgetNum <= 0) {
            setErrorMsg('Budget and Current Value must be greater than zero. Age cannot be negative.');
            return;
        }

        setIsCalculating(true);

        // Simulate calculation delay
        setTimeout(() => {
            const results = calculateRecommendations(budgetNum, ageNum, valueNum, formData.propertyType);
            setRecommendedUpgrades(results.upgrades);
            setRecommendationReason(results.reason);
            setCalculationResults(results);
            setShowResult(true);
            setIsCalculating(false);

            // Add property to context only after successful calculation
            addProperty({
                ...formData,
                budgetLevel: 'Custom',
                currentEstimatedValue: valueNum
            });
        }, 1500);
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            maximumFractionDigits: 0
        }).format(amount);
    };

    return (
        <div className="submit-page container">
            <div className="estimator-layout" style={{ gridTemplateColumns: showResult ? '1fr 1fr' : '1fr', maxWidth: showResult ? '1100px' : '600px', margin: '0 auto' }}>
                <div className="form-container">
                    <div className="form-header">
                        <div className="icon-circle"><Calculator size={32} /></div>
                        <h2>Get Your Free Estimate</h2>
                        <p>Tell us about your home, current value, and budget.</p>
                    </div>

                    {errorMsg && (
                        <div style={{ backgroundColor: '#fef2f2', color: '#b91c1c', padding: '12px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #fecaca', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <AlertCircle size={18} />
                            {errorMsg}
                        </div>
                    )}

                    {isCalculating ? (
                        <div className="calculating-state">
                            <div className="spinner"></div>
                            <h3>Analyzing your property...</h3>
                        </div>
                    ) : (
                        <form className="property-form" onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="ownerName">Your Name</label>
                                <input type="text" id="ownerName" name="ownerName" value={formData.ownerName} onChange={handleChange} required placeholder="e.g. Rahul Sharma" />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="location"><MapPin size={16} /> City</label>
                                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required placeholder="e.g. Pune" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="propertyType"><Home size={16} /> Property Type</label>
                                    <select id="propertyType" name="propertyType" value={formData.propertyType} onChange={handleChange}>
                                        <option value="Apartment">Apartment</option>
                                        <option value="Independent House">Independent House</option>
                                    </select>
                                </div>
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <label htmlFor="propertyAge"><Calendar size={16} /> Property Age (Years)</label>
                                    <input type="number" id="propertyAge" name="propertyAge" value={formData.propertyAge} onChange={handleChange} required min="0" placeholder="e.g. 10" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="currentValue"><IndianRupee size={16} /> Current Market Value (₹)</label>
                                    <input type="number" id="currentValue" name="currentValue" value={formData.currentValue} onChange={handleChange} required min="100000" placeholder="e.g. 5000000" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="budget"><IndianRupee size={16} /> Repair / Upgrade Budget (₹)</label>
                                <input type="number" id="budget" name="budget" value={formData.budget} onChange={handleChange} required min="0" placeholder="e.g. 150000" />
                            </div>

                            <Button type="submit" variant="primary" size="lg" className="w-full mt-4">
                                View Recommendations
                            </Button>

                            {showResult && (
                                <Button type="button" variant="outline" size="lg" className="w-full mt-4" onClick={() => navigate('/recommendations', { state: { propertyData: formData } })}>
                                    View Additional Matches
                                </Button>
                            )}
                        </form>
                    )}
                </div>

                {showResult && calculationResults && (
                    <div className="roi-calculator-container">
                        <div className="roi-card">
                            <div className="roi-header ai-header">
                                <Sparkles size={24} className="text-accent" />
                                <h3>Recommended Repairs for Your Property</h3>
                            </div>

                            <p className="ai-reason">{calculationResults.reason}</p>

                            <div className="upgrades-list-compact">
                                {recommendedUpgrades.map(id => {
                                    const upgrade = upgradeOptions.find(u => u.id === id);
                                    return (
                                        <div key={id} className="compact-upgrade-item">
                                            <span className="upgrade-name"><CheckCircle size={14} className="text-primary" /> {upgrade?.label}</span>
                                            <span className="upgrade-badge">+{upgrade?.increasePerc}% Value</span>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="roi-stats-list mt-top-border">
                                <div className="roi-stat-row">
                                    <span>Current Property Value:</span>
                                    <span className="stat-num">{formatCurrency(calculationResults.currentValue)}</span>
                                </div>
                                <div className="roi-stat-row">
                                    <span>Planned Investment:</span>
                                    <span className="stat-num">{formatCurrency(calculationResults.investmentAmount)}</span>
                                </div>
                                <div className="roi-stat-row">
                                    <span>Total Value Increase %:</span>
                                    <span className="stat-num text-accent">+{calculationResults.totalIncreasePerc}%</span>
                                </div>
                                <div className="roi-stat-row highlight">
                                    <span>Expected New Value:</span>
                                    <span className="stat-num text-accent">{formatCurrency(calculationResults.expectedNewValue)}</span>
                                </div>
                            </div>

                            <div className={`roi-result-box ${calculationResults.isProfit ? 'profit' : 'loss'}`}>
                                <div className="result-header">
                                    {calculationResults.isProfit ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                                    <h4>Net Profit</h4>
                                </div>
                                <p className="main-result">{formatCurrency(calculationResults.netProfit)}</p>
                                <div className="roi-badge">
                                    ROI: {calculationResults.isProfit ? '+' : ''}{calculationResults.roiPercentage.toFixed(1)}%
                                </div>
                                <p className="result-caption">
                                    {calculationResults.isProfit ? 'Great investment! The value increases beyond your repair budget.' : 'Warning: Investment may not fully translate to immediate property value.'}
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SubmitProperty;
