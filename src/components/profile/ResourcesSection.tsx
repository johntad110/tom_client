import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowTopRightOnSquareIcon,
    ChevronDownIcon,
    QuestionMarkCircleIcon,
    DocumentTextIcon,
    ChartBarIcon,
    ShieldCheckIcon,
    BookOpenIcon,
    HashtagIcon,
    AcademicCapIcon
} from "@heroicons/react/24/solid";
import { useTelegramStore } from "../../stores/telegramStore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResourcesSection() {
    const navigate = useNavigate();
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
    const [copiedResource, setCopiedResource] = useState<string | null>(null);

    const handleResourceCopy = (text: string) => {
        setCopiedResource(text);
        setTimeout(() => setCopiedResource(null), 2000);
    };

    const toggleCategory = (category: string) => {
        setExpandedCategory(expandedCategory === category ? null : category);
    };

    const resources = [
        {
            id: 'community',
            title: 'Community',
            icon: HashtagIcon,
            items: [
                {
                    title: 'Telegram Channel',
                    description: 'Join our official channel',
                    url: 'https://t.me/opn_mkt',
                    active: true,
                    external: true
                },
                {
                    title: 'X (Twitter)',
                    description: 'Follow us for updates',
                    url: 'https://x.com/TOMPrediction',
                    active: true,
                    external: true
                },
                {
                    title: 'Chat',
                    description: 'Chat with other traders',
                    url: 'https://t.me/+z1C5YULaYVMzZjk0',
                    active: true,
                    external: true
                }
            ]
        },
        {
            id: 'guides',
            title: 'Guides & Tutorials',
            icon: BookOpenIcon,
            items: [
                {
                    title: 'How It Works',
                    description: 'Learn about our trading system',
                    url: '',
                    active: false,
                    external: true
                },
                {
                    title: 'Getting Started Guide',
                    description: 'Step-by-step instructions for beginners',
                    url: '',
                    active: false,
                    external: true
                },
                {
                    title: 'Trading Strategies',
                    description: 'Expert tips and techniques',
                    url: '',
                    active: false,
                    external: true
                }
            ]
        },
        {
            id: 'support',
            title: 'Help & Support',
            icon: QuestionMarkCircleIcon,
            items: [
                {
                    title: 'FAQ',
                    description: 'Frequently asked questions',
                    url: '/faq',
                    active: false,
                    external: true
                },
                {
                    title: 'Contact Support',
                    description: 'Get help from our team',
                    url: 'mailto:',
                    active: false,
                    external: true
                },
                {
                    title: 'Report an Issue',
                    description: 'Found a bug? Let us know',
                    url: '',
                    active: false,
                    external: true
                }
            ]
        },
        {
            id: 'legal',
            title: 'Legal & Privacy',
            icon: ShieldCheckIcon,
            items: [
                {
                    title: 'Privacy Policy',
                    description: 'How we handle your data',
                    url: '',
                    active: false,
                    external: true
                },
                {
                    title: 'Terms of Service',
                    description: 'Our platform rules and guidelines',
                    url: '',
                    active: false,
                    external: true
                }
            ]
        },
        {
            id: 'analytics',
            title: 'Analytics',
            icon: ChartBarIcon,
            items: [
                {
                    title: 'Transaction History',
                    description: 'View your trading activity',
                    url: '/transactions',
                    active: false,
                    external: true
                },
                {
                    title: 'Market Statistics',
                    description: 'Current market trends',
                    url: '/market-stats',
                    active: false,
                    external: true
                }
            ]
        },
    ];

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-6 rounded-2xl"
            style={{ backgroundColor: theme?.secondary_bg_color }}
        >
            <h3 className="text-lg font-semibold mb-4 flex items-center" style={{ color: theme?.text_color }}>
                <AcademicCapIcon className="w-5 h-5 mr-2" />
                Resources
            </h3>

            <div className="space-y-2">
                {resources.map((category, index) => (
                    <motion.div
                        key={category.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 + index * 0.1 }}
                        className="rounded-lg overflow-hidden"
                        style={{ backgroundColor: theme?.bg_color }}
                    >
                        <button
                            onClick={() => toggleCategory(category.id)}
                            className="w-full flex items-center justify-between p-4 transition-colors"
                            style={{ color: theme?.text_color }}
                        >
                            <div className="flex items-center">
                                <category.icon className="w-5 h-5 mr-3" style={{ color: theme?.button_color }} />
                                <span className="font-medium">{category.title}</span>
                            </div>
                            <motion.div
                                animate={{ rotate: expandedCategory === category.id ? 180 : 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <ChevronDownIcon className="w-4 h-4 opacity-70" />
                            </motion.div>
                        </button>

                        <AnimatePresence>
                            {expandedCategory === category.id && (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-4 pb-3 space-y-2">
                                        {category.items.map((item, itemIndex) => (
                                            <motion.div
                                                key={itemIndex}
                                                initial={{ opacity: 0, x: -10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: itemIndex * 0.05 }}
                                            >
                                                <button
                                                    className="w-full flex items-center justify-between p-3 rounded-lg transition-colors hover:bg-white/5 hover:cursor-pointer"
                                                    style={{ color: theme?.text_color }}
                                                    onClick={() => {
                                                        if (item.active) {
                                                            if (item.external) {
                                                                window.open(item.url, '_blank', 'noopener,noreferrer');
                                                            } else {
                                                                navigate(item.url);
                                                                // window.location.href = item.url;
                                                            }
                                                        }
                                                    }}
                                                    disabled={!item.active}
                                                >
                                                    <div className="flex-1 min-w-0 text-left">
                                                        <div className="font-medium truncate">{item.title}</div>
                                                        <div className="text-xs opacity-70 truncate" style={{ color: theme?.hint_color }}>
                                                            {item.description}
                                                        </div>
                                                    </div>
                                                    <ArrowTopRightOnSquareIcon className="w-4 h-4 ml-2 flex-shrink-0 opacity-70" />
                                                </button>

                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                ))}
            </div>

            {/* Quick Actions Row */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + resources.length * 0.1 }}
                className="mt-6 pt-4 border-t"
                style={{ borderColor: theme?.section_separator_color }}
            >
                <div className="flex justify-between space-x-2">
                    <button
                        className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs transition-colors"
                        style={{
                            backgroundColor: theme?.button_color + '20',
                            color: theme?.button_color
                        }}
                    >
                        <DocumentTextIcon className="w-4 h-4 mr-1" />
                        Docs
                    </button>
                    <button
                        className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs transition-colors"
                        style={{
                            backgroundColor: theme?.button_color + '20',
                            color: theme?.button_color
                        }}
                    >
                        <QuestionMarkCircleIcon className="w-4 h-4 mr-1" />
                        Help
                    </button>
                    <button
                        className="flex-1 flex items-center justify-center py-2 px-3 rounded-lg text-xs transition-colors"
                        style={{
                            backgroundColor: theme?.button_color + '20',
                            color: theme?.button_color
                        }}
                        onClick={() => handleResourceCopy('https://t.me/opn_mkt_bot/trade')}
                    >
                        {copiedResource === 'https://t.me/opn_mkt_bot/trade' ? 'Copied!' : 'Invite Friends'}
                    </button>
                </div>
            </motion.div>
        </motion.div>
    )
}