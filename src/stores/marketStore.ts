import { create } from 'zustand';
import { useFactoryStore } from './factoryStore';
import type { MarketState } from '../types/market';
import { fetchMarketData } from '../helpers/marketHelper';

export const useMarketStore = create<MarketState>()(
    (set, get) => ({
        markets: [],
        filteredMarkets: [],
        loading: false,
        error: null,
        filters: {
            status: 'all',
            sort: 'newest',
            search: ''
        },

        fetchMarkets: async (client) => {
            const {
                nextMarketId,
                marketAddresses
            } = useFactoryStore.getState();
            if (!nextMarketId || nextMarketId === 0) {
                set({ markets: [], filteredMarkets: [], loading: false });
                return;
            }

            set({ loading: true, error: null });

            try {
                const marketPromises = [];
                for (let id = 0; id < nextMarketId; id++) {
                    const address = marketAddresses[id];
                    if (!address) continue;
                    marketPromises.push(fetchMarketData(client, address, id));
                }

                const markets = await Promise.all(marketPromises);

                set({
                    markets,
                    filteredMarkets: markets,
                    loading: false
                });
            } catch (err) {
                console.log('Failed to load markets.', err)
                set({ error: 'Failed to load markets', loading: false });
            }
        },

        applyFilters: (newFilters) => {
            const state = get();
            const filters = { ...state.filters, ...newFilters };

            let filtered = [...state.markets];

            // Apply status filter
            if (filters.status !== 'all') {
                filtered = filtered.filter(m => m.status === filters.status);
            }

            // Apply search filter
            if (filters.search) {
                const searchLower = filters.search.toLowerCase();
                filtered = filtered.filter(m =>
                    m.question.toLowerCase().includes(searchLower) ||
                    m.description.toLowerCase().includes(searchLower)
                );
            }

            // Apply sorting
            filtered.sort((a, b) => {
                switch (filters.sort) {
                    case 'newest':
                        return new Date(b.created).getTime() - new Date(a.created).getTime();
                    case 'oldest':
                        return new Date(a.created).getTime() - new Date(b.created).getTime();
                    case 'liquidity':
                        return b.totalLiquidity - a.totalLiquidity;
                    case 'volume':
                        return b.totalVolume - a.totalVolume;
                    default:
                        return 0;
                }
            });

            set({ filteredMarkets: filtered, filters });
        },

        getMarketById: (id) => {
            return get().markets.find(m => m.id === id);
        }
    })
);