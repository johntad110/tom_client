import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTelegramStore } from '../../stores/telegramStore';
import type { MarketStatus } from '../../types/market';

interface CountdownTimerProps {
    resolutionDate: string;
    marketStatus: MarketStatus;
}

const CountdownTimer = ({ resolutionDate, marketStatus }: CountdownTimerProps) => {
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams || {};

    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    const [isExpired, setIsExpired] = useState(false);

    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date(resolutionDate);
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();

            if (difference <= 0) {
                setIsExpired(true);
                return { days: 0, hours: 0, minutes: 0, seconds: 0 };
            }

            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((difference % (1000 * 60)) / 1000)
            };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        // Initialize immediately
        setTimeLeft(calculateTimeLeft());

        return () => clearInterval(timer);
    }, [resolutionDate]);

    if (isExpired) {
        return (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-2 px-4 rounded-lg mb-4"
                style={{
                    backgroundColor: theme.secondary_bg_color || '#2c2c2c',
                    color: theme.text_color || '#ffffff'
                }}
            >
                <span className="text-sm">Market {marketStatus === "resolved" ? "Resolved" : "Resolving"}</span>
            </motion.div>
        );
    }

    const TimeBlock = ({ value, label }: { value: number; label: string }) => (
        <motion.div
            initial={{ scale: 1, opacity: 1 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 300 }}
            key={`${value}-${label}`}
            className="flex flex-col items-center mx-1"
        >
            <div
                className="relative w-12 h-12 flex items-center justify-center rounded-lg overflow-hidden"
                style={{
                    backgroundColor: theme.secondary_bg_color || '#2481cc',
                    color: theme.text_color || '#ffffff'
                }}
            >
                <motion.span
                    key={value}
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className="text-lg font-bold-"
                >
                    {value.toString().padStart(2, '0')}
                </motion.span>
            </div>
        </motion.div>
    );

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-3 px-4 rounded-xl-"
            style={{
                backgroundColor: theme.section_bg_color || '#3a3a3a',
                color: theme.text_color || '#ffffff'
            }}
        >
            <div className="flex justify-around items-center space-x-2-">
                <TimeBlock value={timeLeft.days} label="DAYS" />
                <div className="text-xl font-bold" style={{ color: theme.button_color || '#2481cc' }}>:</div>
                <TimeBlock value={timeLeft.hours} label="HOURS" />
                <div className="text-xl font-bold" style={{ color: theme.button_color || '#2481cc' }}>:</div>
                <TimeBlock value={timeLeft.minutes} label="MINS" />
                <div className="text-xl font-bold" style={{ color: theme.button_color || '#2481cc' }}>:</div>
                <TimeBlock value={timeLeft.seconds} label="SECS" />
            </div>
        </motion.div>
    );
};

export default CountdownTimer;