import { BinaryMarket } from "../contracts/market";
import { Address, type OpenedContract } from "@ton/core";
import { TonClient } from "@ton/ton";
import type { Market, MarketHistory, MarketStatus } from "../types/market";

export async function fetchMarketData(
    client: TonClient,
    address: string,
    marketId: number
): Promise<Market> {
    const contract = new BinaryMarket(Address.parse(address));
    const marketContract = client.open(contract) as OpenedContract<BinaryMarket>;
    const marketState = await marketContract.getGetMarketState();
    const marketHistory = await marketContract.getHistory(); // no need to get it right now ... another zustand function can get it.
    // const probabilities = await marketContract.getProbabilities(); // to do calculate it using the marketstate - the getProbabilities seems wrong.

    const marketHistoryConverted = marketHistory.values().map((his): MarketHistory => {
        return {
            timestamp: Number(his.timestamp),
            price: Number(his.price) / 10000,
            action: his.action,
            outcome: Number(his.outcome),
            address: his.address.toString(),
        }
    })
    console.log('CONVERTED MARKET HISTORY: ', marketHistoryConverted);
    
    const reserveYes = Number(marketState.reserveYes) / 1_000_000_000;
    const reserveNo = Number(marketState.reserveNo) / 1_000_000_000;
    const totalLiquidity = reserveYes + reserveNo;
    const probability = totalLiquidity > 0 ? (reserveNo / totalLiquidity) * 100 : 50;

    const yesPrice = totalLiquidity > 0 ? reserveNo / totalLiquidity : 0.5;
    const noPrice = totalLiquidity > 0 ? reserveYes / totalLiquidity : 0.5;

    console.log('YES NO RESERVES: ', reserveYes, reserveNo)
    console.log('TOTAL LIQUIDITY ', totalLiquidity);
    console.log('NO PRICE ', noPrice);
    console.log('YES PRICE ', yesPrice);
    console.log('PROBABILITY ', probability);
    console.log('TOTAL VOLUME ', Number(marketState.totalVolume) / 1_000_000_000);


    const probConverted = { yes: yesPrice, no: noPrice }

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
        probabilities: probConverted,
        totalLiquidity,
        history: marketHistoryConverted,
        created: new Date(closeTime * 1000).toISOString(),
        resolutionDate: new Date(closeTime * 1000).toISOString(),
        resolvedOutcome,
        feeBps: Number(marketState.feeBps),
        oracleAddr: marketState.oracleAddr,
        closeTimestamp: Number(marketState.closeTimestamp),
        resolved: marketState.resolved,
        outcome: marketState.outcome,
        factory: marketState.factory,
        version: Number(marketState.version),
        totalVolume: Number(marketState.totalVolume) / 1_000_000_000,
        yesVolume: Number(marketState.yesVolume),
        noVolume: Number(marketState.noVolume),
        creator: marketState.creator,
        createdBy: marketState.createdBy,
        askedBy: marketState.askedBy,
        bannerImage: marketState.bannerImage,
    };
}