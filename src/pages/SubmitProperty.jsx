import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Button from '../components/ui/Button';
import './SubmitProperty.css';

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

    const [errorMsg, setErrorMsg] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');

        if (!formData.propertyAge || !formData.currentValue || !formData.budget) {
            setErrorMsg('Please fill all required fields');
            return;
        }

        const age = parseInt(formData.propertyAge);
        const value = parseFloat(formData.currentValue);
        const budget = parseFloat(formData.budget);

        if (age < 0 || value <= 0 || budget <= 0) {
            setErrorMsg('Invalid values');
            return;
        }

        // ✅ FINAL DATA (THIS FIXES YOUR ISSUE)
        const sendData = {
            ownerName: formData.ownerName,
            location: formData.location,
            propertyType: formData.propertyType,
            propertyAge: age,
            currentValue: value,
            budget: budget
        };

        console.log("Sending Data:", sendData);

        // 🔥 SAVE TO BACKEND
        fetch("http://localhost:8080/api/properties", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(sendData)
        })
        .then(res => res.json())
        .then(data => {
            console.log("Saved to DB:", data);
        })
        .catch(err => {
            console.error("Error:", err);
        });

        // context save
        addProperty({
            ...sendData,
            currentEstimatedValue: value
        });

        // navigation (IMPORTANT CHANGE)
        navigate('/recommendations', { state: { propertyData: sendData } });
    };

    return (
        <div className="submit-page container">
            <div className="form-container">

                <h2>Property Value Estimator</h2>

                {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

                <form onSubmit={handleSubmit}>

                    <input name="ownerName" placeholder="Name" value={formData.ownerName} onChange={handleChange} required />
                    <input name="location" placeholder="City" value={formData.location} onChange={handleChange} required />

                    <select name="propertyType" value={formData.propertyType} onChange={handleChange}>
                        <option>Apartment</option>
                        <option>Independent House</option>
                    </select>

                    <input type="number" name="propertyAge" placeholder="Age" value={formData.propertyAge} onChange={handleChange} required />
                    <input type="number" name="currentValue" placeholder="Current Value" value={formData.currentValue} onChange={handleChange} required />
                    <input type="number" name="budget" placeholder="Budget" value={formData.budget} onChange={handleChange} required />

                    <Button type="submit">Get Recommendations</Button>

                </form>

            </div>
        </div>
    );
};

export default SubmitProperty;