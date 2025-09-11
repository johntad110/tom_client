import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/userStore';
import { useTradeStore } from '../../stores/tradeStore';
import { useWalletConnection } from '../../hooks/useWalletConnection';
import type { Market } from '../../types/market';
import { Address, beginCell, toNano } from '@ton/core';
import { useTonConnect } from '../../hooks/useTonConnect';
import { useFactroyContract } from '../../hooks/useFactoryContract';
import { useTelegramStore } from '../../stores/telegramStore';

const TradePanel = ({ market }: { market: Market }) => {
    const [outcome, setOutcome] = useState<'YES' | 'NO'>('YES');
    const [tonAmount, setTonAmount] = useState(5);
    const [isLoading, setIsLoading] = useState(false);
    const { isConnected, walletAddress } = useUserStore();
    const { setTradeParams } = useTradeStore();
    const { connect } = useWalletConnection();
    const { sender } = useTonConnect();
    const { marketAddresses } = useFactroyContract();

    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    const currentPrice = market.probabilities[outcome === "YES" ? "yes" : "no"];

    // Calculate shares based on TON amount
    const sharesToBuy = useMemo(() => {
        if (currentPrice <= 0) return 0;
        return tonAmount / currentPrice;
    }, [tonAmount, currentPrice]);

    const quickAmounts = [0.1, 0.5, 1, 5, 10, 50, 100];

    const handleQuickAmount = (amount: number) => {
        setTonAmount(amount);
    };

    const handleTonAmountChange = (value: string) => {
        const amount = parseFloat(value) || 0;
        setTonAmount(Math.max(0.1, amount)); // Enforce minimum 0.1 TON
    };

    const handleSubmit = async () => {
        if (!isConnected || !walletAddress) {
            connect();
            return;
        }

        if (tonAmount < 0.1) {
            alert("Minimum purchase amount is 0.1 TON");
            return;
        }

        setIsLoading(true);
        try {
            const marketAddress = marketAddresses[Number(market.id)];
            const amount = toNano(tonAmount);

            let message;
            if (outcome === 'YES') {
                message = beginCell()
                    .storeUint(0x1674727b, 32) // BuyYes opcode
                    .storeCoins(amount)
                    .endCell();
            } else {
                message = beginCell()
                    .storeUint(0x4d689170, 32) // BuyNo opcode
                    .storeCoins(amount)
                    .endCell();
            }

            await sender.send({
                to: Address.parse(marketAddress),
                value: amount,
                body: message
            });

        } catch (err) {
            console.error('Trade failed:', err);
        } finally {
            setIsLoading(false);
        }

        setTradeParams(market.id, outcome, sharesToBuy);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="p-4"
            style={{ backgroundColor: theme?.bg_color }}
        >
            <h3
                className="font-bold text-sm mb-4"
                style={{ color: theme?.accent_text_color }}
            >
                Trade Shares
            </h3>

            <div className="space-y-4">
                {/* Outcome Toggle */}
                <div className="flex rounded-lg p-1" style={{ backgroundColor: theme?.secondary_bg_color }}>
                    {(['YES', 'NO'] as const).map((option) => (
                        <button
                            key={option}
                            onClick={() => setOutcome(option)}
                            className={`flex-1 py-2 rounded-md relative ${outcome === option ? 'text-white' : 'text-white/60'
                                }`}
                            style={{ color: theme?.text_color }}
                        >
                            {option}
                            {outcome === option && (
                                <motion.div
                                    layoutId="outcome-indicator"
                                    className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-red-500/20 rounded-md"
                                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* TON Amount Input */}
                <div>
                    <label className="block text-sm mb-2" style={{ color: theme?.hint_color }}>
                        Amount to spend (TON)
                    </label>
                    <div className="flex items-center bg-white/10 rounded-lg overflow-hidden">
                        <button
                            disabled={isLoading || tonAmount <= 0.1}
                            onClick={() => setTonAmount(prev => Math.max(0.1, prev - 0.1))}
                            className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors disabled:opacity-50"
                            style={{ backgroundColor: theme?.secondary_bg_color, color: theme?.text_color }}
                        >
                            -
                        </button>

                        <div className="flex-1 text-center">
                            <input
                                type="number"
                                value={tonAmount}
                                onChange={(e) => handleTonAmountChange(e.target.value)}
                                className="w-full bg-transparent text-center py-3 focus:outline-none"
                                min={0.1}
                                step={0.1}
                                style={{ backgroundColor: theme?.secondary_bg_color, color: theme?.text_color }}
                            />
                        </div>

                        <button
                            disabled={isLoading}
                            onClick={() => setTonAmount(prev => prev + 0.1)}
                            className="px-4 py-3 bg-white/5 hover:bg-white/10 transition-colors"
                            style={{ backgroundColor: theme?.secondary_bg_color, color: theme?.text_color }}
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* To win section */}
                {/* <div className='flex  items-center gap-1 text-sm'>
                    <p style={{ color: theme?.hint_color }}>To win:</p>
                    <p className='text-green-500 p-1 px-2 rounded-md' style={{ backgroundColor: theme?.secondary_bg_color }}>{sharesToBuy.toFixed(2)} TON</p>
                </div> */}

                {/* Quick Amount Buttons */}
                <div className="grid grid-cols-4 gap-2">
                    {quickAmounts.map((amount) => (
                        <button
                            key={amount}
                            onClick={() => handleQuickAmount(amount)}
                            disabled={isLoading}
                            className={`py-2 px-1 text-xs rounded-md transition-colors ${tonAmount === amount
                                ? 'bg-blue-500 text-white'
                                : 'bg-white/10 hover:bg-white/20'
                                }`}
                            style={{
                                backgroundColor: tonAmount === amount
                                    ? theme?.button_color
                                    : theme?.secondary_bg_color,
                                color: tonAmount === amount
                                    ? theme?.button_text_color
                                    : theme?.text_color
                            }}
                        >
                            {amount} TON
                        </button>
                    ))}
                </div>

                {/* Purchase Details */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color, color: theme?.text_color }}>
                        <p className="text-sm mb-1" style={{ color: theme?.hint_color }}>Price per share</p>
                        <p className="text-lg">{currentPrice.toFixed(4)} TON</p>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg" style={{ backgroundColor: theme?.secondary_bg_color, color: theme?.text_color }}>
                        <p className="text-sm mb-1" style={{ color: theme?.hint_color }}>Shares to buy</p>
                        <p className="text-lg">{sharesToBuy.toFixed(2)}</p>
                    </div>
                </div>

                {/* Total Cost Display */}
                <div className="bg-black/20 p-3 rounded-lg text-center" style={{ backgroundColor: theme?.secondary_bg_color, color: theme?.text_color }}>
                    <p className="text-sm mb-1" style={{ color: theme?.hint_color }}>Total cost</p>
                    <p className="text-lg font-semibold">{tonAmount.toFixed(4)} TON</p>
                </div>

                <button
                    onClick={handleSubmit}
                    disabled={isLoading || tonAmount < 0.1}
                    className={`w-full py-3 rounded-lg transition-colors disabled:opacity-50 ${isConnected
                        ? 'bg-green-500/90 hover:bg-green-500'
                        : 'bg-blue-500/90 hover:bg-blue-500'
                        }`}
                    style={{ backgroundColor: theme?.button_color, color: theme?.button_text_color }}
                >
                    {isLoading ? 'Processing...' :
                        isConnected ? `Buy ${sharesToBuy.toFixed(2)} ${outcome} Shares` :
                            'Connect Wallet'}
                </button>
            </div>
        </motion.div>
    );
};

export default TradePanel;