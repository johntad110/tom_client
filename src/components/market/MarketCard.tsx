import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

type MarketCardProps = {
    market: {
        id: string;
        question: string;
        status: 'open' | 'closed' | 'resolving' | 'resolved';
        probability: number;
        totalLiquidity: number;
    };
};

const MarketCard = ({ market }: MarketCardProps) => {
    // Status color mapping
    const statusColors = {
        open: 'bg-blue-500/20 text-blue-300',
        closed: 'bg-gray-500/20 text-gray-300',
        resolving: 'bg-orange-500/20 text-orange-300',
        resolved: 'bg-gray-700/20 text-gray-400',
    };

    // Probability bar colors
    const yesWidth = `${market.probability}%`;
    const noWidth = `${100 - market.probability}%`;

    return (
        <motion.div
            whileHover={{ y: -5 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden"
        >
            <Link to={`/market-detail/${market.id}`}>
                <div className="p-4">
                    <div className="flex justify-between items-start">
                        <h3 className="font-bold text-lg mb-2">{market.question}</h3>
                        <span className={`text-xs px-2 py-1 rounded ${statusColors[market.status]}`}>
                            {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                        </span>
                    </div>

                    {/* Probability Bar */}
                    <div className="relative h-4 bg-white/10 rounded-full overflow-hidden mb-3">
                        <motion.div
                            className="absolute top-0 left-0 h-full bg-green-500/70"
                            initial={{ width: '0%' }}
                            animate={{ width: yesWidth }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xs font-bold text-white">
                                YES {market.probability}%
                            </span>
                        </motion.div>
                        <motion.div
                            className="absolute top-0 right-0 h-full bg-red-500/70"
                            initial={{ width: '0%' }}
                            animate={{ width: noWidth }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-bold text-white">
                                NO {100 - market.probability}%
                            </span>
                        </motion.div>
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <div className="text-sm">
                            <p className="text-white/70">Liquidity</p>
                            <p className="font-medium">{market.totalLiquidity.toLocaleString()} TON</p>
                        </div>
                        <div className="text-sm">
                            <p className="text-white/70">Status</p>
                            <p className="font-medium capitalize">{market.status}</p>
                        </div>
                    </div>
                </div>

                <div className="border-t border-white/10 p-3 bg-white/5">
                    <button className="w-full py-2 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg transition-colors">
                        {market.status === 'open' ? 'Trade' : 'View'}
                    </button>
                </div>
            </Link>
        </motion.div>
    );
};

export default MarketCard;