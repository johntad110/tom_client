import { getHttpEndpoint } from '@orbs-network/ton-access';
import { TonClient } from "@ton/ton";
import { useAsyncInitialize } from './useAsyncInitialize';
import config from '../config';

export function useTonClient() {
    return useAsyncInitialize(async () => {
        try {
            console.log('[useTonClient] Initializing TON client');
            const endpoint = await getHttpEndpoint({ network: config.network });
            return new TonClient({ endpoint });
        } catch (error) {
            console.error('[useTonClient] Failed to initialize:', error);
            throw error;
        }
    });
}