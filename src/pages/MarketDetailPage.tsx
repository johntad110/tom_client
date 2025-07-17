import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import MarketHeader from '../components/market/MarketHeader';
import PriceChart from '../components/market/PriceChart';
import PositionSection from '../components/market/PositionSection';
import TradePanel from '../components/market/TradePanel';
import { useMarketStore } from '../stores/marketStore';
import LoadingShimmer from '../components/home/LoadingShimmer';

const MarketDetailPage = () => {
    const { id } = useParams();
    const { getMarketById, loading } = useMarketStore();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [market, setMarket] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const foundMarket = getMarketById(id);
            if (foundMarket) {
                setMarket(foundMarket);
            }
        }
    }, [id, getMarketById]);

    if (loading || !market) {
        return <LoadingShimmer />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-4 px-4 pb-24"
        >
            <div className="max-w-md mx-auto space-y-6">
                <MarketHeader market={market} />
                <PriceChart history={market.history} />
                <PositionSection marketId={market.id} />

                {market.status === 'open' && <TradePanel market={market} />}

                {/* Contract Links */}
                <div className="flex space-x-4">
                    <a
                        href={`https://tonscan.org/address/${market.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        View Contract
                    </a>
                    <a
                        href={`https://tonscan.org/address/oracle-${market.id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-3 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                        View Oracle
                    </a>
                </div>
            </div>
        </motion.div>
    );
};

export default MarketDetailPage;