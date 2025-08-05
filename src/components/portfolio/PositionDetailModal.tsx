import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import type { Position } from '../../types/portfolio';

type PositionDetailModalProps = {
    position: Position;
    onClose: () => void;
};

const PositionDetailModal = ({ position, onClose }: PositionDetailModalProps) => {
    const hasYesPosition = position.yesShares > 0;
    const hasNoPosition = position.noShares > 0;
    const totalProfitLoss = (position.yesProfitLoss || 0) + (position.noProfitLoss || 0);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, y: 20 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-gray-800/90 backdrop-blur-lg rounded-2xl w-full max-w-md border border-white/20 shadow-xl overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    <div className="p-6 h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h2 className="text-xl font-bold">Position Details</h2>
                                <div className="flex items-center space-x-2 mt-2">
                                    <span className={`text-xs px-2 py-1 rounded ${position.status === 'open' ? 'bg-blue-500/20 text-blue-300' :
                                        position.status === 'resolving' ? 'bg-orange-500/20 text-orange-300' :
                                            position.status === 'resolved' ? 'bg-gray-500/20 text-gray-300' :
                                                'bg-gray-700/20 text-gray-400'
                                        }`}>
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
                            </div>
                            <button
                                onClick={onClose}
                                className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors"
                            >
                                <XMarkIcon className="h-5 w-5" />
                            </button>
                        </div>

                        <h3 className="text-lg font-semibold mb-4">{position.question}</h3>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                            {/* YES Position Stats */}
                            {hasYesPosition && (
                                <>
                                    <div className="bg-green-900/10 p-4 rounded-lg">
                                        <p className="text-sm text-white/70 mb-1">YES Shares</p>
                                        <p className="text-xl font-bold">{position.yesShares.toFixed(2)}</p>
                                    </div>

                                    <div className="bg-green-900/10 p-4 rounded-lg">
                                        <p className="text-sm text-white/70 mb-1">YES Avg. Price</p>
                                        <p className="text-xl font-bold">
                                            {position.yesAveragePrice?.toFixed(3) || 'N/A'}
                                        </p>
                                    </div>

                                    <div className="bg-green-900/10 p-4 rounded-lg">
                                        <p className="text-sm text-white/70 mb-1">YES Current Value</p>
                                        <p className="text-xl font-bold">
                                            {position.currentYesValue?.toFixed(3) || 'N/A'}
                                        </p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${(position.yesProfitLoss || 0) >= 0
                                        ? 'bg-green-500/20 text-green-300'
                                        : 'bg-red-500/20 text-red-300'
                                        }`}>
                                        <p className="text-sm mb-1">YES Profit/Loss</p>
                                        <p className="text-xl font-bold">
                                            {(position.yesProfitLoss || 0) >= 0 ? '+' : ''}
                                            {(position.yesProfitLoss || 0).toFixed(2)} TON
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* NO Position Stats */}
                            {hasNoPosition && (
                                <>
                                    <div className="bg-red-900/10 p-4 rounded-lg">
                                        <p className="text-sm text-white/70 mb-1">NO Shares</p>
                                        <p className="text-xl font-bold">{position.noShares.toFixed(2)}</p>
                                    </div>

                                    <div className="bg-red-900/10 p-4 rounded-lg">
                                        <p className="text-sm text-white/70 mb-1">NO Avg. Price</p>
                                        <p className="text-xl font-bold">
                                            {position.noAveragePrice?.toFixed(3) || 'N/A'}
                                        </p>
                                    </div>

                                    <div className="bg-red-900/10 p-4 rounded-lg">
                                        <p className="text-sm text-white/70 mb-1">NO Current Value</p>
                                        <p className="text-xl font-bold">
                                            {position.currentNoValue?.toFixed(3) || 'N/A'}
                                        </p>
                                    </div>

                                    <div className={`p-4 rounded-lg ${(position.noProfitLoss || 0) >= 0
                                        ? 'bg-green-500/20 text-green-300'
                                        : 'bg-red-500/20 text-red-300'
                                        }`}>
                                        <p className="text-sm mb-1">NO Profit/Loss</p>
                                        <p className="text-xl font-bold">
                                            {(position.noProfitLoss || 0) >= 0 ? '+' : ''}
                                            {(position.noProfitLoss || 0).toFixed(2)} TON
                                        </p>
                                    </div>
                                </>
                            )}

                            {/* Combined Stats */}
                            <div className="bg-black/30 p-4 rounded-lg col-span-2">
                                <p className="text-sm text-white/70 mb-1">Total Value</p>
                                <p className="text-xl font-bold">
                                    {(
                                        (position.currentYesValue || 0) * position.yesShares +
                                        (position.currentNoValue || 0) * position.noShares
                                    ).toFixed(2)} TON
                                </p>
                            </div>

                            <div className={`p-4 rounded-lg col-span-2 ${totalProfitLoss >= 0
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-red-500/20 text-red-300'
                                }`}>
                                <p className="text-sm mb-1">Total Profit/Loss</p>
                                <p className="text-xl font-bold">
                                    {totalProfitLoss >= 0 ? '+' : ''}
                                    {totalProfitLoss.toFixed(2)} TON
                                </p>
                            </div>
                        </div>

                        {position.status === 'resolved' && (
                            <div className="bg-black/30 p-4 rounded-lg mb-6">
                                <p className="text-sm text-white/70 mb-1">Resolution</p>
                                <p className="text-lg font-semibold">
                                    Market resolved as:
                                    <span className={`ml-2 ${position.resolvedOutcome === 'YES'
                                        ? 'text-green-400'
                                        : position.resolvedOutcome === 'NO'
                                            ? 'text-red-400'
                                            : 'text-orange-400'
                                        }`}>
                                        {position.resolvedOutcome || 'N/A'}
                                    </span>
                                </p>
                                {position.resolutionDate && (
                                    <p className="text-sm text-white/70 mt-2">
                                        Resolved on: {new Date(position.resolutionDate).toLocaleDateString()}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex space-x-3">
                            <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 py-3 rounded-lg transition-colors">
                                Trade
                            </button>
                            <button className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-lg transition-colors flex items-center justify-center text-sm">
                                <span>View Market</span>
                                <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-1" />
                            </button>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
};

export default PositionDetailModal;