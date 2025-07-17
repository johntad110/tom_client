import { motion } from 'framer-motion';
import ProbabilityBar from './ProbabilityBar';

type MarketHeaderProps = {
    market: {
        id: string;
        question: string;
        description: string;
        status: 'open' | 'closed' | 'resolving' | 'resolved';
        probability: number;
        totalLiquidity: number;
        volume: number;
        created: string;
        resolutionDate?: string;
        resolvedOutcome?: 'YES' | 'NO' | 'INVALID';
    };
};

const MarketHeader = ({ market }: MarketHeaderProps) => {
    const statusColors = {
        open: 'bg-blue-500/20 text-blue-300',
        closed: 'bg-gray-500/20 text-gray-300',
        resolving: 'bg-orange-500/20 text-orange-300',
        resolved: 'bg-gray-700/20 text-gray-400',
    };

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        >
            <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl font-bold">{market.question}</h1>
                <span className={`text-sm px-3 py-1 rounded-full ${statusColors[market.status]}`}>
                    {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                </span>
            </div>

            {market.description && (
                <p className="text-white/70 mb-4">{market.description}</p>
            )}

            <ProbabilityBar probability={market.probability} />

            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Liquidity</p>
                    <p className="text-xl font-bold">{market.totalLiquidity.toLocaleString()} TON</p>
                </div>
                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Volume</p>
                    <p className="text-xl font-bold">{market.volume.toLocaleString()} TON</p>
                </div>
            </div>

            {market.resolutionDate && (
                <div className="mt-4 text-sm">
                    <p className="text-white/70">Resolution Date</p>
                    <p className="text-white">{market.resolutionDate}</p>
                </div>
            )}
        </motion.div>
    );
};

export default MarketHeader;