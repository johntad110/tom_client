import { useEffect } from "react";
import { Factory } from "../contracts/factory";
import { useTonClient } from "./useTonClient";
import { Address, type OpenedContract } from "@ton/core";
import { useAsyncInitialize } from "./useAsyncInitialize";
import { useFactoryStore } from "../stores/factoryStore";

export function useFactroyContract() {
    const client = useTonClient();
    const {
        setFactoryData,
        addMarketAddress,
        nextMarketId,
        factoryAddress,
        marketAddresses
    } = useFactoryStore();

    const factoryContract = useAsyncInitialize(async () => {
        if (!client) return;
        const contract = new Factory(
            Address.parse('kQCtTa5Tlw7W2qflcdR8lN31KPzluJQA31mCsrfB0CgNuuJp')
        );
        return client.open(contract) as OpenedContract<Factory>;
    }, [client]);

    useEffect(() => {
        async function loadFactoryData() {
            if (!factoryContract) return;

            try {
                const nextId = await factoryContract.getGetNextMarketId();
                const address = factoryContract.address.toRawString();

                setFactoryData({
                    factoryAddress: address,
                    nextMarketId: Number(nextId)
                });

                const existingIds = Array.from({ length: Number(nextId) }, (_, i) => i);
                for (const id of existingIds) {
                    if (!marketAddresses[id]) {
                        const addr = await factoryContract.getGetMarketAddress(BigInt(id));
                        addMarketAddress(id, addr ? addr.toString() : '');
                    }
                }
            } catch (err) {
                console.error('Error loading factory data:', err);
            }
        }

        loadFactoryData();
    }, [addMarketAddress, factoryContract, marketAddresses, setFactoryData]);

    return {
        factoryAddress,
        nextMarketId,
        marketAddresses,
        getFactoryBalance: () => {
            return factoryContract?.getFactoryBalance();
        },
        getMarketAddress: (marketId: bigint) => {
            return factoryContract?.getGetMarketAddress(marketId);
        }
    }
}