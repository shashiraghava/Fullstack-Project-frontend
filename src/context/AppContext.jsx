import { createContext, useState, useEffect } from 'react';
import { enhancementIdeas, propertyListings } from '../data/mockData';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [ideas, setIdeas] = useState(enhancementIdeas);
    const [properties, setProperties] = useState(propertyListings);

    const addIdea = (idea) => {
        setIdeas([...ideas, { ...idea, id: Date.now().toString() }]);
    };

    const updateIdea = (updatedIdea) => {
        setIdeas(ideas.map(i => i.id === updatedIdea.id ? updatedIdea : i));
    };

    const deleteIdea = (id) => {
        setIdeas(ideas.filter(i => i.id !== id));
    };

    const addProperty = (property) => {
        setProperties([...properties, { ...property, id: Date.now().toString(), status: 'Pending Review', submittedAt: new Date().toISOString().split('T')[0] }]);
    };

    return (
        <AppContext.Provider value={{
            ideas, addIdea, updateIdea, deleteIdea,
            properties, addProperty
        }}>
            {children}
        </AppContext.Provider>
    );
};
