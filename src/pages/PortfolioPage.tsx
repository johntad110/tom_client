import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/userStore';
import LoadingShimmer from '../components/portfolio/LoadingShimmer';
import PortfolioSummary from '../components/portfolio/PortfolioSummary';
import PositionFilters from '../components/portfolio/PositionFilters';
import PositionList from '../components/portfolio/PositionList';
import PositionDetailModal from '../components/portfolio/PositionDetailModal';

import type { Position, PortfolioSummary as PortfolioSummaryProps } from '../types/portfolio';

const PortfolioPage = () => {
    const { isConnected } = useUserStore();
    const [activeFilter, setActiveFilter] = useState<'active' | 'resolved'>('active');
    const [selectedPosition, setSelectedPosition] = useState<Position | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Mock data - will come from API in prod
    const mockSummary: PortfolioSummaryProps = {
        totalValue: 245.78,
        unrealizedProfit: 32.45,
        realizedProfit: 87.32,
        activePositions: 8,
        resolvedPositions: 16
    };

    const mockPositions: Position[] = [
        {
            id: "1",
            marketId: "m1",
            question: "Will Bitcoin reach $100K by end of 2024?",
            outcome: "YES",
            shares: 15.2,
            averagePrice: 0.65,
            currentValue: 0.82,
            profitLoss: 2.58,
            status: "open"
        },
        {
            id: "2",
            marketId: "m2",
            question: "Will Ethereum transition to PoS by June 2023?",
            outcome: "YES",
            shares: 8.5,
            averagePrice: 0.45,
            currentValue: 1.00,
            profitLoss: 4.68,
            status: "resolved",
            resolvedOutcome: "YES",
            resolutionDate: "2023-06-15"
        },
        {
            id: "3",
            marketId: "m3",
            question: "Will TON become top 10 crypto by market cap?",
            outcome: "NO",
            shares: 22.1,
            averagePrice: 0.32,
            currentValue: 0.18,
            profitLoss: -3.10,
            status: "open"
        },
        {
            id: "4",
            marketId: "m4",
            question: "Will the Fed cut rates before July 2023?",
            outcome: "NO",
            shares: 12.7,
            averagePrice: 0.55,
            currentValue: 0.05,
            profitLoss: -6.35,
            status: "resolving"
        }
    ];

    // Simulate loading
    setTimeout(() => setIsLoading(false), 1500);

    if (isLoading) {
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
                        <PortfolioSummary summary={mockSummary} />

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
                                positions={mockPositions.filter(p =>
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
                        <button className="bg-blue-500/20 hover:bg-blue-500/30 px-6 py-3 rounded-xl transition-colors">
                            Connect Wallet
                        </button>
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