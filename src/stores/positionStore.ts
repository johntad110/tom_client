import { create } from 'zustand';
import { Address } from '@ton/core';
import { type YesNoBalances } from '../contracts/market';

interface PositionStore {
    positions: Record<string, Partial<YesNoBalances>>; // key -> marketId
    loading: boolean;
    error: string | null;
    fetchPositions: (
        marketId: string, 
        userAddress: Address, 
        getUserPositions: (userAddress: Address) => Promise<YesNoBalances | undefined>
    ) => Promise<void>;
    clearPositions: () => void;
}

export const userPositionStore = create<PositionStore>((set) => ({
    positions: {},
    loading: false,
    error: null,
    fetchPositions: async (marketId, userAddress, getUserPositions) => {
        set({ loading: true, error: null });
        try {
            const positions = await getUserPositions(userAddress);

            set((state) => ({
                positions: {
                    ...state.positions,
                    [marketId]: positions || { yes: null, no: null }
                },
                loading: false
            }));
        } catch (err) {
            console.error('Failed to positions', err);
            set({ error: 'Failed to fetch positions', loading: false });
        }
    },
    clearPositions: () => set({ positions: {} })
}))