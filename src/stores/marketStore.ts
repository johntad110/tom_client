import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MarketStatus = 'open' | 'closed' | 'resolving' | 'resolved';

type Market = {
    id: string;
    question: string;
    description: string;
    status: MarketStatus;
    probability: number; // 0-100
    totalLiquidity: number; // TON in pool
    volume: number; // Trading volume
    history: {
        timestamp: string;
        probability: number;
    }[];
    outcomes: {
        YES: number; // Current price of YES share (0-1)
        NO: number; // Current price of NO share (0-1)
    };
    created: string;
    resolutionDate?: string;
    resolvedOutcome?: 'YES' | 'NO' | 'INVALID';
};

type MarketState = {
    markets: Market[];
    filteredMarkets: Market[];
    loading: boolean;
    error: string | null;
    filters: {
        status: MarketStatus | 'all';
        sort: 'newest' | 'oldest' | 'liquidity' | 'volume';
        search: string;
    };
    fetchMarkets: () => Promise<void>;
    applyFilters: (filters: Partial<MarketState['filters']>) => void;
    getMarketById: (id: string) => Market | undefined;
};

export const useMarketStore = create<MarketState>()(
    persist(
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

            fetchMarkets: async () => {
                set({ loading: true, error: null });
                try {
                    // Simulate API call with mock data
                    await new Promise(resolve => setTimeout(resolve, 200));

                    const mockMarkets: Market[] = [
                        {
                            id: '1',
                            question: 'Will Bitcoin reach $100K by December 2024?',
                            description: 'This market will resolve YES if Bitcoin reaches $100,000 or higher on any major exchange by December 31, 2024.',
                            status: 'open',
                            probability: 65,
                            totalLiquidity: 24500,
                            volume: 12000,
                            outcomes: { YES: 0.65, NO: 0.35 },
                            created: '2023-10-01',
                            history: [
                                { timestamp: '2023-10-01', probability: 55 },
                                { timestamp: '2023-10-15', probability: 60 },
                                { timestamp: '2023-11-01', probability: 62 },
                                { timestamp: '2023-11-15', probability: 65 },
                            ]
                        },
                        // More mock markets...
                    ];

                    set({
                        markets: mockMarkets,
                        filteredMarkets: mockMarkets,
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
                            return b.volume - a.volume;
                        default:
                            return 0;
                    }
                });

                set({ filteredMarkets: filtered, filters });
            },

            getMarketById: (id) => {
                return get().markets.find(m => m.id === id);
            }
        }),
        {
            name: 'market-storage',
        }
    )
);