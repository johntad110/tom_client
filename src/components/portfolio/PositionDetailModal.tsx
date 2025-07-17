import { motion, AnimatePresence } from 'framer-motion';
import { XMarkIcon, ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';
import type { Position } from '../../types/portfolio';

type PositionDetailModalProps = {
    position: Position;
    onClose: () => void;
};

const PositionDetailModal = ({ position, onClose }: PositionDetailModalProps) => {
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
                    <div className="p-6">
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
                                    <span className={`text-xs px-2 py-1 rounded ${position.outcome === 'YES'
                                        ? 'bg-green-500/20 text-green-300'
                                        : 'bg-red-500/20 text-red-300'
                                        }`}>
                                        {position.outcome}
                                    </span>
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
                            <div className="bg-black/30 p-4 rounded-lg">
                                <p className="text-sm text-white/70 mb-1">Shares</p>
                                <p className="text-xl font-bold">{position.shares.toFixed(2)}</p>
                            </div>

                            <div className="bg-black/30 p-4 rounded-lg">
                                <p className="text-sm text-white/70 mb-1">Avg. Price</p>
                                <p className="text-xl font-bold">{position.averagePrice.toFixed(3)}</p>
                            </div>

                            <div className="bg-black/30 p-4 rounded-lg">
                                <p className="text-sm text-white/70 mb-1">Current Value</p>
                                <p className="text-xl font-bold">{position.currentValue.toFixed(3)}</p>
                            </div>

                            <div className={`p-4 rounded-lg ${position.profitLoss >= 0
                                ? 'bg-green-500/20 text-green-300'
                                : 'bg-red-500/20 text-red-300'
                                }`}>
                                <p className="text-sm mb-1">Profit/Loss</p>
                                <p className="text-xl font-bold">
                                    {position.profitLoss >= 0 ? '+' : ''}
                                    {position.profitLoss.toFixed(2)} TON
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
                                        Resolved on: {position.resolutionDate}
                                    </p>
                                )}
                            </div>
                        )}

                        <div className="flex space-x-3">
                            <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 py-3 rounded-lg transition-colors">
                                Trade
                            </button>
                            <button className="flex-1 bg-white/10 hover:bg-white/20 py-3 rounded-lg transition-colors flex items-center justify-center">
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