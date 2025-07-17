import { motion } from 'framer-motion';


type PositionFiltersProps = {
    activeFilter: 'active' | 'resolved';
    setActiveFilter: (filter: 'active' | 'resolved') => void;
};

const PositionFilters = ({ activeFilter, setActiveFilter }: PositionFiltersProps) => {
    return (
        <div className="flex bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20">
            <button
                onClick={() => setActiveFilter('active')}
                className={`flex-1 py-2 rounded-lg transition-colors relative ${activeFilter === 'active' ? 'text-white' : 'text-white/60'
                    }`}
            >
                Active Positions
                {activeFilter === 'active' && (
                    <motion.div
                        layoutId="filter-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                )}
            </button>

            <button
                onClick={() => setActiveFilter('resolved')}
                className={`flex-1 py-2 rounded-lg transition-colors relative ${activeFilter === 'resolved' ? 'text-white' : 'text-white/60'
                    }`}
            >
                Resolved Positions
                {activeFilter === 'resolved' && (
                    <motion.div
                        layoutId="filter-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400 rounded-full"
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                )}
            </button>
        </div>
    );
};

export default PositionFilters;