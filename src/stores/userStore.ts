import { create } from 'zustand';
import { persist } from 'zustand/middleware';


type UserState = {
    isConnected: boolean;
    walletAddress: string | null;
    nickname: string;
    bio: string;
    profileImage: string | null;
    balance: number;
    isLoading: boolean;
    error: string | null;
    connectWallet: () => Promise<void>;
    disconnectWallet: () => void;
    updateProfile: (updates: { nickname: string; bio: string }) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            isConnected: false,
            walletAddress: null,
            nickname: "Octo T-raider",
            bio: "Crypto enthusiast and prediction market expert",
            profileImage: null,
            balance: 0,
            isLoading: false,
            error: null,

            connectWallet: async () => {
                set({ isLoading: true, error: null });
                try {
                    // Mock implementation - will use TON Connect latter
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    set({
                        isConnected: true,
                        walletAddress: "EQCvYbL7QD...Xr5qZ0",
                        balance: 123.45,
                        isLoading: false
                    });
                } catch (err) {
                    console.log('Wallet connection failed: ', err)
                    set({ error: "Wallet connection failed", isLoading: false });
                }
            },

            disconnectWallet: () => {
                set({
                    isConnected: false,
                    walletAddress: null,
                    balance: 0
                });
            },

            updateProfile: ({ nickname, bio }) => {
                set({ nickname, bio });
            }
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                nickname: state.nickname,
                bio: state.bio,
                profileImage: state.profileImage
            })
        }
    )
);