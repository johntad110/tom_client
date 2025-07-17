import { motion } from 'framer-motion';
import { ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/solid';
import type { PortfolioSummary as PortfolioSummaryType  } from '../../types/portfolio';

type PortfolioSummaryProps = {
    summary: PortfolioSummaryType;
};

const PortfolioSummary = ({ summary }: PortfolioSummaryProps) => {
    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl"
        >
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h2 className="text-xl font-bold">Portfolio Value</h2>
                    <p className="text-3xl font-bold mt-2">{summary.totalValue.toFixed(2)} TON</p>
                </div>

                <div className="flex items-center space-x-2">
                    <span className={`text-sm px-2 py-1 rounded-lg ${summary.unrealizedProfit >= 0
                            ? 'bg-green-500/20 text-green-300'
                            : 'bg-red-500/20 text-red-300'
                        }`}>
                        {summary.unrealizedProfit >= 0 ? '+' : ''}
                        {summary.unrealizedProfit.toFixed(2)} TON
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Unrealized P&L</p>
                    <div className="flex items-center">
                        {summary.unrealizedProfit >= 0 ? (
                            <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 mr-1" />
                        ) : (
                            <ArrowTrendingDownIcon className="h-5 w-5 text-red-400 mr-1" />
                        )}
                        <span className={summary.unrealizedProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {summary.unrealizedProfit >= 0 ? '+' : ''}
                            {summary.unrealizedProfit.toFixed(2)} TON
                        </span>
                    </div>
                </div>

                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Realized P&L</p>
                    <div className="flex items-center">
                        {summary.realizedProfit >= 0 ? (
                            <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 mr-1" />
                        ) : (
                            <ArrowTrendingDownIcon className="h-5 w-5 text-red-400 mr-1" />
                        )}
                        <span className={summary.realizedProfit >= 0 ? 'text-green-400' : 'text-red-400'}>
                            {summary.realizedProfit >= 0 ? '+' : ''}
                            {summary.realizedProfit.toFixed(2)} TON
                        </span>
                    </div>
                </div>

                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Active Positions</p>
                    <p className="text-xl font-bold text-blue-300">{summary.activePositions}</p>
                </div>

                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Resolved</p>
                    <p className="text-xl font-bold text-purple-300">{summary.resolvedPositions}</p>
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioSummary;