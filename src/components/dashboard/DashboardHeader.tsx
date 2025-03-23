import React from 'react';

interface DashboardHeaderProps {
    title: string;
    subtitle: string;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ title, subtitle }) => {
    return (
        <header className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{title}</h1>
            <p className="text-gray-600">{subtitle}</p>
        </header>
    );
};

export default DashboardHeader;