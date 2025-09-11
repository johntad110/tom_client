import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/userStore';
import { WalletConnectButton } from '../WalletConnectButton';
import { userPositionStore } from '../../stores/positionStore';
import { useFactoryStore } from '../../stores/factoryStore';
import { useEffect, useMemo } from 'react';
import { Address } from '@ton/core';
import { useMarketContract } from '../../hooks/useMarketContract';
import { useTonClient } from '../../hooks/useTonClient';
import { useTelegramStore } from '../../stores/telegramStore';

const PositionSection = ({ marketId, setUserIntent, setModalOpen, marketOpen }: { marketId: string; setUserIntent: any; setModalOpen: any; marketOpen: boolean }) => {
    const { isConnected, walletAddress } = useUserStore();
    const { marketAddresses } = useFactoryStore();
    const { marketState } = useMarketContract({ addr: marketAddresses[Number(marketId)] });
    const { positions, loading, fetchPositions } = userPositionStore();
    const client = useTonClient();

    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    useEffect(() => {
        if (walletAddress && client) {
            fetchPositions(client, marketId, Address.parse(walletAddress), Address.parse(marketAddresses[Number(marketId)]))
        }
    }, [marketId, walletAddress, client])

    const positionData = useMemo(() => {
        const defaultData = {
            yesShares: 0,
            noShares: 0,
            currentYesValue: 0,
            currentNoValue: 0,
            resolvedYesValue: 0,
            resolvedNoValue: 0,
            currentYesPrice: 0,
            currentNoPrice: 0
        };

        if (!marketState || !positions[marketId]) return defaultData;

        const userPositions = positions[marketId].data;
        const reserveYes = Number(marketState.reserveYes);
        const reserveNo = Number(marketState.reserveNo);
        const totalReserves = reserveYes + reserveNo;

        if (reserveYes === 0 || reserveNo === 0) return defaultData;

        const yesShares = userPositions.yes ? Number(userPositions.yes) : 0;
        const noShares = userPositions.no ? Number(userPositions.no) : 0;

        const currentYesPrice = reserveNo / totalReserves;
        const currentNoPrice = reserveYes / totalReserves;

        // Current market value
        const currentYesValue = yesShares * currentYesPrice;
        const currentNoValue = noShares * currentNoPrice;

        // Resolved value (if market ended now)
        const resolvedYesValue = yesShares * 1; // Each YES shares worth 1 TON if resolved Yes
        const resolvedNoValue = noShares * 1;   // Each NO shares worth 1 TON if resolved No

        return {
            yesShares,
            noShares,
            currentYesValue,
            currentNoValue,
            resolvedYesValue,
            resolvedNoValue,
            currentYesPrice,
            currentNoPrice
        };
    }, [marketState, positions, marketId]);

    if (!isConnected) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4"
                style={{ backgroundColor: theme?.bg_color }}
            >
                <h3 className="mb-4 text-sm font-bold" style={{ color: theme?.accent_text_color }}>
                    Your Position
                </h3>
                <div className="text-center py-4">
                    <p className="text-white/70 mb-3 text-sm">Connect wallet to view positions</p>
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
                className="p-4"
                style={{ backgroundColor: theme?.bg_color }}
            >
                <h3 className="mb-4 text-sm font-bold" style={{ color: theme?.accent_text_color }}>
                    Your Position
                </h3>
                <div className="text-center py-4">
                    <p className="text-sm" style={{ color: theme?.hint_color }}>Loading positions...</p>
                </div>
            </motion.div>
        );
    }

    const hasYesPosition = positionData.yesShares > 0;
    const hasNoPosition = positionData.noShares > 0;

    if (!hasYesPosition && !hasNoPosition) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="p-4"
                style={{ backgroundColor: theme?.bg_color }}
            >
                <h3 className="mb-4 text-sm font-bold" style={{ color: theme?.accent_text_color }}>
                    Your Position
                </h3>
                <div className="text-center py-4">
                    <p className="text-white/70 text-sm">No positions in this market</p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="p-4"
            style={{ backgroundColor: theme?.bg_color }}
        >
            <h3 className="mb-4 text-sm font-bold" style={{ color: theme?.accent_text_color }}>
                Your Position
            </h3>

            <div className="space-y-3">
                {hasYesPosition && (
                    <div
                        className={`p-3 rounded-lg ${marketOpen && 'hover:cursor-pointer'}`}
                        style={{ backgroundColor: theme?.secondary_bg_color }}
                        onClick={() => { if (marketOpen) { setUserIntent("SELL_YES"); setModalOpen(true); } }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-green-500 font-medium">YES Shares</span>
                            <span
                                className=""
                                style={{ color: theme?.text_color }}
                            >
                                {positionData.yesShares.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span
                                    className=""
                                    style={{ color: theme?.hint_color }}
                                >Current:</span>
                                <span className="ml-1" style={{ color: theme?.text_color }}>{positionData.currentYesValue.toFixed(2)} TON</span>
                            </div>
                            <div>
                                <span className="" style={{ color: theme?.hint_color }}>If Yes:</span>
                                <span className="ml-1 text-green-500">{positionData.resolvedYesValue.toFixed(2)} TON</span>
                            </div>
                        </div>
                    </div>
                )}

                {hasNoPosition && (
                    <div
                        className={`p-3 rounded-lg ${marketOpen && 'hover:cursor-pointer'}`}
                        style={{ backgroundColor: theme?.secondary_bg_color }}
                        onClick={() => { if (marketOpen) { setUserIntent("SELL_YES"); setModalOpen(true); } }}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm text-red-500 font-medium">NO Shares</span>
                            <span
                                className=""
                                style={{ color: theme?.text_color }}
                            >
                                {positionData.noShares.toFixed(2)}</span>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                                <span className="" style={{ color: theme?.hint_color }}>Current:</span>
                                <span className="ml-1" style={{ color: theme?.text_color }}>{positionData.currentNoValue.toFixed(2)} TON</span>
                            </div>
                            <div>
                                <span className="" style={{ color: theme?.hint_color }}>If No:</span>
                                <span className="ml-1 text-red-500">{positionData.resolvedNoValue.toFixed(2)} TON</span>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Total summary */}
            {(hasYesPosition || hasNoPosition) && (
                <div className={`mt-4`}>
                    <div className='w-full h-[1px] mb-3' style={{ backgroundColor: theme?.hint_color }}></div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="" style={{ color: theme?.hint_color }}>Total Value:</span>
                        <span className="font-medium" style={{ color: theme?.text_color }}>
                            {(positionData.currentYesValue + positionData.currentNoValue).toFixed(2)} TON
                        </span>
                    </div>
                </div>
            )}
        </motion.div>
    );
};

export default PositionSection;