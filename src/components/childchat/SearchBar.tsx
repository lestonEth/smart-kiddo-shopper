// @/components/childchat/SearchBar.tsx
import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface SearchBarProps {
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    handleSearchSubmit: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm, handleSearchSubmit }) => {
    return (
        <motion.div 
            className="glass-card bg-white bg-opacity-80 rounded-3xl p-4 mb-6 shadow-xl border-4 border-pink-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
        >
            <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                    type="text"
                    placeholder="What toy do you want?"
                    className="flex-1 px-4 py-2 rounded-full bg-white border-2 border-pink-200 font-comic focus:outline-none focus:border-pink-400"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <motion.button
                    type="submit"
                    className="ml-2 w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Search className="w-5 h-5 text-white" />
                </motion.button>
            </form>
        </motion.div>
    );
};

export default SearchBar;