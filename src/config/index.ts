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
        factory: 'kQCtTa5Tlw7W2qflcdR8lN31KPzluJQA31mCsrfB0CgNuuJp',
    },
};

export const isTestnet = config.network === 'testnet';
export const isMainnet = !isTestnet;

export default config;