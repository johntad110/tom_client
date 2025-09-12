import { motion } from 'framer-motion';
import { useUserStore } from '../stores/userStore';
import { useWalletConnection } from '../hooks/useWalletConnection';
import { useTelegramStore } from '../stores/telegramStore';
import {
    UserIcon,
    WalletIcon,
    IdentificationIcon,
    AtSymbolIcon,
    LinkIcon,
    CheckBadgeIcon,
    QrCodeIcon,
} from '@heroicons/react/24/outline';
import { useState } from 'react';
import CopyToClipboard from '../components/CopyToClipboard';
import ResourcesSection from '../components/profile/ResourcesSection';

const ProfilePage = () => {
    const { connect: connectWallet, disconnect: disconnectWallet } = useWalletConnection();
    const { isConnected, isLoading, nickname, walletAddress } = useUserStore();
    const { user, webApp } = useTelegramStore();
    const theme = webApp?.themeParams;
    const [copied, setCopied] = useState(false);


    const handleCopy = () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const formatWalletAddress = (address: string) => {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: theme?.bg_color }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center"
                >
                    <div className="w-12 h-12 rounded-full mb-4 animate-pulse" style={{ backgroundColor: theme?.secondary_bg_color }} />
                    <div className="w-32 h-4 rounded mb-2 animate-pulse" style={{ backgroundColor: theme?.secondary_bg_color }} />
                    <div className="w-24 h-3 rounded animate-pulse" style={{ backgroundColor: theme?.secondary_bg_color }} />
                </motion.div>
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen px-4 pb-24"
            style={{ backgroundColor: theme?.bg_color }}
        >
            <div className="max-w-md mx-auto space-y-6 pt-6">
                {/* Profile Header */}
                <div className="text-center mb-8">
                    {/* Avatar */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1, type: 'spring' }}
                        className="relative mx-auto mb-4"
                    >
                        <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4"
                            style={{ borderColor: theme?.button_color }}>
                            {user?.photo_url ? (
                                <img
                                    src={user.photo_url}
                                    alt={user.first_name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center"
                                    style={{ backgroundColor: theme?.secondary_bg_color }}>
                                    <UserIcon className="w-12 h-12" style={{ color: theme?.hint_color }} />
                                </div>
                            )}
                        </div>
                        {user?.is_premium && (
                            <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-1">
                                <CheckBadgeIcon className="w-5 h-5 text-white" />
                            </div>
                        )}
                    </motion.div>

                    {/* Name and Username */}
                    <motion.h1
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-2xl font-bold mb-1"
                        style={{ color: theme?.text_color }}
                    >
                        {user?.first_name} {user?.last_name || ''}
                    </motion.h1>

                    {user?.username && (
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-sm opacity-70 flex items-center justify-center"
                            style={{ color: theme?.hint_color }}
                        >
                            <AtSymbolIcon className="w-4 h-4 mr-1" />
                            @{user.username}
                        </motion.p>
                    )}

                    {/* Nickname */}
                    {nickname && (
                        <motion.p
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-sm mt-2 px-3 py-1 rounded-full inline-block"
                            style={{
                                backgroundColor: theme?.button_color + '20',
                                color: theme?.button_color
                            }}
                        >
                            {nickname}
                        </motion.p>
                    )}
                </div>

                {/* Telegram Info Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="p-6 rounded-2xl"
                    style={{ backgroundColor: theme?.secondary_bg_color }}
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: theme?.text_color }}>
                        <IdentificationIcon className="w-5 h-5 mr-2" />
                        Telegram Profile
                    </h3>

                    <div className="space-y-3">
                        <div className="flex justify-between items-center">
                            <span className="text-sm opacity-70" style={{ color: theme?.hint_color }}>User ID</span>
                            <span className="text-sm font-mono" style={{ color: theme?.text_color }}>{user?.id}</span>
                        </div>

                        {user?.language_code && (
                            <div className="flex justify-between items-center">
                                <span className="text-sm opacity-70" style={{ color: theme?.hint_color }}>Language</span>
                                <span className="text-sm uppercase" style={{ color: theme?.text_color }}>
                                    {user.language_code}
                                </span>
                            </div>
                        )}

                        <div className="flex justify-between items-center">
                            <span className="text-sm opacity-70" style={{ color: theme?.hint_color }}>Premium</span>
                            <span className="text-sm" style={{ color: user?.is_premium ? '#10B981' : theme?.hint_color }}>
                                {user?.is_premium ? 'Yes' : 'No'}
                            </span>
                        </div>
                    </div>
                </motion.div>

                {/* Wallet Connection Card */}
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="p-6 rounded-2xl"
                    style={{ backgroundColor: theme?.secondary_bg_color }}
                >
                    <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: theme?.text_color }}>
                        <WalletIcon className="w-5 h-5 mr-2" />
                        Wallet Connection
                    </h3>

                    {isConnected ? (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm opacity-70" style={{ color: theme?.hint_color }}>Status</span>
                                <span className="text-sm text-green-400 flex items-center">
                                    <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                                    Connected
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-sm opacity-70" style={{ color: theme?.hint_color }}>Address</span>
                                <CopyToClipboard text={walletAddress || ''} onCopy={handleCopy}>
                                    <button className="text-sm font-mono flex items-center hover:opacity-80 transition-opacity"
                                        style={{ color: theme?.text_color }}>
                                        {formatWalletAddress(walletAddress || '')}
                                        <LinkIcon className="w-4 h-4 ml-1" />
                                    </button>
                                </CopyToClipboard>
                            </div>

                            {copied && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-xs text-center text-green-400"
                                >
                                    Copied to clipboard!
                                </motion.div>
                            )}

                            <div className="flex space-x-3 mt-4">
                                <button className="flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm border transition-colors"
                                    style={{
                                        borderColor: theme?.button_color,
                                        color: theme?.button_color
                                    }}>
                                    <QrCodeIcon className="w-4 h-4 mr-1" />
                                    View QR
                                </button>
                                <button className="flex-1 flex items-center justify-center py-2 px-4 rounded-lg text-sm border transition-colors hover:bg-red-500/10 hover:border-red-400 hover:text-red-400"
                                    style={{
                                        borderColor: theme?.section_separator_color,
                                        color: theme?.hint_color
                                    }}
                                    onClick={disconnectWallet}>
                                    Disconnect
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center space-y-4">
                            <p className="text-sm opacity-70" style={{ color: theme?.hint_color }}>
                                Connect your wallet to start trading
                            </p>
                            <button
                                onClick={connectWallet}
                                className="w-full py-3 rounded-lg font-semibold transition-colors"
                                style={{
                                    backgroundColor: theme?.button_color,
                                    color: theme?.button_text_color
                                }}
                            >
                                Connect Wallet
                            </button>
                        </div>
                    )}
                </motion.div>

                <ResourcesSection />
            </div>
        </motion.div>
    );
};

export default ProfilePage;