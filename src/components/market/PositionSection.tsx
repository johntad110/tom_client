import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/userStore';
import { WalletConnectButton } from '../WalletConnectButton';
import { userPositionStore } from '../../stores/positionStore';
import { useFactoryStore } from '../../stores/factoryStore';
import { useEffect, useMemo } from 'react';
import { Address } from '@ton/core';
import { useMarketContract } from '../../hooks/useMarketContract';
import { useTonClient } from '../../hooks/useTonClient';


const PositionSection = ({ marketId }: { marketId: string }) => {
    const { isConnected, walletAddress } = useUserStore();
    const { marketAddresses } = useFactoryStore();
    const { marketState } = useMarketContract({ addr: marketAddresses[Number(marketId)] });
    const { positions, loading, fetchPositions } = userPositionStore();
    const client = useTonClient();

    useEffect(() => {
        if (walletAddress && client) {
            fetchPositions(client, marketId, Address.parse(walletAddress), Address.parse(marketAddresses[Number(marketId)]))
        }
    }, [marketId, walletAddress, client])

    const { yesValue, noValue } = useMemo(() => {
        const defaultValues = {
            yesValue: 0,
            noValue: 0,
            currentYesPrice: 0,
            currentNoPrice: 0
        };

        if (!marketState || !positions[marketId]) return defaultValues;

        const userPositions = positions[marketId];
        const reserveYes = Number(marketState.reserveYes);
        const reserveNo = Number(marketState.reserveNo);

        if (reserveYes === 0 || reserveNo === 0) return defaultValues;

        const yesShares = userPositions.yes ? Number(userPositions.yes) : 0;
        const noShares = userPositions.no ? Number(userPositions.no) : 0;

        const currentYesPrice = reserveNo / reserveYes;
        const currentNoPrice = reserveYes / reserveNo;

        return {
            yesValue: yesShares * currentYesPrice,
            noValue: noShares * currentNoPrice,
            currentYesPrice,
            currentNoPrice
        };
    }, [marketState, positions, marketId]);

    const totalValue = yesValue + noValue;

    if (!isConnected) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mt-6"
            >
                <h3 className="font-bold mb-4">Your Position</h3>
                <div className="text-center py-6">
                    <p className="text-white/70 mb-4">Connect your wallet to view your position</p>
                    <WalletConnectButton />
                </div>
            </motion.div>
        );
    }

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 bborder border-white/20 mt-6"
            >
                <h3 className="font-bold mb-4">Your Position</h3>
                <div className="text-center py-6">
                    <p className="text-white/70">Loading positions...</p>
                </div>
            </ motion.div >
        )
    }

    const userPositions = positions[marketId] || { yes: null, no: null };
    const hasYesPosition = userPositions.yes !== null && userPositions.yes && userPositions.yes > 0n;
    const hasNoPosition = userPositions.no !== null && userPositions.no && userPositions.no > 0n;

    if (!hasYesPosition && !hasNoPosition) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mt-6"
            >
                <h3 className="font-bold mb-4">Your Position</h3>
                <div className="text-center py-6">
                    <p className="text-white/70">You have no positions in this market</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mt-6"
        >
            <h3 className="font-bold mb-4">Your Position</h3>

            {hasYesPosition && (
                <div className="mb-6">
                    <h4 className="text-sm text-white/70 mb-2">YES Position</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-3 rounded-lg">
                            <p className="text-sm text-white/70 mb-1">Shares</p>
                            <p className="text-xl font-bold">
                                {Number(userPositions.yes).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-green-500/20 p-3 rounded-lg text-green-300">
                            <p className="text-sm mb-1">Outcome</p>
                            <p className="text-xl font-bold">YES</p>
                        </div>

                        <div className="bg-green-500/20 p-3 rounded-lg text-green-300">
                            <p className="text-sm mb-1">Value</p>
                            <p className="text-xl font-bold">
                                {yesValue.toFixed(2)} TON
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {hasNoPosition && (
                <div className="mb-6">
                    <h4 className="text-sm text-white/70 mb-2">NO Position</h4>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/20 p-3 rounded-lg">
                            <p className="text-sm text-white/70 mb-1">Shares</p>
                            <p className="text-xl font-bold">
                                {Number(userPositions.no).toFixed(2)}
                            </p>
                        </div>
                        <div className="bg-red-500/20 p-3 rounded-lg text-red-300">
                            <p className="text-sm mb-1">Outcome</p>
                            <p className="text-xl font-bold">NO</p>
                        </div>
                        <div className="bg-red-500/20 p-3 rounded-lg text-red-300">
                            <p className="text-sm mb-1">Value</p>
                            <p className="text-xl font-bold">
                                {noValue.toFixed(2)} TON
                            </p>
                        </div>

                    </div>
                </div>
            )}

            <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-sm text-white/70 mb-1">Total Estimated Value</p>
                <p className="text-2xl font-bold">{totalValue.toFixed(2)} TON</p>
            </div>
        </motion.div>
    );
};

export default PositionSection;