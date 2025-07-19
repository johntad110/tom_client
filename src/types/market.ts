import type { TonClient } from "@ton/ton";

export type MarketStatus = 'open' | 'closed' | 'resolving' | 'resolved';

export type Market = {
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

export type MarketState = {
    markets: Market[];
    filteredMarkets: Market[];
    loading: boolean;
    error: string | null;
    filters: {
        status: MarketStatus | 'all';
        sort: 'newest' | 'oldest' | 'liquidity' | 'volume';
        search: string;
    };
    fetchMarkets: (client: TonClient) => Promise<void>;
    applyFilters: (filters: Partial<MarketState['filters']>) => void;
    getMarketById: (id: string) => Market | undefined;
};
