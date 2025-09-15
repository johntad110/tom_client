import { useState } from 'react';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useTelegramStore } from '../stores/telegramStore';
import type { Market } from '../types/market';
import config from '../config';
import { ScaleLoader } from 'react-spinners';

interface ShareButtonProps {
    market: Market;
    chartData: Array<{ timestamp: number; chance: number }>;
}

const ShareButton = ({ market, chartData }: ShareButtonProps) => {
    const [isGenerating, setIsGenerating] = useState(false);
    const { user, webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    const shareMessages = [
        "Share this gem with your friends!💎",
        "Spread the word like butter on toast!🧈",
        "Be the market prophet everyone needs!🔮",
        "Share this before it moons!🚀",
        "Your friends will thank you for this one!🙏",
        "This market is too good to keep secret!🤫",
        "Share it like it's hot!🌶️",
        "Be the bearer of profitable news!📰",
        "Your crystal ball says: SHARE THIS!🔮",
        "This market is begging to be shared!🐶",
        "Don't be a market hog! Share the wealth!🐷",
        "Your friends deserve to know about this!👯",
        "Share it and watch the magic happen!✨",
        "This prediction is too spicy to keep to yourself!🌶️",
        "Be the hero your chat group needs!🦸",
        "Share this absolute banger of a market!🎯",
        "Your friends will think you're a genius!🧠",
        "This market is trending harder than your ex's new relationship!📈",
        "Share it before it becomes mainstream!🏃💨",
        "Be the first to break this market to your crew!🎉",
    ];

    const [currentMessage, setCurrentMessage] = useState(
        shareMessages[Math.floor(Math.random() * shareMessages.length)]
    );

    const handleShare = async () => {
        if (!user) {
            alert('Wait A Minute, Who Are You?');
            return;
        }

        setIsGenerating(true);
        try {
            const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.marketShare}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: user.id,
                    marketId: market.id,
                    marketData: {
                        question: market.question,
                        probability: market.probability,
                        bannerImage: market.bannerImage,
                    },
                    chartData: chartData,
                    theme: {
                        bg_color: theme?.bg_color || '#0f0f23',
                        text_color: theme?.text_color || '#ffffff',
                        button_color: theme?.button_color || '#0088cc',
                    }
                }),
            });

            if (response.ok) {
                // Rotate to a new message after successful share
                setCurrentMessage(shareMessages[Math.floor(Math.random() * shareMessages.length)]);

                webApp?.showPopup({
                    title: 'Shared Successfully! 🎉',
                    message: 'Your friends are about to be very impressed!',
                    buttons: [{ type: 'ok' }],
                });
            } else {
                throw new Error('Failed to share');
            }
        } catch (error) {
            console.error('Error sharing market:', error);
            webApp?.showPopup({
                title: 'Oops! 😅',
                message: 'Couldn\'t share right now. Try again in a bit!',
                buttons: [{ type: 'destructive', text: 'Close' }],
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <button
            onClick={handleShare}
            disabled={isGenerating}
            className="w-full text-[10px] flex items-center justify-center gap-2 p-2 mb-2 rounded-lg transition-all hover:scale-105 active:scale-95"
            style={{
                backgroundColor: theme?.secondary_bg_color,
                color: theme?.text_color,
                border: `1px solid ${theme?.section_separator_color || 'transparent'}`
            }}
        >
            {isGenerating ? (
                <>
                    <ScaleLoader color={theme?.text_color} height={10} width={2} />
                    <span>Creating magic...</span>
                </>
            ) : (
                <div className='flex justify-center items-center gap-1'>
                    <ArrowUpTrayIcon className="size-4" />
                    <span>{currentMessage}</span>
                </div>
            )}
        </button>
    );
};

export default ShareButton;