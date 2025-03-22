// src/components/Chat/SuggestionChips.jsx
import React from 'react';

const SuggestionChips = ({ setInput, isListening, handleShowRecommendations }) => {
    return (
        <div className="flex flex-wrap gap-2 mt-2 pl-2">
            <span className="text-xs text-gray-500">
                {isListening ? "Speak now..." : "Try asking:"}
            </span>
            <button 
                onClick={() => setInput("Show me some LEGO sets")}
                className="text-xs text-brand-blue hover:underline"
            >
                "Show me some LEGO sets"
            </button>
            <span className="text-xs text-gray-500">or</span>
            <button 
                onClick={() => setInput("I'm looking for headphones")}
                className="text-xs text-brand-blue hover:underline"
            >
                "I'm looking for headphones"
            </button>
            <span className="text-xs text-gray-500">or</span>
            <button 
                onClick={handleShowRecommendations}
                className="text-xs text-brand-blue hover:underline"
            >
                "Show me recommendations"
            </button>
        </div>
    );
};

export default SuggestionChips;