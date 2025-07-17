import { useState } from 'react';
import { motion } from 'framer-motion';
import { useUserStore } from '../stores/userStore';
import ProfileHeader from '../components/profile/ProfileHeader';
import WalletCard from '../components/profile/WalletCard';
import StatsCard from '../components/profile/StatsCard';
import EditProfileModal from '../components/profile/EditProfileModal';
import LoadingShimmer from '../components/profile/LoadingShimmer';
import TelegramProfileCard from '../components/profile/TelegramProfileCard';
import { useWalletConnection } from '../hooks/useWalletConnection';


const ProfilePage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { isConnected, isLoading } = useUserStore();
    const { connect: connectWallet } = useWalletConnection();

    if (isLoading) {
        return <LoadingShimmer />
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen pt-6 px-4 pb-24"
        >
            <div className="max-w-md mx-auto space-y-6">
                <ProfileHeader onEdit={() => setIsEditing(true)} />
                <TelegramProfileCard />

                {isConnected ? (
                    <>
                        <WalletCard />
                        <StatsCard />
                    </>
                ) : (
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
                    >
                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-2">Connect Your Wallet</h3>
                            <p className="text-white/70 mb-6">
                                Connect your TON wallet to view your portfolio and trade on prediction markets
                            </p>
                            <button
                                onClick={connectWallet}
                                disabled={isLoading}
                                className={`px-6 py-3 rounded-xl font-medium transition-all ${isLoading
                                    ? 'bg-blue-400/30 cursor-not-allowed'
                                    : 'bg-blue-500/20 hover:bg-blue-500/30 active:scale-95'
                                    }`}
                            >
                                {isLoading ? 'Connecting...' : 'Connect Wallet'}
                            </button>
                        </div>
                    </motion.div>
                )}
            </div>

            <EditProfileModal
                isOpen={isEditing}
                onClose={() => setIsEditing(false)}
            />
        </motion.div>
    );
};

export default ProfilePage;