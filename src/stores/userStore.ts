import { create } from 'zustand';
import { persist } from 'zustand/middleware';


type UserState = {
    token: string | null;
    isConnected: boolean;
    walletAddress: string | null;
    nickname: string;
    bio: string;
    profileImage: string | null;
    balance: number;
    isLoading: boolean;
    error: string | null;
    updateWalletState: (state: Partial<Pick<UserState, 'isConnected' | 'walletAddress' | 'isLoading'>>) => void;
    updateProfile: (updates: { nickname: string; bio: string }) => void;
    setToken: (toekn: string) => void;
};

export const useUserStore = create<UserState>()(
    persist(
        (set) => ({
            token: null,
            isConnected: false,
            walletAddress: null,
            nickname: "Octo T-raider",
            bio: "Crypto enthusiast and prediction market expert",
            profileImage: null,
            balance: 0,
            isLoading: false,
            error: null,
            updateWalletState: (state) => set(state),

            updateProfile: ({ nickname, bio }) => {
                set({ nickname, bio });
            },

            setToken: (token) => set({ token: token })
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