import { useTelegram } from '../../hooks/useTelegram';
import { motion } from 'framer-motion';
import { useUserStore } from '../../stores/userStore';


const ProfileHeader = ({ onEdit }: { onEdit: () => void }) => {
    const { user: tgUser } = useTelegram();
    const { nickname, bio, profileImage, isConnected } = useUserStore();

    const displayName = tgUser?.first_name || nickname;
    const displayBio = tgUser?.username ? `@${tgUser.username}` : bio;
    const displayImage = tgUser?.photo_url || profileImage;

    return (
        <motion.div
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="relative">
                        {displayImage ? (
                            <img
                                src={displayImage}
                                alt={displayName}
                                className="w-16 h-16 rounded-full object-cover border-2 border-white/30"
                            />
                        ) : (
                            <div className="bg-gradient-to-br from-purple-500 to-blue-500 w-16 h-16 rounded-full flex items-center justify-center">
                                <span className="text-xl font-bold">{displayName.charAt(0)}</span>
                            </div>
                        )}
                        {isConnected && (
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white/80" />
                        )}
                    </div>

                    <div>
                        <h2 className="text-xl font-bold">{displayName}</h2>
                        <p className="text-white/70 text-sm">{displayBio}</p>
                    </div>
                </div>

                <button
                    onClick={onEdit}
                    className="bg-white/10 hover:bg-white/20 rounded-full p-2 transition-all"
                    aria-label="Edit profile"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                </button>
            </div>
        </motion.div>
    );
};

export default ProfileHeader;