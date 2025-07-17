import { motion } from 'framer-motion';


const LoadingShimmer = () => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen flex items-center justify-center px-4"
        >
            <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                <div className="flex flex-col items-center space-y-6">
                    {/* Profile header shimmer */}
                    <div className="flex items-center space-x-4 w-full">
                        <div className="bg-gray-200/30 rounded-full w-16 h-16 animate-pulse" />
                        <div className="flex-1 space-y-2">
                            <div className="h-6 bg-gray-200/30 rounded-lg w-3/4 animate-pulse" />
                            <div className="h-4 bg-gray-200/30 rounded-lg w-1/2 animate-pulse" />
                        </div>
                        <div className="bg-gray-200/30 rounded-full w-10 h-10 animate-pulse" />
                    </div>

                    {/* Wallet card shimmer */}
                    <div className="w-full space-y-4">
                        <div className="h-6 bg-gray-200/30 rounded-lg w-1/3 animate-pulse" />
                        <div className="h-4 bg-gray-200/30 rounded-lg w-1/2 animate-pulse" />
                        <div className="space-y-2">
                            <div className="h-12 bg-gray-200/30 rounded-lg animate-pulse" />
                            <div className="h-12 bg-gray-200/30 rounded-lg animate-pulse" />
                        </div>
                    </div>

                    {/* Stats card shimmer */}
                    <div className="w-full space-y-4">
                        <div className="h-6 bg-gray-200/30 rounded-lg w-1/3 animate-pulse" />
                        <div className="grid grid-cols-2 gap-4">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="h-20 bg-gray-200/30 rounded-lg animate-pulse" />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default LoadingShimmer;