import { create } from 'zustand';

type TradeState = {
    marketId: string | null;
    outcome: 'YES' | 'NO';
    quantity: number;
    setTradeParams: (marketId: string, outcome: 'YES' | 'NO', quantity: number) => void;
    reset: () => void;
};

export const useTradeStore = create<TradeState>((set) => ({
    marketId: null,
    outcome: 'YES',
    quantity: 10,
    setTradeParams: (marketId, outcome, quantity) => set({ marketId, outcome, quantity }),
    reset: () => set({ marketId: null, outcome: 'YES', quantity: 10 }),
}));