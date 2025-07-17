import { useState } from 'react';
import { motion } from 'framer-motion';
import OutcomeToggle from './OutcomeToggle';
import QuantityStepper from './QuantityStepper';
import { useUserStore } from '../../stores/userStore';
import { useTradeStore } from '../../stores/tradeStore';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TradePanel = ({ market }: { market: any }) => {
    const [outcome, setOutcome] = useState<'YES' | 'NO'>('YES');
    const [quantity, setQuantity] = useState(10);
    const { isConnected, connectWallet } = useUserStore();
    const { setTradeParams } = useTradeStore();

    const currentPrice = market.outcomes[outcome];
    const totalCost = currentPrice * quantity;

    const handleSubmit = () => {
        if (!isConnected) {
            connectWallet();
            return;
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
                    <QuantityStepper quantity={quantity} setQuantity={setQuantity} />
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
                    {isConnected ? 'Buy Shares' : 'Connect Wallet'}
                </button>
            </div>
        </motion.div>
    );
};

export default TradePanel;