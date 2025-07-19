import { Address, type OpenedContract } from "@ton/core";
import { BinaryMarket, type MarketState } from "../contracts/market";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useTonClient } from "./useTonClient";
import { useEffect, useState } from "react";

export function useMarketContract({ addr }: { addr: string; }) {
    const client = useTonClient();
    const [marketState, setMarketState] = useState<MarketState | null>(null);

    const marketContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new BinaryMarket(
            Address.parse(addr)
        );
        return client.open(contract) as OpenedContract<BinaryMarket>;
    }, [client]);

    useEffect(() => {
        async function getMarketState() {
            if (!marketContract) return;

            try {
                const state = await marketContract.getGetMarketState();
                setMarketState(state);
            } catch (err) {
                console.error(`Eror laoding market state for ${addr}:`, err);
            }
        }

        getMarketState();
    }, [marketContract, addr]);

    return {
        marketState,
        address: marketContract?.address.toString(),
    }
}