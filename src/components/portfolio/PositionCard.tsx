import { motion } from 'framer-motion';
import type { Position } from '../../types/portfolio';

type PositionCardProps = {
    position: Position;
    onClick: () => void;
};

const PositionCard = ({ position, onClick }: PositionCardProps) => {
    // Determine status colors based on our palette
    const statusColors = {
        open: 'bg-blue-500/20 text-blue-300',
        resolving: 'bg-orange-500/20 text-orange-300',
        resolved: 'bg-gray-500/20 text-gray-300',
        closed: 'bg-gray-700/20 text-gray-400'
    };

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 shadow-lg cursor-pointer"
            onClick={onClick}
        >
            <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-2">
                        <span className={`text-xs px-2 py-1 rounded ${statusColors[position.status]}`}>
                            {position.status.charAt(0).toUpperCase() + position.status.slice(1)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded ${position.outcome === 'YES'
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                            }`}>
                            {position.outcome}
                        </span>
                    </div>

                    <h3 className="font-bold truncate">{position.question}</h3>
                </div>

                <div className={`text-right ${position.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <p className="font-bold">
                        {position.profitLoss >= 0 ? '+' : ''}
                        {position.profitLoss.toFixed(2)} TON
                    </p>
                    <p className="text-xs">
                        {position.shares.toFixed(2)} shares
                    </p>
                </div>
            </div>

            <div className="mt-4 flex justify-between text-sm text-white/70">
                <div>
                    <p>Avg. Price</p>
                    <p className="text-white">{position.averagePrice.toFixed(3)}</p>
                </div>
                <div className="text-right">
                    <p>Current Value</p>
                    <p className="text-white">{position.currentValue.toFixed(3)}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default PositionCard;