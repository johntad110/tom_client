import { motion, AnimatePresence } from 'framer-motion';
import type { Position } from '../../types/portfolio';
import PositionCard from './PositionCard';


type PositionListProps = {
    positions: Position[];
    onSelect: (position: Position) => void;
};

const PositionList = ({ positions, onSelect }: PositionListProps) => {
    if (positions.length === 0) {
        return (
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/20">
                <p className="text-white/70">No positions found</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            <AnimatePresence>
                {positions.map((position, index) => (
                    ((position.noShares || position.yesShares) && <motion.div
                        key={position.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                        <PositionCard
                            position={position}
                            onClick={() => onSelect(position)}
                        />
                    </motion.div>)
                ))}
            </AnimatePresence>
        </div>
    );
};

export default PositionList;