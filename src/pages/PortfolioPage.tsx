import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/userStore';
import LoadingShimmer from '../components/portfolio/LoadingShimmer';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';
import PositionFilters from '../components/portfolio/PositionFilters';
import PositionList from '../components/portfolio/PositionList';
import PositionDetailModal from '../components/portfolio/PositionDetailModal';
import { WalletConnectButton } from '../components/WalletConnectButton';
import { userPositionStore } from '../stores/positionStore';
import { useTonClient } from '../hooks/useTonClient';
import { Address } from '@ton/core';
import { useMarketStore } from '../stores/marketStore';
import type { Position, PortfolioSummary as PortfolioSummaryProps } from '../types/portfolio';

const PortfolioPage = () => {
    const { isConnected, walletAddress } = useUserStore();
    const { positions, loading, fetchAllPositions } = userPositionStore();
    const { getMarketById } = useMarketStore();
    const client = useTonClient();

    const [activeFilter, setActiveFilter] = useState<'active' | 'resolved'>('active');
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);

    useEffect(() => {
        if (isConnected && client && walletAddress) {
            const address = Address.parse(walletAddress);
            fetchAllPositions(client, address);
        }
    }, [isConnected, client, walletAddress]);

    // Transform position data for UI
    const transformedPositions = Object.entries(positions).map(([marketId, position]) => {
        const market = getMarketById(marketId);
        const hasYes = position.data.yes && position.data.yes > 0;
        const hasNo = position.data.no && position.data.no > 0;

        return {
            id: marketId,
            marketId,
            question: market?.question || `Market no ${marketId}`,
            yesShares: position.data.yes || 0,
            noShares: position.data.no || 0,
            status: market?.status || 'open',
            // These would be calculated based on market state
            currentYesValue: hasYes ? 0.65 : undefined,
            currentNoValue: hasNo ? 0.35 : undefined,
            yesProfitLoss: hasYes ? 12.5 : undefined,
            noProfitLoss: hasNo ? -5.2 : undefined,
            resolvedOutcome: market?.resolvedOutcome,
            resolutionDate: market?.resolutionDate
        } as Position;
    });

    // Calculate summary data
    const portfolioSummary: PortfolioSummaryProps = {
        totalValue: transformedPositions.reduce((sum, p) => {
            return sum +
                (p.yesShares * (p.currentYesValue || 0)) +
                (p.noShares * (p.currentNoValue || 0));
        }, 0),
        unrealizedProfit: transformedPositions.reduce((sum, p) => {
            return sum +
                (p.yesProfitLoss || 0) +
                (p.noProfitLoss || 0);
        }, 0),
        realizedProfit: transformedPositions
            .filter(p => p.status === 'resolved')
            .reduce((sum, p) => sum + (p.yesProfitLoss || 0) + (p.noProfitLoss || 0), 0),
        activePositions: transformedPositions.filter(p => p.status !== 'resolved').length,
        resolvedPositions: transformedPositions.filter(p => p.status === 'resolved').length
    };

    if (loading) {
        return <LoadingShimmer />;
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-6 px-4 pb-24"
        >
            <div className="max-w-md mx-auto space-y-6">
                {isConnected ? (
                    <>
                        <PortfolioSummary summary={portfolioSummary} />

                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            className="space-y-6"
                        >
                            <PositionFilters
                                activeFilter={activeFilter}
                                setActiveFilter={setActiveFilter}
                            />

                            <PositionList
                                positions={transformedPositions.filter(p =>
                                    activeFilter === 'active'
                                        ? p.status !== 'resolved'
                                        : p.status === 'resolved'
                                )}
                                onSelect={setSelectedPosition}
                            />
                        </motion.div>
                    </>
                ) : (
                    <div className="text-center py-12">
                        <h3 className="text-xl font-bold mb-4">Connect Your Wallet</h3>
                        <p className="text-white/70 mb-6">
                            Connect your TON wallet to view your portfolio and trading positions
                        </p>
                        <WalletConnectButton />
                    </div>
                )}
            </div>

            {selectedPosition && (
                <PositionDetailModal
                    position={selectedPosition}
                    onClose={() => setSelectedPosition(null)}
                />
            )}
        </motion.div>
    );
};

export default PortfolioPage;