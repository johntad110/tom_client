import { motion } from 'framer-motion';
import { useTelegramStore } from '../../stores/telegramStore';
import type { Market } from '../../types/market';
import { ClockIcon, ChartBarIcon, UsersIcon, CurrencyDollarIcon, CalendarIcon, UserIcon } from '@heroicons/react/24/outline';

const OverviewSection = ({ market }: { market: Market }) => {
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    const formatDate = (timestamp: number) => {
        return new Date(timestamp * 1000).toLocaleDateString();
    };

    const formatNumber = (num: number) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toFixed(2);
    };

    const getStatusColor = (status: Market['status']) => {
        switch (status) {
            case 'open': return 'text-green-400';
            case 'resolving': return 'text-yellow-400';
            case 'resolved': return 'text-blue-400';
            case 'closed': return 'text-red-400';
            default: return 'text-gray-400';
        }
    };

    const getStatusText = (status: Market['status']) => {
        switch (status) {
            case 'open': return 'Trading Active';
            case 'closed': return 'Trading Closed';
            case 'resolved': return 'Resolved';
            case 'resolving': return 'Resolving';
            default: return 'Unknown';
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4"
            style={{ backgroundColor: theme?.bg_color }}
        >
            <h3
                className="mb-4 text-sm font-bold"
                style={{ color: theme?.accent_text_color }}
            >
                Market Overview
            </h3>

            <div className="space-y-4">
                {/* Market Status */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                    <div className="flex items-center">
                        <ChartBarIcon className="w-4 h-4 mr-2" style={{ color: theme?.hint_color }} />
                        <span className="text-sm" style={{ color: theme?.hint_color }}>Status</span>
                    </div>
                    <span className={`text-sm font-medium ${getStatusColor(market.status)}`}>
                        {getStatusText(market.status)}
                    </span>
                </div>

                {/* Current Probability */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                    <div className="flex items-center">
                        <ClockIcon className="w-4 h-4 mr-2" style={{ color: theme?.hint_color }} />
                        <span className="text-sm" style={{ color: theme?.hint_color }}>Yes Chance</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: theme?.text_color }}>
                        {market.probability.toFixed(1)}%
                    </span>
                </div>

                {/* Liquidity Pool */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                    <div className="flex items-center">
                        <CurrencyDollarIcon className="w-4 h-4 mr-2" style={{ color: theme?.hint_color }} />
                        <span className="text-sm" style={{ color: theme?.hint_color }}>Liquidity</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: theme?.text_color }}>
                        {formatNumber(market.totalLiquidity)} TON
                    </span>
                </div>

                {/* Trading Volume */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                    <div className="flex items-center">
                        <UsersIcon className="w-4 h-4 mr-2" style={{ color: theme?.hint_color }} />
                        <span className="text-sm" style={{ color: theme?.hint_color }}>Volume</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: theme?.text_color }}>
                        {formatNumber(market.totalVolume)} TON
                    </span>
                </div>

                {/* Resolution Date */}
                {market.closeTimestamp && (
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                        <div className="flex items-center">
                            <CalendarIcon className="w-4 h-4 mr-2" style={{ color: theme?.hint_color }} />
                            <span className="text-sm" style={{ color: theme?.hint_color }}>Closes</span>
                        </div>
                        <span className="text-sm font-medium" style={{ color: theme?.text_color }}>
                            {formatDate(market.closeTimestamp)}
                        </span>
                    </div>
                )}

                {/* Creator Info */}
                {market.creator && (
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                        <div className="flex items-center">
                            <UserIcon className="w-4 h-4 mr-2" style={{ color: theme?.hint_color }} />
                            <span className="text-sm" style={{ color: theme?.hint_color }}>Creator</span>
                        </div>
                        <span className="text-sm font-medium" style={{ color: theme?.text_color }}>
                            {market.createdBy || market.askedBy || 'Unknown'}
                        </span>
                    </div>
                )}

                {/* Trading Fee */}
                <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                    <div className="flex items-center">
                        <CurrencyDollarIcon className="w-4 h-4 mr-2" style={{ color: theme?.hint_color }} />
                        <span className="text-sm" style={{ color: theme?.hint_color }}>Trading Fee</span>
                    </div>
                    <span className="text-sm font-medium" style={{ color: theme?.text_color }}>
                        {(market.feeBps / 100).toFixed(2)}%
                    </span>
                </div>

                {/* Resolution Outcome (if resolved) */}
                {market.resolved && market.resolvedOutcome && (
                    <div className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                        <div className="flex items-center">
                            <ChartBarIcon className="w-4 h-4 mr-2" style={{ color: theme?.hint_color }} />
                            <span className="text-sm" style={{ color: theme?.hint_color }}>Result</span>
                        </div>
                        <span className={`text-sm font-medium ${
                            market.resolvedOutcome === 'YES' ? 'text-green-400' : 
                            market.resolvedOutcome === 'NO' ? 'text-red-400' : 
                            'text-yellow-400'
                        }`}>
                            {market.resolvedOutcome}
                        </span>
                    </div>
                )}
            </div>

            {/* Market Description */}
            {market.description && (
                <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                    <h4 className="text-sm font-medium mb-2" style={{ color: theme?.hint_color }}>Description</h4>
                    <p className="text-sm" style={{ color: theme?.text_color }}>
                        {market.description}
                    </p>
                </div>
            )}
        </motion.div>
    );
};

export default OverviewSection;