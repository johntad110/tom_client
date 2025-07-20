import { motion } from 'framer-motion';
import { isTestnet } from '../config';
import { InformationCircleIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const NetworkBanner = () => {
    const [isVisible, setIsVisible] = useState(isTestnet);

    if (!isVisible) return null;

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-r from-amber-500 to-pink-500 text-white px-4 py-3 shadow-lg"
        >
            <div className="max-w-3xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <InformationCircleIcon className="h-10 w-10" />
                    <span className="font-medium">
                        You're using Testnet - Funds have no real value
                    </span>
                </div>
                <button
                    onClick={() => setIsVisible(false)}
                    className="text-white/80 hover:text-white transition-colors"
                    aria-label="Dismiss"
                >
                    &times;
                </button>
            </div>
            <a
                href="https://t.me/testgiver_ton_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-2"
            >
                Get Testnet TON
            </a>
        </motion.div>
    );
};

export default NetworkBanner;