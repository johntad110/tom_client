export type Position = {
  id: string;
  marketId: string;
  question: string;
  outcome: 'YES' | 'NO';
  shares: number;
  averagePrice: number;
  currentValue: number;
  profitLoss: number;
  status: 'open' | 'resolving' | 'resolved' | 'closed';
  resolvedOutcome?: 'YES' | 'NO' | 'INVALID';
  resolutionDate?: string;
};

export type PortfolioSummary = {
  totalValue: number;
  unrealizedProfit: number;
  realizedProfit: number;
  activePositions: number;
  resolvedPositions: number;
};