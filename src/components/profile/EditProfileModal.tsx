import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useUserStore } from '../../stores/userStore';


const EditProfileModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { nickname, bio, updateProfile } = useUserStore();
    const [formData, setFormData] = useState({ nickname, bio });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 800));
        updateProfile(formData);
        setIsLoading(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-gray-800/90 backdrop-blur-lg rounded-2xl w-full max-w-md border border-white/20 shadow-xl overflow-hidden"
                        onClick={e => e.stopPropagation()}
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-xl font-bold">Edit Profile</h3>
                                <button onClick={onClose} className="text-white/70 hover:text-white">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit}>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Nickname</label>
                                        <input
                                            type="text"
                                            name="nickname"
                                            value={formData.nickname}
                                            onChange={handleChange}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm text-white/70 mb-2">Bio</label>
                                        <textarea
                                            name="bio"
                                            value={formData.bio}
                                            onChange={handleChange}
                                            rows={3}
                                            className="w-full bg-black/30 border border-white/20 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`px-4 py-2 rounded-lg font-medium ${isLoading
                                                ? 'bg-blue-500/50 cursor-not-allowed'
                                                : 'bg-blue-500 hover:bg-blue-600'
                                            } transition-colors`}
                                    >
                                        {isLoading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default EditProfileModal;