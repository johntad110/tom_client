import { motion } from 'framer-motion';

const OutcomeToggle = ({ outcome, setOutcome }: {
    outcome: 'YES' | 'NO';
    setOutcome: (outcome: 'YES' | 'NO') => void;
}) => {
    return (
        <div className="flex bg-white/10 rounded-lg p-1">
            {(['YES', 'NO'] as const).map((option) => (
                <button
                    key={option}
                    onClick={() => setOutcome(option)}
                    className={`flex-1 py-2 rounded-md relative ${outcome === option ? 'text-white' : 'text-white/60'
                        }`}
                >
                    {option}
                    {outcome === option && (
                        <motion.div
                            layoutId="outcome-indicator"
                            className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-red-500/20 rounded-md"
                            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
};

export default OutcomeToggle;