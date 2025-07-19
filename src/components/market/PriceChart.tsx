import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';

const timeRanges = [
    { label: '1D', value: '1d' },
    { label: '1W', value: '1w' },
    { label: '1M', value: '1m' },
    { label: 'All', value: 'all' },
];

const PriceChart = ({ history }: { history: { timestamp: string; probability: number }[] }) => {
    const [timeRange, setTimeRange] = useState('all');

    // In a real app, we would filter the history based on timeRange
    const data = history.map((point) => ({
        date: point.timestamp,
        probability: point.probability,
        no: 100 - point.probability,
    }));

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/20 mt-6"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold">Price History</h3>
                <div className="flex space-x-1">
                    {timeRanges.map((range) => (
                        <button
                            key={range.value}
                            onClick={() => setTimeRange(range.value)}
                            className={`text-xs px-3 py-1 rounded-full transition-colors ${timeRange === range.value
                                    ? 'bg-blue-500 text-white'
                                    : 'bg-white/10 hover:bg-white/20'
                                }`}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="h-64 border border-gray-600">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                        <XAxis dataKey="date" stroke="rgba(255,255,255,0.5)" />
                        <YAxis stroke="rgba(255,255,255,0.5)" domain={[0, 100]} />
                        <Tooltip
                            contentStyle={{ backgroundColor: 'rgba(30,30,30,0.9)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '0.5rem' }}
                        />
                        <Line
                            type="monotone"
                            dataKey="probability"
                            stroke="#4ade80"
                            strokeWidth={2}
                            dot={{ r: 2, fill: '#4ade80' }}
                            activeDot={{ r: 6, fill: '#4ade80' }}
                            name="YES Probability"
                        />
                        <Line
                            type="monotone"
                            dataKey="no"
                            stroke="#f87171"
                            strokeWidth={2}
                            dot={{ r: 2, fill: '#f87171' }}
                            activeDot={{ r: 6, fill: '#f87171' }}
                            name="NO Probability"
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </motion.div>
    );
};

export default PriceChart;