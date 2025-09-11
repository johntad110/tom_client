import { motion } from 'framer-motion';
import { useTelegramStore } from '../../stores/telegramStore';
import { StarIcon } from '@heroicons/react/24/solid';
import type { Market } from '../../types/market';

type MarketHeaderProps = {
    market: Market;
    isNew?: Boolean;
};

const MarketHeader = ({ market, isNew }: MarketHeaderProps) => {
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams || {};

    const statusColors = {
        open: 'bg-blue-500/20 text-blue-300',
        closed: 'bg-gray-500/20 text-gray-300',
        resolving: 'bg-orange-500/20 text-orange-300',
        resolved: 'bg-gray-700/20 text-gray-400',
    };

    return (
        <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="px-4 py-2"
            style={{ backgroundColor: theme.bg_color }}
        >
            <div className="flex gap-2 mb-4">
                <span className={`flex text-xs px-2 py-1 ${statusColors[market.status]}`}>
                    {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                </span>
                {isNew && (
                    <div
                        className="flex items-center px-2 py-1 rounded-md"
                        style={{
                            backgroundColor: theme.accent_text_color ? `${theme.accent_text_color}20` : '#fff3cd',
                            color: theme.accent_text_color || '#856404'
                        }}
                    >
                        <span className="text-xs mr-1">New</span>
                        <StarIcon className="h-3 w-3" />
                    </div>
                )}
            </div>

            <div className="flex justify-between items-start mb-2">
                <h1 className="text-sm pr-2" style={{ color: theme.text_color }}>{market.question}</h1>

                {/* Banner image */}
                <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 ml-2">
                    {market.bannerImage ? (
                        <img
                            src={market.bannerImage}
                            alt="Market banner"
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div
                            className="w-full h-full flex items-center justify-center"
                            style={{ backgroundColor: theme.hint_color || '#999999' }}
                        >
                            <span
                                className="text-xs"
                                style={{ color: theme.bg_color || '#000000' }}
                            >
                                NoImg
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default MarketHeader;