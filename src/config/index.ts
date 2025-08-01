export interface AppConfig {
    network: 'mainnet' | 'testnet';
    tonCenterApiKey: string;
    contractAddresses: {
        factory: string;
    };
}

const config: AppConfig = {
    network: 'testnet',
    tonCenterApiKey: '_YADA_YADA',
    contractAddresses: {
        factory: 'kQAdOHA_CvTj7QZO7pSJhwmAlyGdf4qH6cVN4SFZLp_WGM9H',
    },
};

export const isTestnet = config.network === 'testnet';
export const isMainnet = !isTestnet;

export default config;