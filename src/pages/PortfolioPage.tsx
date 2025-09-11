import { useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/userStore';
import { WalletConnectButton } from '../components/WalletConnectButton';
import { userPositionStore } from '../stores/positionStore';
import { useTonClient } from '../hooks/useTonClient';
import { Address } from '@ton/core';
import { useMarketStore } from '../stores/marketStore';
import { useTelegramStore } from '../stores/telegramStore';
import { ChartBarIcon, CurrencyDollarIcon, ArrowTrendingUpIcon, ArrowTrendingDownIcon } from '@heroicons/react/24/outline';
import { ScaleLoader } from 'react-spinners';

const PortfolioPage = () => {
    const { isConnected, walletAddress } = useUserStore();
    const { positions, loading, fetchAllPositions } = userPositionStore();
    const { markets, getMarketById } = useMarketStore();
    const client = useTonClient();
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    useEffect(() => {
        if (isConnected && client && walletAddress) {
            const address = Address.parse(walletAddress);
            fetchAllPositions(client, address);
        }
    }, [isConnected, client, walletAddress]);

    // Calculate portfolio summary
    const portfolioSummary = useMemo(() => {
        let totalValue = 0;
        let totalInvested = 0;
        let activePositions = 0;
        let totalProfitLoss = 0;

        Object.entries(positions).forEach(([marketId, position]) => {
            const market = getMarketById(marketId);
            if (!market || !position.data) return;

            const yesShares = position.data.yes || 0;
            const noShares = position.data.no || 0;

            if (yesShares > 0 || noShares > 0) {
                activePositions++;

                const yesValue = yesShares * market.probabilities.yes;
                const noValue = noShares * market.probabilities.no;
                const positionValue = yesValue + noValue;

                totalValue += positionValue;

                // For simplicity, assuming average cost basis (this would need actual trade history - future to-do)
                const estimatedCost = positionValue * 0.8; // Placeholder
                totalInvested += estimatedCost;
                totalProfitLoss += (positionValue - estimatedCost);
            }
        });

        return {
            totalValue,
            totalInvested,
            activePositions,
            totalProfitLoss,
            profitLossPercentage: totalInvested > 0 ? (totalProfitLoss / totalInvested) * 100 : 0
        };
    }, [positions, markets, getMarketById]);

    // Get positions with market data
    const portfolioPositions = useMemo(() => {
        return Object.entries(positions)
            .map(([marketId, position]) => {
                const market = getMarketById(marketId);
                if (!market || !position.data) return null;

                const yesShares = position.data.yes || 0;
                const noShares = position.data.no || 0;
                const hasPosition = yesShares > 0 || noShares > 0;

                if (!hasPosition) return null;

                const yesValue = yesShares * market.probabilities.yes;
                const noValue = noShares * market.probabilities.no;
                const totalValue = yesValue + noValue;

                return {
                    market,
                    yesShares,
                    noShares,
                    yesValue,
                    noValue,
                    totalValue,
                    marketId
                };
            })
            .filter(Boolean)
            .sort((a, b) => b!.totalValue - a!.totalValue);
    }, [positions, markets, getMarketById]);

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="min-h-screen flex items-center justify-center"
                style={{ backgroundColor: theme?.bg_color }}
            >
                <div className="text-center">
                    <ScaleLoader color={theme?.text_color} />
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen px-4 pb-24"
            style={{ backgroundColor: theme?.bg_color }}
        >
            <div className="max-w-md mx-auto space-y-6 pt-6">
                {isConnected ? (
                    <>
                        {/* Portfolio Header */}
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold mb-2" style={{ color: theme?.text_color }}>
                                Portfolio
                            </h1>
                            <p className="text-sm opacity-70" style={{ color: theme?.hint_color }}>
                                Your prediction market investments
                            </p>
                        </div>

                        {/* Portfolio Summary */}
                        {portfolioSummary.activePositions > 0 ? (
                            <div className="space-y-6">
                                {/* Total Value Card */}
                                <div className="p-6 rounded-2xl text-center"
                                    style={{ backgroundColor: theme?.secondary_bg_color }}>
                                    <p className="text-sm mb-2" style={{ color: theme?.hint_color }}>Total Value</p>
                                    <p className="text-3xl font-bold" style={{ color: theme?.text_color }}>
                                        {portfolioSummary.totalValue.toFixed(2)} TON
                                    </p>

                                    <div className="flex items-center justify-center mt-3">
                                        {portfolioSummary.totalProfitLoss >= 0 ? (
                                            <ArrowTrendingUpIcon className="w-5 h-5 text-green-400 mr-1" />
                                        ) : (
                                            <ArrowTrendingDownIcon className="w-5 h-5 text-red-400 mr-1" />
                                        )}
                                        <span className={`text-sm ${portfolioSummary.totalProfitLoss >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                            {portfolioSummary.totalProfitLoss >= 0 ? '+' : ''}
                                            {portfolioSummary.totalProfitLoss.toFixed(2)} TON
                                            {' '}({portfolioSummary.profitLossPercentage.toFixed(1)}%)
                                        </span>
                                    </div>
                                </div>

                                {/* Stats Overview */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 rounded-xl text-center"
                                        style={{ backgroundColor: theme?.secondary_bg_color }}>
                                        <ChartBarIcon className="w-6 h-6 mx-auto mb-2" style={{ color: theme?.hint_color }} />
                                        <p className="text-sm" style={{ color: theme?.hint_color }}>Positions</p>
                                        <p className="text-lg font-semibold" style={{ color: theme?.text_color }}>
                                            {portfolioSummary.activePositions}
                                        </p>
                                    </div>

                                    <div className="p-4 rounded-xl text-center"
                                        style={{ backgroundColor: theme?.secondary_bg_color }}>
                                        <CurrencyDollarIcon className="w-6 h-6 mx-auto mb-2" style={{ color: theme?.hint_color }} />
                                        <p className="text-sm" style={{ color: theme?.hint_color }}>Invested</p>
                                        <p className="text-lg font-semibold" style={{ color: theme?.text_color }}>
                                            {portfolioSummary.totalInvested.toFixed(2)} TON
                                        </p>
                                    </div>
                                </div>

                                {/* Positions List */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4" style={{ color: theme?.text_color }}>
                                        Your Positions ({portfolioPositions.length})
                                    </h3>

                                    <div className="space-y-3">
                                        {portfolioPositions.map((position, index) => (
                                            <motion.div
                                                key={position!.marketId}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                className="p-4 rounded-xl"
                                                style={{ backgroundColor: theme?.secondary_bg_color }}
                                            >
                                                <div className="flex justify-between items-start mb-3">
                                                    <h4 className="font-medium text-sm" style={{ color: theme?.text_color }}>
                                                        {position!.market.question}
                                                    </h4>
                                                    <span className="text-sm font-semibold" style={{ color: theme?.text_color }}>
                                                        {position!.totalValue.toFixed(2)} TON
                                                    </span>
                                                </div>

                                                <div className="grid grid-cols-2 gap-3 text-xs">
                                                    {position!.yesShares > 0 && (
                                                        <div className="text-center p-2 rounded-lg bg-green-500/20">
                                                            <p className="text-green-500 font-medium">YES</p>
                                                            <p className="text-white">{position!.yesShares.toFixed(2)} shares</p>
                                                            <p className="text-green-500">{position!.yesValue.toFixed(2)} TON</p>
                                                        </div>
                                                    )}

                                                    {position!.noShares > 0 && (
                                                        <div className="text-center p-2 rounded-lg bg-red-500/20">
                                                            <p className="text-red-600 font-medium">NO</p>
                                                            <p className="text-white">{position!.noShares.toFixed(2)} shares</p>
                                                            <p className="text-red-600">{position!.noValue.toFixed(2)} TON</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mt-3 pt-3 border-t border-white/10">
                                                    <p className="text-xs text-center" style={{ color: theme?.hint_color }}>
                                                        {position!.market.probability.toFixed(1)}% chance YES
                                                    </p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Empty Portfolio State */
                            <div className="text-center py-16">
                                <CurrencyDollarIcon className="w-16 h-16 mx-auto mb-4 opacity-50" style={{ color: theme?.text_color }} />
                                <h3 className="text-lg font-semibold mb-2" style={{ color: theme?.text_color }}>
                                    No positions yet
                                </h3>
                                <p className="text-sm opacity-70 mb-6" style={{ color: theme?.hint_color }}>
                                    Start trading to build your portfolio
                                </p>
                            </div>
                        )}
                    </>
                ) : (
                    /* Wallet Not Connected State */
                    <div className="text-center py-16">
                        <div className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: theme?.secondary_bg_color }}>
                            <CurrencyDollarIcon className="w-10 h-10" style={{ color: theme?.button_color }} />
                        </div>
                        <h3 className="text-lg font-semibold mb-2" style={{ color: theme?.text_color }}>
                            Connect Your Wallet
                        </h3>
                        <p className="text-sm opacity-70 mb-6" style={{ color: theme?.hint_color }}>
                            Connect your TON wallet to view your portfolio and trading positions
                        </p>
                        <WalletConnectButton />
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default PortfolioPage;