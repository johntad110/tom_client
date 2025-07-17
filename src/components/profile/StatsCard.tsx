import { motion } from 'framer-motion';


const StatsCard = () => {
    // Mock data - would come from API when in prod 
    const stats = [
        { label: "Markets Traded", value: 24 },
        { label: "Total Trades", value: 142 },
        { label: "Profit/Loss", value: "+12.45 TON", isPositive: true },
        { label: "Win Rate", value: "68%" },
    ];

    return (
        <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
            <h3 className="text-lg font-bold mb-4">Trading Stats</h3>

            <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, index) => (
                    <div
                        key={index}
                        className="bg-black/20 p-4 rounded-lg flex flex-col items-center justify-center"
                    >
                        <span className="text-xl font-bold">
                            {stat.value}
                        </span>
                        <span className="text-xs text-white/70 mt-1">
                            {stat.label}
                        </span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};

export default StatsCard;