import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import PageTransition from '@/components/landingApp/PageTransition';
import { useNavigate } from 'react-router-dom';
import BackgroundElements from '@/components/child_dashboard/BackgroundElements';
import DashboardHeader from '@/components/child_dashboard/DashboardHeader';
import ActionCards from '@/components/child_dashboard/ActionCards';
import TodaysLesson from '@/components/child_dashboard/TodaysLesson';
import AnimatedCharacters from '@/components/child_dashboard/AnimatedCharacters';

const ChildDashboard = () => {
    const navigate = useNavigate();
    const [balance] = useState(25.75);
    const [activeCharacter, setActiveCharacter] = useState(0);
    
    // Cartoon characters that will animate on the dashboard
    const characters = [
        { name: "Penny", position: "bottom-0 left-0", size: "w-40 h-40 md:w-56 md:h-56" },
        { name: "Buddy", position: "bottom-0 right-0", size: "w-36 h-36 md:w-48 md:h-48" },
        { name: "Coco", position: "top-0 left-1/4", size: "w-32 h-32 md:w-40 md:h-40" }
    ];
    
    // Cycle through character animations
    useEffect(() => {
        const interval = setInterval(() => {
            setActiveCharacter((prev) => (prev + 1) % characters.length);
        }, 5000);
        
        return () => clearInterval(interval);
    }, []);

    return (
        <PageTransition>
            <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-200 to-purple-200">
                <BackgroundElements />
                <AnimatedCharacters 
                    characters={characters} 
                    activeCharacter={activeCharacter} 
                />

                <div className="container mx-auto px-4 py-8 relative z-20">
                    <DashboardHeader balance={balance} />
                    <ActionCards navigate={navigate} />
                    <TodaysLesson />
                </div>
            </div>
        </PageTransition>
    );
};

export default ChildDashboard;