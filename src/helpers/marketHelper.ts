import { BinaryMarket } from "../contracts/market";
import { Address, type OpenedContract } from "@ton/core";
import { TonClient } from "@ton/ton";
import type { Market, MarketStatus } from "../types/market";

export async function fetchMarketData(
    client: TonClient,
    address: string,
    marketId: number
): Promise<Market> {
    const contract = new BinaryMarket(Address.parse(address));
    const marketContract = client.open(contract) as OpenedContract<BinaryMarket>;
    const marketState = await marketContract.getGetMarketState();

    const reserveYes = Number(marketState.reserveYes) / 1_000_000_000;
    const reserveNo = Number(marketState.reserveNo) / 1_000_000_000;
    const totalLiquidity = reserveYes + reserveNo;
    const probability = totalLiquidity > 0 ? (reserveNo / totalLiquidity) * 100 : 50;
    const yesPrice = totalLiquidity > 0 ? reserveNo / totalLiquidity : 0.5;
    const noPrice = totalLiquidity > 0 ? reserveYes / totalLiquidity : 0.5;

    const now = Date.now() / 1000;
    const closeTime = Number(marketState.closeTimestamp);
    let status: MarketStatus;

    if (marketState.outcome !== null) {
        status = 'resolved';
    } else if (now >= closeTime) {
        status = 'resolving';
    } else {
        status = 'open';
    }

    let resolvedOutcome: 'YES' | 'NO' | 'INVALID' | undefined;
    if (marketState.outcome !== null) {
        resolvedOutcome = marketState.outcome ? 'YES' : 'NO';
    }

    return {
        id: marketId.toString(),
        question: marketState.question,
        description: marketState.clarification,
        status,
        probability,
        totalLiquidity,
        volume: 0,
        outcomes: {
            YES: yesPrice,
            NO: noPrice
        },
        created: new Date(closeTime * 1000).toISOString(),
        resolutionDate: new Date(closeTime * 1000).toISOString(),
        resolvedOutcome,
        history: []
    };
}