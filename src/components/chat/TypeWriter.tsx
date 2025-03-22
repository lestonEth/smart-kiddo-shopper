// src/components/Chat/TypeWriter.jsx
import React, { useState, useEffect } from 'react';

const TypeWriter = ({ text, speed = 15, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [index, setIndex] = useState(0);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        if (index < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(prev => prev + text.charAt(index));
                setIndex(index + 1);
            }, speed);
            
            return () => clearTimeout(timer);
        } else if (!completed) {
            setCompleted(true);
            onComplete && onComplete();
        }
    }, [index, text, speed, completed, onComplete]);

    // Reset the state if text changes
    useEffect(() => {
        setDisplayedText('');
        setIndex(0);
        setCompleted(false);
    }, [text]);

    return <span>{displayedText}</span>;
};

export default TypeWriter;