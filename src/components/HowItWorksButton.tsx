import { motion } from "framer-motion";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { QuestionMarkCircleIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useTelegramStore } from '../stores/telegramStore';
import { useOnboarding } from "../hooks/useOnboarding";

const HowItWorksButton = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [hasDismissed, setHasDismissed] = useState(false);
    const navigate = useNavigate();
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;
    const { hasCompletedOnboarding, markOnboardingCompleted } = useOnboarding();

    useEffect(() => {
        // Check if user has been onboarded before.
        const dismissed = hasCompletedOnboarding;
        setHasDismissed(dismissed);
    }, [hasCompletedOnboarding]);

    const handleDismiss = () => {
        setShowPopup(false);
        setHasDismissed(true);
        markOnboardingCompleted();
    };

    const handleLaunchOnboarding = () => {
        navigate('/onboarding');
        setShowPopup(false);
    };

    // Don't show if user has dismissed it
    if (hasDismissed) return null;

    return (
        <>
            {/* Floating Button */}
            <button
                onClick={() => setShowPopup(true)}
                className="fixed bottom-20 right-6 z-40 p-3 rounded-full shadow-lg backdrop-blur-sm transition-transform hover:scale-110"
                style={{
                    backgroundColor: theme?.button_color || '#0088cc',
                    color: theme?.button_text_color || '#ffffff'
                }}
            >
                <QuestionMarkCircleIcon className="w-6 h-6" />
            </button>

            {/* Popup Modal */}
            {showPopup && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="relative bg-white rounded-2xl p-6 max-w-sm mx-auto"
                        style={{
                            backgroundColor: theme?.secondary_bg_color,
                            color: theme?.text_color
                        }}
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleDismiss}
                            className="absolute top-3 right-3 p-1 rounded-full hover:bg-white/10 transition-colors"
                            style={{ color: theme?.hint_color }}
                        >
                            <XMarkIcon className="w-5 h-5" />
                        </button>

                        {/* Content */}
                        <div className="text-center">
                            <QuestionMarkCircleIcon className="w-12 h-12 mx-auto mb-4"
                                style={{ color: theme?.button_color }} />
                            <h3 className="text-lg font-semibold mb-2" style={{ color: theme?.text_color }}>
                                How It Works
                            </h3>
                            <p className="text-sm mb-6 opacity-80" style={{ color: theme?.hint_color }}>
                                New to prediction markets? Let TOM guide you through how to trade and win!
                            </p>

                            <div className="flex gap-3">
                                <button
                                    onClick={handleDismiss}
                                    className="flex-1 py-2 px-4 rounded-lg text-sm transition-colors"
                                    style={{
                                        backgroundColor: theme?.secondary_bg_color,
                                        color: theme?.hint_color,
                                        border: `1px solid ${theme?.section_separator_color}`
                                    }}
                                >
                                    Maybe later
                                </button>
                                <button
                                    onClick={handleLaunchOnboarding}
                                    className="flex-1 py-2 px-4 rounded-lg text-sm font-semibold transition-colors"
                                    style={{
                                        backgroundColor: theme?.button_color,
                                        color: theme?.button_text_color
                                    }}
                                >
                                    Show me
                                </button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </>
    );
};

export default HowItWorksButton;