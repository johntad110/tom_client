import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FunnelIcon, ArrowsUpDownIcon, XMarkIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useMarketStore } from '../../stores/marketStore';

const FloatingFilterBar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const { filters, applyFilters } = useMarketStore();

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
        if (!isExpanded) {
            setSearchValue(filters.search);
        }
    };

    const applySearch = () => {
        applyFilters({ search: searchValue });
    };

    return (
        <div className="fixed top-4 right-4 z-20">
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={toggleExpand}
                className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-lg rounded-full p-3"
            >
                {isExpanded ? (
                    <XMarkIcon className="h-6 w-6 text-white" />
                ) : (
                    <FunnelIcon className="h-6 w-6 text-white" />
                )}
            </motion.button>

            {/* Expanded Panel */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="absolute top-16 right-0 w-72 bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl rounded-2xl overflow-hidden"
                    >
                        <div className="p-4">
                            {/* Search Input */}
                            <div className="relative mb-4">
                                <input
                                    type="text"
                                    value={searchValue}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && applySearch()}
                                    placeholder="Search markets..."
                                    className="w-full bg-white/10 border border-white/20 rounded-lg py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                                <MagnifyingGlassIcon className="h-5 w-5 text-white/70 absolute left-3 top-2.5" />
                                <button
                                    onClick={applySearch}
                                    className="absolute right-2 top-1.5 bg-blue-500/20 hover:bg-blue-500/30 px-2 py-1 rounded text-sm transition-colors"
                                >
                                    Search
                                </button>
                            </div>

                            {/* Status Filter */}
                            <div className="mb-4">
                                <div className="flex items-center text-sm mb-2">
                                    <FunnelIcon className="h-4 w-4 mr-1" />
                                    Filter by status
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {['all', 'open', 'resolving', 'resolved', 'closed'].map((status) => (
                                        <button
                                            key={status}
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            onClick={() => applyFilters({ status: status as any })}
                                            className={`text-xs py-1.5 px-2 rounded-lg transition-colors ${filters.status === status
                                                    ? status === 'all'
                                                        ? 'bg-purple-500 text-white'
                                                        : status === 'open'
                                                            ? 'bg-blue-500 text-white'
                                                            : status === 'resolving'
                                                                ? 'bg-orange-500 text-white'
                                                                : 'bg-gray-500 text-white'
                                                    : 'bg-white/10 hover:bg-white/20'
                                                }`}
                                        >
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sort Options */}
                            <div>
                                <div className="flex items-center text-sm mb-2">
                                    <ArrowsUpDownIcon className="h-4 w-4 mr-1" />
                                    Sort by
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    {['newest', 'oldest', 'liquidity', 'volume'].map((sort) => (
                                        <button
                                            key={sort}
                                            // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                            onClick={() => applyFilters({ sort: sort as any })}
                                            className={`text-xs py-1.5 px-2 rounded-lg transition-colors ${filters.sort === sort
                                                    ? 'bg-blue-500 text-white'
                                                    : 'bg-white/10 hover:bg-white/20'
                                                }`}
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

export default FloatingFilterBar;