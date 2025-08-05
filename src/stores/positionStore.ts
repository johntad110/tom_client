import { create } from 'zustand';
import { Address } from '@ton/core';
import { fetchUserPositions } from '../helpers/positionHelper';
import type { TonClient } from '@ton/ton';
import type { YesNoBalances } from '../types/position';
import { useFactoryStore } from './factoryStore';

interface PositionStore {
    positions: Record<string, {
        data: Partial<YesNoBalances>;
        lastFetched: number; // timestamp
    }>; // key -> marketId
    loading: boolean;
    error: string | null;
    fetchPositions: (
        client: TonClient,
        marketId: string,
        userAddress: Address,
        marketAddress: Address,
    ) => Promise<void>;
    fetchAllPositions: (client: TonClient, userAddress: Address) => Promise<void>;
    clearPositions: () => void;
}

export const userPositionStore = create<PositionStore>((set, get) => ({
    positions: {},
    loading: false,
    error: null,
    fetchPositions: async (client, marketId, userAddress, marketAddress) => {
        set({ loading: true, error: null });
        try {
            const positions = await fetchUserPositions(client, marketAddress, userAddress)
            const timestamp = Date.now();

            set((state) => ({
                positions: {
                    ...state.positions,
                    [marketId]: {
                        data: positions || { yes: null, no: null },
                        lastFetched: timestamp
                    }
                },
                loading: false
            }));
        } catch (err) {
            console.error('Failed to positions', err);
            set({ error: 'Failed to fetch positions', loading: false });
        }
    },
    fetchAllPositions: async (client, userAddress) => {
        console.log('[fetchAllPositions] fetching all positions')
        set({ loading: true, error: null });
        try {
            const { marketAddresses } = useFactoryStore.getState();
            const currentPositions = get().positions;
            const now = Date.now();
            const REFRESH_INTERVAL = 2 * 60 * 1000; // 2 min

            for (const [marketId, marketAddress] of Object.entries(marketAddresses)) {
                console.log(`[fetchAllPositions] fetching marketId ${marketId}`)
                const position = currentPositions[marketId];
                if (position && (now - position.lastFetched < REFRESH_INTERVAL)) { continue; }

                // fetch if no pos exists or needs refresh
                const positions = await fetchUserPositions(client, Address.parse(marketAddress), userAddress)
                console.log(`[fetchAllPositions] fetched marketId ${marketId}`)

                set((state) => ({
                    positions: {
                        ...state.positions,
                        [marketId]: {
                            data: positions || { yes: null, no: null },
                            lastFetched: Date.now()
                        }
                    }
                }))
            }
            set({ loading: false, error: null });
        } catch (error) {
            console.error('Failed to load all positions', error);
            set({ error: 'Failed to fetch positions', loading: false });
        }
    },
    clearPositions: () => set({ positions: {} })
}))