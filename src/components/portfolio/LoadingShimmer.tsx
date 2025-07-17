import { motion } from 'framer-motion';

const LoadingShimmer = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-6 px-4 pb-24"
        >
            <div className="max-w-md mx-auto space-y-6">
                {/* Portfolio Summary Shimmer */}
                <motion.div
                    className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 0.8 }}
                    transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                >
                    <div className="flex justify-between mb-6">
                        <div>
                            <div className="h-6 w-32 bg-white/20 rounded mb-2"></div>
                            <div className="h-8 w-48 bg-white/20 rounded"></div>
                        </div>
                        <div className="h-8 w-24 bg-white/20 rounded"></div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-20 bg-white/10 rounded-lg"></div>
                        ))}
                    </div>
                </motion.div>

                {/* Position Filters Shimmer */}
                <div className="flex bg-white/10 backdrop-blur-lg rounded-xl p-1 border border-white/20">
                    <div className="flex-1 py-2 text-center bg-white/20 rounded-lg"></div>
                    <div className="flex-1 py-2 text-center"></div>
                </div>

                {/* Position List Shimmer */}
                <div className="space-y-3">
                    {[...Array(3)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
                            initial={{ opacity: 0.5 }}
                            animate={{ opacity: 0.8 }}
                            transition={{ delay: i * 0.1, repeat: Infinity, repeatType: "reverse", duration: 1 }}
                        >
                            <div className="flex justify-between">
                                <div className="flex-1 min-w-0">
                                    <div className="flex space-x-2 mb-2">
                                        <div className="h-6 w-16 bg-white/20 rounded"></div>
                                        <div className="h-6 w-16 bg-white/20 rounded"></div>
                                    </div>
                                    <div className="h-5 w-48 bg-white/20 rounded mb-3"></div>
                                </div>
                                <div className="h-6 w-16 bg-white/20 rounded"></div>
                            </div>

                            <div className="flex justify-between mt-4">
                                <div>
                                    <div className="h-4 w-20 bg-white/20 rounded mb-1"></div>
                                    <div className="h-4 w-12 bg-white/20 rounded"></div>
                                </div>
                                <div>
                                    <div className="h-4 w-20 bg-white/20 rounded mb-1"></div>
                                    <div className="h-4 w-12 bg-white/20 rounded"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingShimmer;