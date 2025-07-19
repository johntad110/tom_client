import { useState } from 'react';
import { motion } from 'framer-motion';
import OutcomeToggle from './OutcomeToggle';
import QuantityStepper from './QuantityStepper';
import { useUserStore } from '../../stores/userStore';
import { useTradeStore } from '../../stores/tradeStore';
import { useWalletConnection } from '../../hooks/useWalletConnection';
import type { Market } from '../../types/market';
import { Address, beginCell, toNano } from '@ton/core';
import { useTonConnect } from '../../hooks/useTonConnect';
import { useFactroyContract } from '../../hooks/useFactoryContract';

const TradePanel = ({ market }: { market: Market }) => {
    const [outcome, setOutcome] = useState<'YES' | 'NO'>('YES');
    const [quantity, setQuantity] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const { isConnected, walletAddress } = useUserStore();
    const { setTradeParams } = useTradeStore();
    const { connect } = useWalletConnection();
    const { sender } = useTonConnect();
    const { marketAddresses } = useFactroyContract();
    const currentPrice = market.outcomes[outcome];
    const totalCost = currentPrice * quantity;

    const handleSubmit = async () => {
        if (!isConnected || !walletAddress) {
            connect();
            return;
        }

        setIsLoading(true);
        try {
            console.log(totalCost);
            const marketAddress = marketAddresses[Number(market.id)];
            const amount = toNano(totalCost);

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

        // Set trade params and open confirmation modal (would be implemented elsewhere)
        setTradeParams(market.id, outcome, quantity);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mt-6"
        >
            <h3 className="font-bold mb-4">Trade Shares</h3>

            <div className="space-y-4">
                <OutcomeToggle outcome={outcome} setOutcome={setOutcome} />

                <div>
                    <label className="block text-sm text-white/70 mb-2">Quantity</label>
                    <QuantityStepper
                        quantity={quantity}
                        setQuantity={setQuantity}
                        disable={isLoading}
                    />
                </div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-black/20 p-3 rounded-lg">
                        <p className="text-sm text-white/70 mb-1">Price per share</p>
                        <p className="text-lg font-bold">{currentPrice.toFixed(3)} TON</p>
                    </div>
                    <div className="bg-black/20 p-3 rounded-lg">
                        <p className="text-sm text-white/70 mb-1">Total cost</p>
                        <p className="text-lg font-bold">{totalCost.toFixed(3)} TON</p>
                    </div>
                </div>

                <button
                    onClick={handleSubmit}
                    className={`w-full py-3 rounded-lg font-bold transition-colors ${isConnected
                        ? 'bg-green-500/90 hover:bg-green-500'
                        : 'bg-blue-500/90 hover:bg-blue-500'
                        }`}
                >
                    {isConnected ? `Buy ${outcome} Shares` : 'Connect Wallet'}
                </button>
            </div>
        </motion.div>
    );
};

export default TradePanel;