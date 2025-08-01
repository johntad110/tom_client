import { create } from 'zustand';

type FactoryState = {
    factoryAddress: string | null;
    nextMarketId: number | null;
    marketAddresses: Record<number, string>; // marketId -> address
    loading: boolean;
    error: string | null;
    setFactoryData: (data: {
        factoryAddress: string;
        nextMarketId: number;
    }) => void;
    addMarketAddress: (marketId: number, address: string) => void;
    clearFactoryData: () => void;
};

export const useFactoryStore = create<FactoryState>()(
    (set) => ({
        factoryAddress: null,
        nextMarketId: null,
        marketAddresses: {},
        loading: false,
        error: null,
        setFactoryData: (data) => set({
            factoryAddress: data.factoryAddress,
            nextMarketId: data.nextMarketId
        }),
        addMarketAddress: (marketId, address) => set((state) => ({
            marketAddresses: {
                ...state.marketAddresses,
                [marketId]: address
            }
        })),
        clearFactoryData: () => set({
            factoryAddress: null,
            nextMarketId: null,
            marketAddresses: {},
        })
    })
);