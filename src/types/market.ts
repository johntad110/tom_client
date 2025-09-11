import type { Address, TonClient } from "@ton/ton";

export type MarketStatus = 'open' | 'closed' | 'resolving' | 'resolved';

export type Market = {
    id: string;
    question: string;
    description: string;
    status: MarketStatus;
    probability: number; // 0-100 - yes chance
    probabilities: { yes: number; no: number; }; // redundancy
    totalLiquidity: number; // TON in pool
    history: MarketHistory[];
    created: string;
    resolutionDate?: string;
    resolvedOutcome?: 'YES' | 'NO' | 'INVALID';
    feeBps: number;
    oracleAddr: Address;
    closeTimestamp: number;
    resolved: boolean;
    outcome: boolean | null;
    factory: Address;
    version: number;
    totalVolume: number;
    yesVolume: number;
    noVolume: number;
    creator: Address | null;
    createdBy: string | null;
    askedBy: string | null;
    bannerImage: string | null;
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

export type MarketHistory = {
    timestamp: number;
    price: number;
    action: boolean;
    outcome: number;
    address: string;
}