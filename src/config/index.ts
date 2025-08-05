export interface AppConfig {
    network: 'mainnet' | 'testnet';
    tonCenterApiKey: string;
    contractAddresses: {
        factory: string;
    };
    api: {
        baseUrl: string;
        endpoints: {
            auth: {
                telegram: string;
            }
        }
    }
}

const config: AppConfig = {
    network: import.meta.env.VITE_NETWORK! === 'mainnet' ? 'mainnet' : 'testnet',
    tonCenterApiKey: import.meta.env.VITE_TON_CENTER_API_KEY!,
    contractAddresses: {
        factory: import.meta.env.VITE_FACTORY_CONTRACT_ADDRESS!,
    },
    api: {
        baseUrl: import.meta.env.VITE_API_BASE_URL!,
        endpoints: {
            auth: { telegram: '/auth/telegram' },
        }
    }
};

export const isTestnet = config.network === 'testnet';
export const isMainnet = !isTestnet;

export default config;