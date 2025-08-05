export type Position = {
  id: string;
  marketId: string;
  question: string;
  yesShares: number;
  noShares: number;
  yesAveragePrice?: number;
  noAveragePrice?: number;
  currentYesValue?: number;
  currentNoValue?: number;
  yesProfitLoss?: number;
  noProfitLoss?: number;
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