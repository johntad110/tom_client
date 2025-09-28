import { useAppStatusStore } from "../stores/appStatusStore";
import { useTelegramStore } from "../stores/telegramStore";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";

export const GlobalLoader = () => {
    const { initialized, errors, retryInitialization, initializationProgress, initializationStage } = useAppStatusStore();
    const { webApp } = useTelegramStore()
    const [animatedProgress, setAnimatedProgress] = useState(0);
    const [showErrorDetails, setShowErrorDetails] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => { setAnimatedProgress(initializationProgress); }, 100);
        return () => clearTimeout(timer);
    }, [initializationProgress]);

    // Beta is over - show thank you message instead of null
    if (initialized) {
        return (
            <div className="fixed inset-0 z-50">
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4"
                    style={{ backgroundColor: webApp?.themeParams.bg_color }}>

                    <div className="w-full max-w-md p-6 rounded-lg text-center">
                        {/* Thank you message */}
                        <div className="mb-6">
                            <div
                                className="text-2xl font-bold mb-4"
                                style={{ color: webApp?.themeParams.text_color }}
                            >
                                🎉 Beta Testing Complete! 🎉
                            </div>
                            <div
                                className="text-lg mb-4"
                                style={{ color: webApp?.themeParams.text_color }}
                            >
                                A huge thank you to all our amazing beta testers!
                            </div>
                            <div
                                className="text-sm mb-2"
                                style={{ color: webApp?.themeParams.hint_color }}
                            >
                                Your feedback and support during our wild testing phase has been invaluable.
                            </div>
                        </div>

                        {/* Launch information */}
                        <div className="mb-6 p-4 rounded-lg"
                            style={{
                                backgroundColor: webApp?.themeParams.secondary_bg_color,
                                border: `1px solid ${webApp?.themeParams.hint_color}20`
                            }}>
                            <div
                                className="text-sm font-medium mb-2"
                                style={{ color: webApp?.themeParams.text_color }}
                            >
                                Want to know when we launch?
                            </div>
                            <div
                                className="text-sm mb-3"
                                style={{ color: webApp?.themeParams.hint_color }}
                            >
                                Follow us for updates and launch announcements:
                            </div>
                            <div
                                className="text-base font-semibold"
                                style={{ color: webApp?.themeParams.button_color }}
                            >
                                t.me/opn_mkt
                            </div>
                        </div>

                        {/* Additional thank you message */}
                        <div
                            className="text-xs italic"
                            style={{ color: webApp?.themeParams.hint_color }}
                        >
                            Thank you for helping us build something amazing! ✨
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const getErrorMessage = () => {
        if (errors.telegram) return "Oops! Telegram went on a coffee break ☕";
        if (errors.auth) return "Whoops! Our handshake got tangled 🤝";
        if (errors.tonClient) return "TON network is taking a nap 💤";
        if (errors.factory) return "Our factory workers are on strike 🏭";
        if (errors.markets) return "Markets decided to play hide and seek 🎯";
        return "Something mysterious happened... 🧙‍♂️";
    };

    const getErrorDetails = () => {
        const details = [];
        if (errors.telegram) details.push("• Failed to connect to Telegram");
        if (errors.auth) details.push("• Authentication didn't work out");
        if (errors.tonClient) details.push("• TON network connection failed");
        if (errors.factory) details.push("• Smart contract factory issues");
        if (errors.markets) details.push("• Market data loading failed");
        return details;
    };

    const hasErrors = errors.telegram || errors.auth || errors.tonClient || errors.factory || errors.markets;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4"
                style={{ backgroundColor: webApp?.themeParams.bg_color }}>

                {/* Progress bar container */}
                {!hasErrors && (
                    <div className="w-full max-w-xs mb-6">
                        <div
                            className="text-xs text-center mb-2"
                            style={{ color: webApp?.themeParams.hint_color }} >
                            {initializationStage}
                        </div>
                        <div
                            className="w-full h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: webApp?.themeParams.secondary_bg_color || '#f3f4f6' }}
                        >
                            <div
                                className="h-full transition-all duration-500 ease-out rounded-full"
                                style={{
                                    width: `${animatedProgress}%`,
                                    background: `linear-gradient(90deg, 
                                        ${webApp?.themeParams.button_color || '#2481cc'}, 
                                        ${webApp?.themeParams.button_color || '#2481cc'}80)`
                                }}
                            />
                        </div>
                        <div
                            className="text-xs text-center mt-1"
                            style={{ color: webApp?.themeParams.hint_color }}
                        >
                            {Math.round(animatedProgress)}%
                        </div>
                    </div>
                )}

                {/* Loading spinner */}
                {!hasErrors && (
                    <ScaleLoader color={webApp?.themeParams.hint_color} />
                )}

                {/* Error display */}
                {hasErrors && (
                    <div className="w-full max-w-md p-6 rounded-lg text-center">
                        {/* Main humorous error message */}
                        <div className="mb-4">
                            <div
                                className="text-lg font-medium mb-2"
                                style={{ color: webApp?.themeParams.text_color }}
                            >
                                {getErrorMessage()}
                            </div>
                            <div
                                className="text-sm"
                                style={{ color: webApp?.themeParams.hint_color }}
                            >
                                Don't worry, even robots need reboots sometimes! 🤖
                            </div>
                        </div>

                        {/* Collapsible error details */}
                        <div className="mb-4">
                            <button
                                onClick={() => setShowErrorDetails(!showErrorDetails)}
                                className="flex items-center justify-center w-full text-sm px-4 py-2 rounded-lg transition-colors"
                                style={{
                                    backgroundColor: webApp?.themeParams.secondary_bg_color,
                                    color: webApp?.themeParams.hint_color
                                }}
                            >
                                <span className="mr-2">See what went wrong</span>
                                {showErrorDetails ? (
                                    <ChevronUpIcon className="w-4 h-4" />
                                ) : (
                                    <ChevronDownIcon className="w-4 h-4" />
                                )}
                            </button>

                            {showErrorDetails && (
                                <div
                                    className="mt-2 p-3 rounded-lg text-left text-sm"
                                    style={{
                                        backgroundColor: webApp?.themeParams.secondary_bg_color,
                                        color: webApp?.themeParams.text_color
                                    }}
                                >
                                    {getErrorDetails().map((detail, index) => (
                                        <div key={index} className="mb-1 last:mb-0">
                                            {detail}
                                        </div>
                                    ))}
                                    <div className="mt-2 text-xs opacity-75">
                                        (Don't panic! This is just for the tech wizards 🧙‍♂️)
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Retry button for non-Telegram errors */}
                        {errors.telegram && (
                            <button
                                onClick={() => retryInitialization()}
                                className="w-full px-4 py-3 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
                                style={{
                                    backgroundColor: webApp?.themeParams.button_color,
                                    color: webApp?.themeParams.button_text_color || '#ffffff'
                                }}
                            >
                                Give it another shot! 🎯
                            </button>
                        )}

                        {/* For non-Telegram errors, we show a different message since MainButton handles retry */}
                        {!errors.telegram && (
                            <div
                                className="text-xs mt-3"
                                style={{ color: webApp?.themeParams.hint_color }}
                            >
                                The retry button should appear below... if it's playing hide and seek too! 👇
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
