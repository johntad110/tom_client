import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTelegramStore } from '../stores/telegramStore';
import { useUserStore } from '../stores/userStore';
import { userPositionStore } from '../stores/positionStore';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useWalletConnection } from '../hooks/useWalletConnection';
import { Address, beginCell, toNano } from '@ton/core';
import { useTonConnect } from '../hooks/useTonConnect';
import { useFactroyContract } from '../hooks/useFactoryContract';

interface TradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    action: 'BUY_YES' | 'BUY_NO' | 'SELL_YES' | 'SELL_NO';
    marketId: string;
    currentYesPrice: number;
    currentNoPrice: number;
}

const TradeModal = ({
    isOpen,
    onClose,
    action,
    marketId,
    currentYesPrice,
    currentNoPrice
}: TradeModalProps) => {
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;
    const { isConnected } = useUserStore();
    const { positions } = userPositionStore();
    const { connect } = useWalletConnection();
    const { sender } = useTonConnect();
    const { marketAddresses } = useFactroyContract();

    const [amount, setAmount] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    // Get user's current positions
    const userPositions = positions[marketId]?.data || { yes: 0, no: 0 };
    const yesShares = Number(userPositions.yes) || 0;
    const noShares = Number(userPositions.no) || 0;

    // Determine trade type and parameters
    const tradeConfig = useMemo(() => {
        const isBuy = action.startsWith('BUY');
        const isYes = action.endsWith('YES');

        return {
            isBuy,
            isYes,
            title: `${isBuy ? 'Buy' : 'Sell'} ${isYes ? 'YES' : 'NO'} Shares`,
            actionType: action,
            currentPrice: isYes ? currentYesPrice : currentNoPrice,
            maxAmount: isBuy ? 100 : (isYes ? yesShares : noShares), // 100 TON max for buy, available shares for sell
            availableShares: isYes ? yesShares : noShares,
            quickAmounts: isBuy ? [0.1, 0.5, 1, 5, 10, 50, 100] : [0.1, 0.5, 1, 5, 10, 25, 50]
        };
    }, [action, currentYesPrice, currentNoPrice, yesShares, noShares]);

    // Calculate derived values
    const calculatedValues = useMemo(() => {
        if (tradeConfig.isBuy) {
            const shares = amount > 0 ? amount / tradeConfig.currentPrice : 0;
            return {
                shares,
                totalCost: amount,
                displayText: `${shares.toFixed(2)} shares for ${amount.toFixed(2)} TON`
            };
        } else {
            const tonValue = amount > 0 ? amount * tradeConfig.currentPrice : 0;
            return {
                shares: amount,
                totalCost: tonValue,
                displayText: `${amount.toFixed(2)} shares for ${tonValue.toFixed(2)} TON`
            };
        }
    }, [amount, tradeConfig.currentPrice, tradeConfig.isBuy]);

    const handleQuickAmount = (quickAmount: number) => {
        setAmount(quickAmount);
    };

    const handleSliderChange = (value: number) => {
        setAmount(value);
    };

    const handleConfirm = async () => {
        if (!isConnected) {
            connect()
            return;
        }

        setIsLoading(true);
        try {
            // BuyYesOpcode 0x1674727b
            // BuyNoOpcode 0x4d689170
            // SellYesOpcode 0x7aab1b57
            // SellNoOpcode 0x1ebcd0dd
            const opcode = tradeConfig.isYes ?
                (tradeConfig.isBuy ? 0x1674727b : 0x7aab1b57) :
                (tradeConfig.isBuy ? 0x4d689170 : 0x1ebcd0dd);

            console.log(`Executing ${tradeConfig.actionType}:`, {
                amount,
                shares: calculatedValues.shares,
                totalCost: calculatedValues.totalCost
            });

            let message;
            message = beginCell()
                .storeUint(opcode, 32)
                .storeCoins(toNano(String(amount)))
                .endCell();

            await sender.send({
                to: Address.parse(marketAddresses[Number(marketId)]),
                value: toNano("0.01"),
                body: message
            });

            onClose();
        } catch (error) {
            console.error('Trade failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Reset amount when modal opens/closes or action changes
    useEffect(() => {
        if (isOpen) {
            setAmount(0);
        }
    }, [isOpen, action]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                        className="w-full max-w-md max-h-[99%] overflow-y-auto rounded-xl px-4 py-4 no-scrollbar"
                        style={{ backgroundColor: theme?.bg_color }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="" style={{ color: theme?.text_color }}>
                                {tradeConfig.title}
                            </h2>
                            <button
                                onClick={onClose}
                                className="p-1 rounded-full hover:bg-white/10 transition-colors"
                                style={{ color: theme?.text_color }}
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Current Price */}
                        <div className="mb-6 p-3 rounded-lg text-center" style={{ backgroundColor: theme?.secondary_bg_color }}>
                            <p className="text-sm" style={{ color: theme?.hint_color }}>Current Price</p>
                            <p className="text-xl " style={{ color: theme?.text_color }}>
                                {tradeConfig.currentPrice.toFixed(4)} TON
                            </p>
                        </div>

                        {/* Available Shares (for sell) */}
                        {!tradeConfig.isBuy && (
                            <div className="mb-4 p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color }}>
                                <p className="text-sm" style={{ color: theme?.hint_color }}>
                                    Available {tradeConfig.isYes ? 'YES' : 'NO'} Shares
                                </p>
                                <p className="text-lg font-medium" style={{ color: theme?.text_color }}>
                                    {tradeConfig.availableShares.toFixed(2)}
                                </p>
                            </div>
                        )}

                        {/* Amount Input */}
                        <div className="mb-6">
                            <label className="block text-sm mb-3" style={{ color: theme?.hint_color }}>
                                {tradeConfig.isBuy ? 'Amount to spend (TON)' : 'Shares to sell'}
                            </label>

                            {/* Slider */}
                            <div className="mb-4">
                                <input
                                    type="range"
                                    min="0"
                                    max={tradeConfig.maxAmount}
                                    step="0.1"
                                    value={amount}
                                    onChange={(e) => handleSliderChange(parseFloat(e.target.value))}
                                    className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                    style={{
                                        background: `linear-gradient(to right, ${theme?.button_color || '#3b82f6'} ${(amount / tradeConfig.maxAmount) * 100}%, #374151 ${(amount / tradeConfig.maxAmount) * 100}%)`
                                    }}
                                    disabled={!tradeConfig.isBuy && tradeConfig.availableShares === 0}
                                />
                                <div className="flex justify-between text-xs mt-1" style={{ color: theme?.hint_color }}>
                                    <span>0</span>
                                    <span>{tradeConfig.maxAmount.toFixed(1)}</span>
                                </div>
                            </div>

                            {/* Quick Amount Buttons */}
                            <div className="grid grid-cols-4 gap-2 mb-4">
                                {tradeConfig.quickAmounts.map((quickAmount) => (
                                    <button
                                        key={quickAmount}
                                        onClick={() => handleQuickAmount(quickAmount)}
                                        disabled={(!tradeConfig.isBuy && quickAmount > tradeConfig.availableShares) || quickAmount > tradeConfig.maxAmount}
                                        className={`py-2 px-1 text-xs rounded-md transition-colors ${amount === quickAmount
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white/10 hover:bg-white/20 disabled:opacity-30'
                                            }`}
                                        style={{
                                            backgroundColor: amount === quickAmount
                                                ? theme?.button_color
                                                : theme?.secondary_bg_color,
                                            color: amount === quickAmount
                                                ? theme?.button_text_color
                                                : theme?.text_color
                                        }}
                                    >
                                        {quickAmount}
                                    </button>
                                ))}
                            </div>

                            {/* Amount Display */}
                            <div className="text-center">
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(Math.max(0, Math.min(tradeConfig.maxAmount, parseFloat(e.target.value) || 0)))}
                                    className="w-32 text-center bg-transparent border-b-2 focus:outline-none focus:border-blue-500 transition-colors"
                                    style={{
                                        borderColor: theme?.button_color,
                                        color: theme?.text_color
                                    }}
                                    min="0"
                                    max={tradeConfig.maxAmount}
                                    step="0.1"
                                    disabled={!tradeConfig.isBuy && tradeConfig.availableShares === 0}
                                />
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="mb-6 p-4 rounded-lg text-center" style={{ backgroundColor: theme?.secondary_bg_color }}>
                            <p className="text-sm mb-2" style={{ color: theme?.hint_color }}>
                                {tradeConfig.isBuy ? 'You will receive' : 'You will get'}
                            </p>
                            <p className="text-lg" style={{ color: theme?.text_color }}>
                                {calculatedValues.displayText}
                            </p>
                        </div>

                        {/* Action Button */}
                        <button
                            onClick={handleConfirm}
                            disabled={isLoading || amount <= 0 || (!tradeConfig.isBuy && amount > tradeConfig.availableShares)}
                            className="w-full py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            style={{
                                backgroundColor: theme?.button_color,
                                color: theme?.button_text_color
                            }}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center">
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                    Processing...
                                </div>
                            ) : (
                                `Confirm ${tradeConfig.isBuy ? 'Buy' : 'Sell'}`
                            )}
                        </button>

                        {/* Disclaimer */}
                        <p className="text-xs text-center mt-4" style={{ color: theme?.hint_color }}>
                            {tradeConfig.isBuy ? 'Buying shares at current market price' : 'Selling shares at current market price'}
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default TradeModal;
