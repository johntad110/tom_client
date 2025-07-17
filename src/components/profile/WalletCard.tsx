import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/userStore';
import { ArrowTopRightOnSquareIcon } from '@heroicons/react/24/outline';


const WalletCard = () => {
    const { walletAddress, balance, disconnectWallet } = useUserStore();

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-bold mb-2">Wallet</h3>
                    <div className="flex items-center space-x-2">
                        <span className="text-sm bg-blue-500/20 px-2 py-1 rounded">
                            TON Wallet
                        </span>
                    </div>
                </div>

                <button
                    onClick={disconnectWallet}
                    className="text-sm bg-red-500/20 hover:bg-red-500/30 px-3 py-1 rounded-lg transition-colors"
                >
                    Disconnect
                </button>
            </div>

            <div className="mt-4 space-y-3">
                <div>
                    <p className="text-sm text-white/70 mb-1">Address</p>
                    <div className="flex items-center justify-between bg-black/20 p-3 rounded-lg">
                        <span className="font-mono text-sm truncate mr-2">
                            {walletAddress}
                        </span>
                        <button className="text-blue-400 hover:text-blue-300">
                            <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>

                <div>
                    <p className="text-sm text-white/70 mb-1">Balance</p>
                    <div className="bg-black/20 p-3 rounded-lg">
                        <span className="text-xl font-bold">{balance.toFixed(2)} TON</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default WalletCard;