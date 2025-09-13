import { motion, AnimatePresence } from 'framer-motion';
import MarketCard from '../components/market/MarketCard';
import { useMarketStore } from '../stores/marketStore';
import LoadingShimmer from '../components/home/LoadingShimmer';
import SearchBar from '../components/home/SearchBar';
import { useTelegramStore } from '../stores/telegramStore';
import HowItWorksButton from '../components/HowItWorksButton';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const { filteredMarkets, loading, applyFilters } = useMarketStore();
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    useEffect(() => {
        const onboardingCompleted = localStorage.getItem('onboardingCompleted')
        if (onboardingCompleted !== 'true') {
            navigate("/onboarding");
        }
    }, [])

    if (loading) { return <LoadingShimmer />; }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen"
        >
            <SearchBar />
            <HowItWorksButton />

            <div className="max-w-md mx-auto space-y-3">
                <AnimatePresence>
                    {filteredMarkets.length > 0 ? (
                        filteredMarkets.map((market, index) => (
                            <motion.div
                                key={market.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05, duration: 0.3 }}
                            >
                                <MarketCard market={market} isNew={true} />
                            </motion.div>
                        ))
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-8 text-center "
                        >
                            <p className="text-sm" style={{ color: theme?.text_color }}>No markets match your filters</p>
                            <button
                                onClick={() => applyFilters({ status: 'all', search: '' })}
                                className="mt-4 px-4 py-2 transition-colors text-sm"
                                style={{ color: theme?.button_text_color, backgroundColor: theme?.button_color }}
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