import { motion } from 'framer-motion';

const ProbabilityBar = ({ probability }: { probability: number }) => {
    return (
        <div className="relative h-6 bg-white/10 rounded-full overflow-hidden mb-3">
            <motion.div
                className="absolute top-0 left-0 h-full bg-green-500/70"
                initial={{ width: '0%' }}
                animate={{ width: `${probability}%` }}
                transition={{ duration: 0.8 }}
            >
                <span className="absolute top-1/2 left-2 transform -translate-y-1/2 text-xs font-bold text-white">
                    YES {probability.toFixed(4)}%
                </span>
            </motion.div>
            <motion.div
                className="absolute top-0 right-0 h-full bg-red-500/70"
                initial={{ width: '0%' }}
                animate={{ width: `${100 - probability}%` }}
                transition={{ duration: 0.8 }}
            >
                <span className="absolute top-1/2 right-2 transform -translate-y-1/2 text-xs font-bold text-white">
                    NO {(100 - probability).toFixed(4)}%
                </span>
            </motion.div>
        </div>
    );
};

export default ProbabilityBar;