import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/userStore';
import { WalletConnectButton } from '../WalletConnectButton';


const PositionSection = ({ marketId }: { marketId: string }) => {
    const { isConnected } = useUserStore();

    // In a real app, this would come from the user's portfolio
    const mockPosition = {
        outcome: 'YES' as 'YES' | 'NO',
        shares: 15.2,
        averagePrice: 0.65,
        currentValue: 12.36,
        profitLoss: 2.58,
    };

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

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mt-6"
        >
            <h3 className="font-bold mb-4">Your Position</h3>

            <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Outcome</p>
                    <p className={`text-xl font-bold ${mockPosition.outcome === 'YES' ? 'text-green-400' : 'text-red-400'
                        }`}>
                        {mockPosition.outcome}
                    </p>
                </div>

                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Shares</p>
                    <p className="text-xl font-bold">{mockPosition.shares.toFixed(2)}</p>
                </div>

                <div className="bg-black/20 p-3 rounded-lg">
                    <p className="text-sm text-white/70 mb-1">Avg. Price</p>
                    <p className="text-xl font-bold">{mockPosition.averagePrice.toFixed(3)} TON</p>
                </div>

                <div className={`p-3 rounded-lg ${mockPosition.profitLoss >= 0
                    ? 'bg-green-500/20 text-green-300'
                    : 'bg-red-500/20 text-red-300'
                    }`}>
                    <p className="text-sm mb-1">Profit/Loss</p>
                    <p className="text-xl font-bold">
                        {mockPosition.profitLoss >= 0 ? '+' : ''}
                        {mockPosition.profitLoss.toFixed(2)} TON
                    </p>
                </div>
            </div>

            <div className="mt-4">
                <p className="text-sm text-white/70 mb-1">Estimated Value</p>
                <p className="text-2xl font-bold">{mockPosition.currentValue.toFixed(2)} TON</p>
            </div>
        </motion.div>
    );
};

export default PositionSection;