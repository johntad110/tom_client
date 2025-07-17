
import { motion } from 'framer-motion';
import { useTelegram } from '../../hooks/useTelegram';

const TelegramProfileCard = () => {
    const { user } = useTelegram();

    if (!user) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
        >
            <h3 className="text-lg font-bold mb-3">Telegram Profile</h3>

            <div className="flex items-center space-x-4">
                {user.photo_url ? (
                    <img
                        src={user.photo_url}
                        alt={`${user.first_name}'s profile`}
                        className="w-12 h-12 rounded-full object-cover border border-white/20"
                    />
                ) : (
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <span className="text-lg">
                            {user.first_name.charAt(0)}
                            {user.last_name?.charAt(0)}
                        </span>
                    </div>
                )}

                <div>
                    <p className="font-medium">
                        {user.first_name} {user.last_name}
                    </p>
                    {user.username && (
                        <p className="text-sm text-white/70">@{user.username}</p>
                    )}
                    {user.is_premium && (
                        <span className="inline-block mt-1 px-2 py-0.5 text-xs bg-yellow-500/20 text-yellow-300 rounded-full">
                            Premium
                        </span>
                    )}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 text-sm">
                <div className="bg-black/20 p-2 rounded-lg">
                    <p className="text-white/70">Telegram ID</p>
                    <p className="font-mono">{user.id}</p>
                </div>
                {user.language_code && (
                    <div className="bg-black/20 p-2 rounded-lg">
                        <p className="text-white/70">Language</p>
                        <p className="uppercase">{user.language_code}</p>
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default TelegramProfileCard;