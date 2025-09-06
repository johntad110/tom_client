import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { StarIcon } from '@heroicons/react/24/solid';
import { useTelegramStore } from '../../stores/telegramStore';

type MarketCardProps = {
    market: {
        id: string;
        question: string;
        status: 'open' | 'closed' | 'resolving' | 'resolved';
        probability: number;
        totalLiquidity: number;
        isNew?: boolean;
        bannerImage?: string;
    };
};

const MarketCard = ({ market }: MarketCardProps) => {
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams || {};

    // Format probability for display
    const displayProbability = market.probability < 1 ? '<1%' : `${Math.round(market.probability)}%`;

    return (
        <motion.div
            // whileHover={{ y: -3 }}
            className="-rounded-xl overflow-hidden -border"
            style={{
                backgroundColor: theme.secondary_bg_color || '#2c2c2c',
                borderColor: theme.section_separator_color || '#3a3a3a'
            }}
        >
            <Link to={`/market-detail/${market.id}`}>
                <div className="p-4">
                    {/* Header section, title and banner */}
                    <div className="flex justify-between items-start mb-3">
                        <h3
                            className="text-sm font-medium flex-1 pr-2"
                            style={{ color: theme.text_color || '#ffffff' }}
                        >
                            {market.question}
                        </h3>

                        {/* Banner image */}
                        <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 ml-2">
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
                                        No Image
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Status and probability row */}
                    <div className="flex justify-between items-center mb-3">
                        <span
                            className={`text-xs py-0.5 rounded`}
                            style={{ color: theme.hint_color }}
                        >
                            {market.status.charAt(0).toUpperCase() + market.status.slice(1)}
                        </span>

                        <div className="flex items-center">
                            <span
                                className="text-sm font-bold mr-1"
                                style={{ color: theme.text_color || '#ffffff' }}
                            >
                                {displayProbability}
                            </span>
                            <span
                                className="text-xs"
                                style={{ color: theme.hint_color || '#999999' }}
                            >
                                YES
                            </span>
                        </div>
                    </div>

                    {/* Probability indicator */}
                    <div className="mb-3">
                        <div
                            className="h-1.5 rounded-full overflow-hidden"
                            style={{ backgroundColor: theme.section_separator_color || '#3a3a3a' }}
                        >
                            <motion.div
                                className="h-full rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${market.probability}%` }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                style={{
                                    background: `linear-gradient(90deg, ${theme.button_color || '#2481cc'}, ${theme.accent_text_color || '#ff9f0a'})`
                                }}
                            />
                        </div>
                    </div>

                    {/* "New" indicator if applicable */}
                    {market.isNew && (
                        <div className="flex items-center justify-end mt-2">
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
                        </div>
                    )}
                </div>
            </Link>
        </motion.div>
    );
};

export default MarketCard;