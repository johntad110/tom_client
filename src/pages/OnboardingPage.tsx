import { useState, useCallback } from 'react';
import { motion, type PanInfo } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useTelegramStore } from '../stores/telegramStore';
import { ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useOnboarding } from '../hooks/useOnboarding';

const OnboardingPage = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [dragDirection, setDragDirection] = useState<'left' | 'right' | null>(null);
    const navigate = useNavigate();
    const { user } = useTelegramStore();
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;
    const { markOnboardingCompleted } = useOnboarding();

    const onboardingSteps = [
        {
            image: '/images/onboarding_1.png',
            title: 'Welcome to The Open Market',
            message: `🦇 Greetings, ${user?.first_name || 'trader'}… I'm TOM, your guide to The Open Market. Here, you can predict events, trade outcomes, and win TON.`,
            cta: "Let's begin",
            visualDescription: 'TOM standing with crystal ball, night sky background'
        },
        {
            image: '/images/onboarding_2.png',
            title: 'Choose Your Outcome',
            message: 'Markets open on real-world events (sports, politics, crypto, and more). You choose the outcome you believe in.',
            cta: 'Next',
            visualDescription: 'TOM pointing at holographic market board'
        },
        {
            image: '/images/onboarding_3.png',
            title: 'Trade Like a Pro',
            message: 'Buy and sell outcome tokens just like trading shares. Prices move as people bet — so the market odds are always live.',
            cta: 'Next',
            visualDescription: 'TOM holding glowing outcome cards'
        },
        {
            image: '/images/onboarding_4.png',
            title: 'Win Big',
            message: 'When the event ends, the winning outcome pays out. If you chose wisely, you win TON coins!',
            cta: 'Next',
            visualDescription: 'TOM tossing golden TON coins'
        },
        {
            image: '/images/onboarding_5.png',
            title: 'Ready to Predict?',
            message: 'Now that you know the rules… are you ready to predict the future?',
            cta: 'Browse Markets',
            visualDescription: 'TOM inviting you forward with glowing portal'
        }
    ];

    const nextStep = useCallback(() => {
        if (currentStep < onboardingSteps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            markOnboardingCompleted();
            navigate('/');
        }
    }, [currentStep, onboardingSteps.length, markOnboardingCompleted, navigate]);

    const prevStep = useCallback(() => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    }, [currentStep]);

    const skipOnboarding = () => {
        markOnboardingCompleted();
        navigate('/');
    };

    const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset, velocity } = info;

        // If drag is significant enough, change step
        if (Math.abs(offset.x) > 100 || Math.abs(velocity.x) > 500) {
            if (offset.x > 0 || velocity.x > 0) {
                // Swipe right - go to previous step
                prevStep();
            } else {
                // Swipe left - go to next step
                nextStep();
            }
        }
        setDragDirection(null);
    };

    const handleDrag = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset } = info;
        if (Math.abs(offset.x) > 20) {
            setDragDirection(offset.x > 0 ? 'right' : 'left');
        }
    };

    const current = onboardingSteps[currentStep];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ backgroundColor: theme?.bg_color || '#0f0f23' }}
        >
            {/* Close Button */}
            <button
                onClick={skipOnboarding}
                className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-white/10 transition-colors"
                style={{ color: theme?.text_color || '#ffffff' }}
            >
                <XMarkIcon className="w-6 h-6" />
            </button>

            <div className="w-full max-w-md h-full max-h-[600px] flex flex-col">
                {/* Progress Bar */}
                <div className="mb-6">
                    <div className="h-1 bg-white/20 rounded-full">
                        <motion.div
                            initial={{ width: '0%' }}
                            animate={{ width: `${((currentStep + 1) / onboardingSteps.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                            className="h-full rounded-full"
                            style={{ backgroundColor: theme?.button_color || '#0088cc' }}
                        />
                    </div>
                </div>

                {/* Swipeable Comic Panel */}
                <motion.div
                    key={currentStep}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    onDrag={handleDrag}
                    onDragEnd={handleDragEnd}
                    whileTap={{ cursor: "grabbing" }}
                    className="flex-1 relative mb-6 rounded-2xl overflow-hidden border-4 border-white/20 cursor-grab active:cursor-grabbing"
                    style={{
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                        perspective: '1000px'
                    }}
                >
                    {/* Comic panel border effect */}
                    <div className="absolute inset-0 border-2 border-white/10 rounded-xl pointer-events-none" />

                    {/* Next/Previous Step Previews */}
                    {dragDirection && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.3 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            {dragDirection === 'left' && currentStep < onboardingSteps.length - 1 && (
                                <div className="text-white text-lg font-bold">Next →</div>
                            )}
                            {dragDirection === 'right' && currentStep > 0 && (
                                <div className="text-white text-lg font-bold">← Previous</div>
                            )}
                        </motion.div>
                    )}

                    <img
                        src={current.image}
                        alt={current.visualDescription}
                        className="w-full h-full object-cover"
                    />

                    {/* Comic-style speech bubble */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="absolute bottom-4 left-4 right-4 bg-black/70 backdrop-blur-sm rounded-2xl p-4 border-2 border-white/20"
                        style={{
                            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <div className="text-center">
                            <h3 className="font-bold mb-2 text-white">
                                {current.title}
                            </h3>
                            <p className="text-white/90 text-xs leading-relaxed">
                                {current.message}
                            </p>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Navigation */}
                <div className="flex items-center justify-between space-x-4">
                    {/* Previous Button */}
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className={`flex items-center px-4 py-3 rounded-xl transition-colors ${currentStep === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-white/10'
                            }`}
                        style={{
                            backgroundColor: theme?.secondary_bg_color,
                            color: theme?.text_color
                        }}
                    >
                        <ChevronLeftIcon className="w-5 h-5" />
                    </button>

                    {/* Step Indicators */}
                    <div className="flex space-x-2">
                        {onboardingSteps.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentStep(index)}
                                className={`w-2 h-2 rounded-full transition-all ${index === currentStep
                                    ? 'scale-125'
                                    : 'hover:scale-110'
                                    }`}
                                style={{
                                    backgroundColor: index === currentStep
                                        ? theme?.button_color || '#0088cc'
                                        : theme?.hint_color + '60' || '#ffffff60'
                                }}
                            />
                        ))}
                    </div>

                    {/* Next/Complete Button */}
                    <motion.button
                        onClick={nextStep}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 flex items-center justify-center py-3 px-6 rounded-xl transition-colors"
                        style={{
                            backgroundColor: theme?.button_color,
                            color: theme?.button_text_color
                        }}
                    >
                        {currentStep === onboardingSteps.length - 1 ? (
                            current.cta
                        ) : (
                            <>
                                {current.cta}
                                <ChevronRightIcon className="w-5 h-5 ml-2" />
                            </>
                        )}
                    </motion.button>
                </div>

                {/* Swipe Hint */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.7 }}
                    transition={{ delay: 2 }}
                    className="text-center mt-4 text-sm"
                    style={{ color: theme?.hint_color }}
                >
                    ← Swipe to navigate →
                </motion.div>

                {/* Skip for new users */}
                {currentStep === 0 && (
                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        onClick={skipOnboarding}
                        className="text-center mt-4 text-sm opacity-70 hover:opacity-100 transition-opacity"
                        style={{ color: theme?.hint_color }}
                    >
                        Skip introduction
                    </motion.button>
                )}
            </div>
        </motion.div>
    );
};

export default OnboardingPage;