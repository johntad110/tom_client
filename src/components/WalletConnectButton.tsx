import { motion } from 'framer-motion';
import { useWalletConnection } from '../hooks/useWalletConnection';

export const WalletConnectButton = () => {
    const {
        connect,
        disconnect,
        walletAddress,
        isConnected,
        isLoading
    } = useWalletConnection();

    const shortenedAddress = walletAddress
        ? `${walletAddress.slice(0, 4)}...${walletAddress.slice(-4)}`
        : null;

    return (
        <motion.button
            id='ton-connect-button'
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={isConnected ? disconnect : connect}
            disabled={isLoading}
            className={`px-4 py-2 mt-2 rounded-lg font-medium transition-all ${isConnected
                ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
                : isLoading
                    ? 'bg-blue-500/30 cursor-not-allowed'
                    : 'bg-blue-500/20 hover:bg-blue-500/30'
                }`}
        >
            {isLoading ? (
                'Connecting...'
            ) : isConnected ? (
                `Connected: ${shortenedAddress}`
            ) : (
                'Connect Wallet'
            )}
        </motion.button>
    );
};