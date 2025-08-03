import { motion, AnimatePresence } from 'framer-motion';
import FloatingFilterBar from '../components/home/FloatingFilterBar';
import MarketCard from '../components/market/MarketCard';
import { useMarketStore } from '../stores/marketStore';
import LoadingShimmer from '../components/home/LoadingShimmer';

const HomePage = () => {
    const { filteredMarkets, loading, applyFilters } = useMarketStore();

    if (loading) { return <LoadingShimmer />; }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-16 px-4 pb-24"
        >
            <FloatingFilterBar />

            <div className="max-w-md mx-auto space-y-6">
                <AnimatePresence>
                    {filteredMarkets.length > 0 ? (
                        filteredMarkets.map((market, index) => (
                            <motion.div
                                key={market.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                            >
                                <MarketCard market={market} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20"
                        >
                            <p className="text-white/70">No markets match your filters</p>
                            <button
                                onClick={() => applyFilters({ status: 'all', search: '' })}
                                className="mt-4 bg-blue-500/20 hover:bg-blue-500/30 px-4 py-2 rounded-lg transition-colors"
                            >
                                Reset Filters
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default HomePage;