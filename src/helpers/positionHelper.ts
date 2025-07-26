import { BinaryMarket } from "../contracts/market";
import { Address, type OpenedContract } from "@ton/core";
import { TonClient } from "@ton/ton";
import type { YesNoBalances } from "../types/position";


export async function fetchUserPositions(
    client: TonClient,
    marketAddress: Address,
    userAddress: Address
): Promise<YesNoBalances | undefined> {
    try {
        const contract = new BinaryMarket(marketAddress);
        const marketContract = client.open(contract) as OpenedContract<BinaryMarket>;
        const balances = await marketContract.getGetUserBalances(userAddress);

        if (!balances) return undefined;

        return {
            yes: balances.yes ? Number(balances.yes) / 1_000_000_000 : null,
            no: balances.no ? Number(balances.no) / 1_000_000_000 : null
        };
    } catch (err) {
        console.error('Failed to fetch user positions:', err);
        return undefined;
    }
}