import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MagnifyingGlassIcon, XMarkIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/outline';
import { useMarketStore } from '../../stores/marketStore';
import { useTelegramStore } from '../../stores/telegramStore';

const SearchBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [localSearch, setLocalSearch] = useState('');
    const { filters, applyFilters } = useMarketStore();
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    // Sync local search with global filters
    useEffect(() => {
        setLocalSearch(filters.search || '');
    }, [filters.search]);

    const handleSearch = (value: string) => {
        setLocalSearch(value);
        // Apply search immediately as user types
        applyFilters({ search: value });
    };

    const clearSearch = () => {
        setLocalSearch('');
        applyFilters({ search: '' });
    };

    const toggleFilters = () => {
        setIsExpanded(!isExpanded);
    };

    const applyStatusFilter = (status: string) => {
        applyFilters({ status: status as any });
    };

    const applySort = (sort: string) => {
        applyFilters({ sort: sort as any });
    };

    return (
        <div className="sticky top-0 z-10 px-2 pb-0.5" style={{ backgroundColor: theme?.bg_color }}>
            {/* Main Search Bar */}
            <div className="flex items-center gap-2 mb-2">
                {/* Search Input */}
                <div className="flex-1 relative">
                    <div className="relative">
                        <input
                            type="text"
                            value={localSearch}
                            onChange={(e) => handleSearch(e.target.value)}
                            placeholder="Search markets..."
                            className="w-full pl-10 pr-10 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all placeholder:text-sm"
                            style={{
                                backgroundColor: theme?.secondary_bg_color,
                                color: theme?.text_color,
                                border: `1px solid ${theme?.section_separator_color || 'transparent'}`,
                                outline: theme?.hint_color,
                                
                            }}
                        />
                        <MagnifyingGlassIcon
                            className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2"
                            style={{ color: theme?.hint_color }}
                        />
                        {localSearch && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-white/10 transition-colors"
                                style={{ color: theme?.hint_color }}
                            >
                                <XMarkIcon className="h-4 w-4" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Toggle Button */}
                <button
                    onClick={toggleFilters}
                    className={`p-3 rounded-xl transition-colors ${isExpanded ? 'bg-blue-500/20' : 'hover:bg-white/10'}`}
                    style={{
                        backgroundColor: isExpanded ? theme?.button_color + '30' : theme?.secondary_bg_color,
                        color: theme?.text_color
                    }}
                >
                    <AdjustmentsHorizontalIcon className="h-5 w-5" />
                </button>
            </div>

            {/* Filters Panel */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                    >
                        <div className="pb-4 space-y-4">
                            {/* Status Filter */}
                            <div>
                                <h4 className="text-sm font-medium mb-2" style={{ color: theme?.hint_color }}>
                                    Status
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['all', 'open', 'resolving', 'resolved', 'closed'].map((status) => (
                                        <button
                                            key={status}
                                            onClick={() => applyStatusFilter(status)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filters.status === status
                                                    ? 'text-white'
                                                    : 'hover:bg-white/10'
                                                }`}
                                            style={{
                                                backgroundColor: filters.status === status
                                                    ? theme?.button_color
                                                    : theme?.secondary_bg_color,
                                                color: filters.status === status
                                                    ? theme?.button_text_color
                                                    : theme?.text_color
                                            }}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div>
                                <h4 className="text-sm font-medium mb-2" style={{ color: theme?.hint_color }}>
                                    Sort by
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {['newest', 'oldest', 'liquidity', 'volume'].map((sort) => (
                                        <button
                                            key={sort}
                                            onClick={() => applySort(sort)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${filters.sort === sort
                                                    ? 'text-white'
                                                    : 'hover:bg-white/10'
                                                }`}
                                            style={{
                                                backgroundColor: filters.sort === sort
                                                    ? theme?.button_color
                                                    : theme?.secondary_bg_color,
                                                color: filters.sort === sort
                                                    ? theme?.button_text_color
                                                    : theme?.text_color
                                            }}
                                        >
                                            {sort.charAt(0).toUpperCase() + sort.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default SearchBar;