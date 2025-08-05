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

    const hasYesPosition = position.yesShares > 0;
    const hasNoPosition = position.noShares > 0;
    const totalProfitLoss = (position.yesProfitLoss || 0) + (position.noProfitLoss || 0);

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
                        {hasYesPosition && (
                            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-300">
                                YES
                            </span>
                        )}
                        {hasNoPosition && (
                            <span className="text-xs px-2 py-1 rounded bg-red-500/20 text-red-300">
                                NO
                            </span>
                        )}
                    </div>

                    <h3 className="font-bold truncate">{position.question}</h3>
                </div>

                <div className={`text-right ${totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    <p className="font-bold">
                        {totalProfitLoss >= 0 ? '+' : ''}
                        {totalProfitLoss.toFixed(2)} TON
                    </p>
                    <p className="text-xs">
                        {hasYesPosition && `${position.yesShares.toFixed(2)} YES`}
                        {hasYesPosition && hasNoPosition && ' • '}
                        {hasNoPosition && `${position.noShares.toFixed(2)} NO`}
                    </p>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-white/70">
                {hasYesPosition && (
                    <div>
                        <p>YES Avg. Price</p>
                        <p className="text-white">
                            {position.yesAveragePrice?.toFixed(3) || 'N/A'}
                        </p>
                        <p className="text-xs mt-1">
                            <span className={position.yesProfitLoss && position.yesProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {position.yesProfitLoss && position.yesProfitLoss >= 0 ? '+' : ''}
                                {position.yesProfitLoss?.toFixed(2) || '0.00'} TON
                            </span>
                        </p>
                    </div>
                )}

                {hasNoPosition && (
                    <div>
                        <p>NO Avg. Price</p>
                        <p className="text-white">
                            {position.noAveragePrice?.toFixed(3) || 'N/A'}
                        </p>
                        <p className="text-xs mt-1">
                            <span className={position.noProfitLoss && position.noProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}>
                                {position.noProfitLoss && position.noProfitLoss >= 0 ? '+' : ''}
                                {position.noProfitLoss?.toFixed(2) || '0.00'} TON
                            </span>
                        </p>
                    </div>
                )}

                {hasYesPosition && (
                    <div>
                        <p>YES Current Value</p>
                        <p className="text-white">
                            {position.currentYesValue?.toFixed(3) || 'N/A'}
                        </p>
                    </div>
                )}

                {hasNoPosition && (
                    <div>
                        <p>NO Current Value</p>
                        <p className="text-white">
                            {position.currentNoValue?.toFixed(3) || 'N/A'}
                        </p>
                    </div>
                )}
            </div>

            {position.status === 'resolved' && position.resolvedOutcome && (
                <div className="mt-3 pt-3 border-t border-white/10">
                    <p className="text-sm">
                        Resolved: <span className="font-medium">{position.resolvedOutcome}</span>
                    </p>
                    {position.resolutionDate && (
                        <p className="text-xs text-white/60">
                            {new Date(position.resolutionDate).toLocaleDateString()}
                        </p>
                    )}
                </div>
            )}
        </motion.div>
    );
};

export default PositionCard;