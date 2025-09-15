import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    ReferenceDot
} from 'recharts';
import { useTelegramStore } from '../../stores/telegramStore';
import { ArrowUpIcon, ArrowDownIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/solid';
import type { Market } from '../../types/market';
import ShareButton from '../ShareButtton';

const timeRanges = [
    { label: '1H', value: '1h' },
    { label: '6H', value: '6h' },
    { label: '1D', value: '1d' },
    { label: '1W', value: '1w' },
    { label: '1M', value: '1m' },
    { label: 'All', value: 'all' },
];

const formatTimestamp = (timestamp: number, range: string) => {
    const date = new Date(timestamp * 1000);
    switch (range) {
        case '1h':
        case '6h':
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        case '1d':
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        case '1w':
            return date.toLocaleDateString([], { weekday: 'short' });
        case '1m':
            return date.toLocaleDateString([], { day: 'numeric', month: 'short' });
        default:
            return date.toLocaleDateString([], { day: 'numeric', month: 'short', year: '2-digit' });
    }
};

const CustomTooltip = ({ active, payload, label, theme }: any) => {
    if (active && payload && payload.length) {
        return (
            <div
                className="p-2 rounded-md shadow-md text-[11px]"
                style={{
                    backgroundColor: theme?.secondary_bg_color || '#3a3a3a',
                    color: theme?.text_color || '#ffffff',
                    border: `1px solid ${theme?.section_separator_color || '#4a4a4a'}`
                }}
            >
                <p>{`Yes: ${(payload[0].value * 100).toFixed(1)}%`}</p>
                <p>{new Date(label * 1000).toLocaleString()}</p>
            </div>
        );
    }
    return null;
};

const PriceChart = ({ priceNow, market }: { priceNow: number; market: Market }) => {
    const [timeRange, setTimeRange] = useState('all');
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;
    const history = market.history;

    const processedData = useMemo(() => {
        const now = Math.floor(Date.now() / 1000);
        let cutoffTime = now;

        switch (timeRange) {
            case '1h':
                cutoffTime = now - 60 * 60;
                break;
            case '6h':
                cutoffTime = now - 6 * 60 * 60;
                break;
            case '1d':
                cutoffTime = now - 24 * 60 * 60;
                break;
            case '1w':
                cutoffTime = now - 7 * 24 * 60 * 60;
                break;
            case '1m':
                cutoffTime = now - 30 * 24 * 60 * 60;
                break;
            case 'all':
            default:
                cutoffTime = 0;
                break;
        }

        let filteredData = history || [];
        if (history && history.length > 0) { filteredData = history.filter(item => item.timestamp >= cutoffTime) }
        const processed = filteredData.map(item => {
            // For outcome 0 (NO shares), the YES chance is 1 - price
            // For outcome 1 (YES shares), the YES chance is the price itself
            const yesChance = item.outcome === 0 ? 1 - item.price : item.price;
            return {
                ...item,
                chance: yesChance, // Store the chance as a decimal (0-1)
                displayTime: formatTimestamp(item.timestamp, timeRange),
                fullTimestamp: item.timestamp
            };
        });
        const sortedData = processed.sort((a, b) => a.timestamp - b.timestamp);

        // Add current price as the last data point if we have history
        if (sortedData.length > 0) {
            sortedData.push({
                ...sortedData[sortedData.length - 1], // Copy last item's structure
                chance: priceNow,
                timestamp: now,
                fullTimestamp: now,
                displayTime: 'Now',
                price: priceNow,
                outcome: 1
            });
        } else if (priceNow !== undefined) {
            // If no history but we have current price, create a single data point
            sortedData.push({
                chance: priceNow,
                timestamp: now,
                fullTimestamp: now,
                displayTime: 'Now',
                price: priceNow,
                outcome: 1,
                action: true, // true means purchase
                address: 'current'
            });
        }

        return sortedData;
    }, [history, timeRange, priceNow]);

    const priceInfo = useMemo(() => {
        if (!processedData || processedData.length === 0) {
            return { currentChance: priceNow || 0, chanceChange: 0, percentChange: 0 };
        }

        const currentChance = priceNow;
        let startChance = processedData[0].chance;

        // For very short time ranges, we might not have enough data
        if (processedData.length === 1) {
            startChance = currentChance;
        }

        const chanceChange = currentChance - startChance;
        const percentChange = startChance !== 0 ? (chanceChange / startChance) * 100 : 0;

        return {
            currentChance,
            chanceChange,
            percentChange
        };
    }, [processedData, priceNow]);

    const getTimeRangeLabel = () => {
        switch (timeRange) {
            case '1h': return 'Last Hour';
            case '6h': return 'Last 6 Hours';
            case '1d': return 'Today';
            case '1w': return 'Last Week';
            case '1m': return 'Last Month';
            case 'all': return 'All Time';
            default: return 'Today';
        }
    };

    // Determine colors based on chance change
    const isPositive = priceInfo.chanceChange >= 0;
    const valueColor = isPositive ?
        (theme?.button_color || '#10b981') :
        (theme?.destructive_text_color || '#ef4444');
    const bgColor = isPositive ?
        (theme?.button_color ? `${theme.button_color}30` : '#10b98130') :
        (theme?.destructive_text_color ? `${theme.destructive_text_color}30` : '#ef444430');

    if ((!history || history.length === 0) && priceNow === undefined) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="p-4 flex flex-col items-center justify-center h-64"
                style={{ background: theme?.bg_color }}
            >
                <div className="text-lg" style={{ color: theme?.text_color }}>
                    New Market
                </div>
                <div className="text-sm mt-2" style={{ color: theme?.hint_color }}>
                    No trading activity yet
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-4"
            style={{ background: theme?.bg_color }}
        >
            <ShareButton market={market} chartData={processedData} />
            {/* Price information */}
            <div className='mb-4'>
                <div
                    className='font-bold text-2xl flex gap-2 items-end'
                    style={{ color: theme?.text_color }}
                >
                    {(priceInfo.currentChance * 100).toFixed(1)}%
                    <p className='text-lg font-light' style={{ color: theme?.hint_color }}>YES</p>
                </div>
                <div className='flex gap-2 items-center mt-1'>
                    <div
                        className='flex justify-center items-center gap-1 text-xs p-1 rounded-md'
                        style={{
                            backgroundColor: bgColor,
                            color: valueColor
                        }}
                    >
                        {isPositive ? <ArrowUpIcon className='size-3' /> : <ArrowDownIcon className='size-3' />}
                        {Math.abs(priceInfo.percentChange).toFixed(2)}%
                    </div>
                    <div
                        className='flex justify-center items-center gap-1 text-xs p-1 rounded-md'
                        style={{
                            backgroundColor: bgColor,
                            color: valueColor
                        }}
                    >
                        {isPositive ? <PlusIcon className='size-3' /> : <MinusIcon className='size-3' />}
                        {Math.abs(priceInfo.chanceChange * 100).toFixed(1)}%
                    </div>
                    <div
                        className='text-xs'
                        style={{ color: theme?.hint_color }}
                    >
                        {getTimeRangeLabel()}
                    </div>

                    {/* Real-time indicator */}
                    <div className="flex items-center ml-2">
                        <div
                            className={`h-2 w-2 rounded-full mr-1 animate-pulse`}
                            style={{
                                backgroundColor: theme?.button_color || '#3b82f6',
                            }}
                        />
                        <span
                            className="text-xs"
                            style={{ color: theme?.hint_color }}
                        >
                            Live
                        </span>
                    </div>
                </div>
            </div>

            {/* Chart */}
            <div className="mb-4 h-64">
                {processedData.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }} data={processedData}>
                            <XAxis
                                dataKey="fullTimestamp"
                                tickFormatter={(timestamp) => formatTimestamp(timestamp, timeRange)}
                                stroke={theme?.hint_color || '#999999'}
                                fontSize={9}
                            />
                            <YAxis
                                width={30}
                                domain={[0, 1]}
                                stroke={theme?.hint_color || '#999999'}
                                fontSize={9}
                                tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
                            // orientation="right"
                            />
                            <Tooltip
                                content={<CustomTooltip theme={theme} />}
                                cursor={{
                                    stroke: theme?.section_separator_color || '#4a4a4a',
                                    strokeWidth: 1
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="chance"
                                stroke={valueColor}
                                strokeWidth={2}
                                dot={false}
                                activeDot={{
                                    r: 4,
                                    fill: valueColor,
                                    stroke: theme?.bg_color || '#ffffff',
                                    strokeWidth: 2
                                }}
                            />
                            {/* Current chance indicator */}
                            {processedData.length > 0 && (
                                <ReferenceDot
                                    x={processedData[processedData.length - 1]?.fullTimestamp}
                                    y={processedData[processedData.length - 1]?.chance}
                                    r={4}
                                    fill={valueColor}
                                    stroke={theme?.bg_color || '#ffffff'}
                                    strokeWidth={2}
                                />
                            )}
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div
                        className="h-full flex items-center justify-center"
                        style={{ color: theme?.hint_color }}
                    >
                        No data available for selected time range
                    </div>
                )}
            </div>

            {/* Time range selector */}
            <div
                className="flex justify-between rounded-full p-1"
                style={{ backgroundColor: theme?.secondary_bg_color }}
            >
                {timeRanges.map((range) => (
                    <motion.button
                        key={range.value}
                        onClick={() => setTimeRange(range.value)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`text-xs px-4 py-2 rounded-full transition-colors`}
                        style={{
                            backgroundColor: (timeRange === range.value) ? theme?.button_color : 'transparent',
                            color: (timeRange === range.value) ? theme?.button_text_color : theme?.text_color,
                        }}
                    >
                        {range.label}
                    </motion.button>
                ))}
            </div>
        </motion.div>
    );
};

export default PriceChart;
