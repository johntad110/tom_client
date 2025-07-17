// src/components/LoadingShimmer.tsx
import { motion } from 'framer-motion';

const LoadingShimmer = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-6 px-4 pb-24"
        >
            <div className="max-w-md mx-auto space-y-6">
                {/* Floating filter shimmer */}
                <div className="fixed top-4 right-4 z-20">
                    <div className="bg-white/10 backdrop-blur-lg rounded-full p-3 border border-white/20 shadow-lg w-12 h-12" />
                </div>

                {/* Market cards shimmer */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg overflow-hidden"
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: 0.8 }}
                        transition={{ delay: i * 0.1, repeat: Infinity, repeatType: "reverse", duration: 1 }}
                    >
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-4">
                                <div className="h-6 w-3/4 bg-white/20 rounded"></div>
                                <div className="h-6 w-16 bg-white/20 rounded"></div>
                            </div>

                            <div className="h-4 bg-white/10 rounded-full mb-3"></div>

                            <div className="flex justify-between items-center mt-4">
                                <div>
                                    <div className="h-4 w-20 bg-white/20 rounded mb-1"></div>
                                    <div className="h-4 w-16 bg-white/20 rounded"></div>
                                </div>
                                <div>
                                    <div className="h-4 w-20 bg-white/20 rounded mb-1"></div>
                                    <div className="h-4 w-16 bg-white/20 rounded"></div>
                                </div>
                            </div>
                        </div>

                        <div className="border-t border-white/10 p-3 bg-white/5">
                            <div className="h-8 w-full bg-white/20 rounded-lg"></div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default LoadingShimmer;