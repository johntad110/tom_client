import { create } from 'zustand';
import { Address } from '@ton/core';
import { fetchUserPositions } from '../helpers/positionHelper';
import type { TonClient } from '@ton/ton';
import type { YesNoBalances } from '../types/position';

interface PositionStore {
    positions: Record<string, Partial<YesNoBalances>>; // key -> marketId
    loading: boolean;
    error: string | null;
    fetchPositions: (
        client: TonClient,
        marketId: string,
        userAddress: Address,
        marketAddress: Address,
    ) => Promise<void>;
    clearPositions: () => void;
}

export const userPositionStore = create<PositionStore>((set) => ({
    positions: {},
    loading: false,
    error: null,
    fetchPositions: async (client, marketId, userAddress, marketAddress) => {
        set({ loading: true, error: null });
        try {
            const positions = await fetchUserPositions(client, marketAddress, userAddress)

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