import { create } from "zustand";
import { useTelegramStore } from "./telegramStore";
import { useFactoryStore } from "./factoryStore";
import { useMarketStore } from "./marketStore";
import { Address, TonClient, type OpenedContract } from "@ton/ton";
import { getHttpEndpoint } from "@orbs-network/ton-access";
import { Factory } from "../contracts/factory";
import config from "../config";
import { useUserStore } from "./userStore";

type AppStatus = {
    initialized: boolean;
    errors: {
        telegram: boolean;
        auth: boolean;
        tonClient: boolean;
        factory: boolean;
        markets: boolean;
    };
    initializeApp: () => Promise<void>;
    retryInitialization: () => void;
};

export const useAppStatusStore = create<AppStatus>((set, get) => ({
    initialized: false,
    errors: {
        telegram: false,
        auth: false,
        tonClient: false,
        factory: false,
        markets: false
    },

    initializeApp: async () => {
        // When retrying by clicking the `MainButton`... it stays active 
        // so let's disable it evreytime we start the initialize function
        // That's if we habe the webApp object 
        // if we don't have it... we won't have Retry button in the first place...
        const webApp = useTelegramStore.getState().webApp;
        if (webApp) { webApp?.MainButton.hide() }

        console.groupCollapsed('[AppStatus] Starting app initialization');
        try {
            console.log('[AppStatus] Resetting error states');
            set({ errors: { telegram: false, auth: false, tonClient: false, factory: false, markets: false } });

            console.log('[AppStatus] Initializing Telegram');
            try {
                await useTelegramStore.getState().init();
                console.log('[AppStatus] Telegram initialized successfully');

                // if tg init successfull let's attempt auth
                console.log('[AppStatus] Attempting Telegram authentiation');
                try {
                    const webApp = useTelegramStore.getState().webApp;
                    if (!webApp) throw new Error('Telegram WebApp not available');

                    const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.auth.telegram}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ initData: webApp.initData })
                    });

                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.error || 'Authentication failed');
                    }

                    const { token, user } = await response.json();

                    useUserStore.getState().updateProfile({
                        nickname: user.nickname,
                        bio: user.bio || useUserStore.getState().bio,
                    });

                    useUserStore.getState().setToken(`${token}`)

                    console.log('[AppStatus] Authentication successful');
                } catch (authError) {
                    console.error('[AppStatus] Authentication failed:', authError);
                    set(state => ({
                        errors: { ...state.errors, auth: true },
                        initialized: false
                    }));
                }
            } catch (error) {
                console.error('[AppStatus] Telegram initialization failed:', error);
                set(state => {
                    console.log('[AppStatus] Setting telegram error flag');
                    return { errors: { ...state.errors, telegram: true } };
                });
            }

            console.log('[AppStatus] Initializing TON client');
            let client;
            try {
                const endpoint = await getHttpEndpoint({ network: config.network });
                client = new TonClient({ endpoint });
                console.log('[AppStatus] TON client initialized successfully');
            } catch (error) {
                console.error('[AppStatus] TON client initialization failed:', error);
                set(state => ({ errors: { ...state.errors, tonClient: true } }));
                client = null;
            }

            if (client) {
                console.log('[AppStatus] Initializing Factory');
                try {
                    const factoryContract = new Factory(Address.parse(config.contractAddresses.factory));
                    const openedContract = client.open(factoryContract) as OpenedContract<Factory>;

                    const nextId = await openedContract.getGetNextMarketId();
                    const address = openedContract.address.toString();

                    const factoryStore = useFactoryStore.getState();
                    factoryStore.setFactoryData({ factoryAddress: address, nextMarketId: Number(nextId) });

                    const { marketAddresses } = factoryStore;
                    const persistedMarketCount = Object.keys(marketAddresses).length;

                    if (persistedMarketCount === 0) {
                        console.log('[AppStatus] Loading all markets for the first time');
                        const existingIds = Array.from({ length: Number(nextId) }, (_, i) => i);
                        for (const id of existingIds) {
                            const addr = await openedContract.getGetMarketAddress(BigInt(id));
                            factoryStore.addMarketAddress(id, addr ? addr.toString() : '');
                        }
                    } else if (Number(nextId) > persistedMarketCount) {
                        console.log(`[AppStatus] Loading new markets from ${persistedMarketCount} to ${Number(nextId) - 1}`);
                        for (let id = persistedMarketCount; id < Number(nextId); id++) {
                            const addr = await openedContract.getGetMarketAddress(BigInt(id));
                            factoryStore.addMarketAddress(id, addr ? addr.toString() : '');
                        }
                    }

                    console.log('[AppStatus] Factory initialized successfully');
                } catch (error) {
                    console.error('[AppStatus] Factory initialization failed:', error);
                    set(state => {
                        console.log('[AppStatus] Setting factory error flag');
                        return { errors: { ...state.errors, factory: true } };
                    });
                }
            }

            if (client) {
                console.log('[AppStatus] Loading markets with client:', client);
                try {
                    await useMarketStore.getState().fetchMarkets(client);
                    console.log('[AppStatus] Markets loaded successfully');
                } catch (error) {
                    console.error('[AppStatus] Market loading failed:', error);
                    set(state => {
                        console.log('[AppStatus] Setting markets error flag');
                        return { errors: { ...state.errors, markets: true } };
                    });
                }
            } else {
                console.log('[AppStatus] Skipping market load - no client available');
            }

            const { errors } = get();
            console.log('[AppStatus] Current error state:', errors);

            if (!errors.telegram && !errors.auth && !errors.tonClient) {
                console.log('[AppStatus] No critical errors - marking app as initialized');
                set({ initialized: true });
            } else {
                console.warn('[AppStatus] Critical errors detected - app not initialized');
                console.warn('Telegram error:', errors.telegram);
                console.warn('Auth error:', errors.auth);
                console.warn('TON Client error:', errors.tonClient);

                // Show the `MainButton`
                const webApp = useTelegramStore.getState().webApp;
                if (webApp) {
                    webApp?.MainButton.setParams({ text: "Retry", has_shine_effect: true });
                    webApp?.MainButton.onClick(get().retryInitialization);
                    webApp?.MainButton.show();

                }
            }
        } catch (err: any) {
            console.error('[AppStatus] App initialization failed:', err);
        } finally {
            console.groupEnd();
        }
    },

    retryInitialization: () => {
        console.log('[AppStatus] Retrying initialization');
        set({ initialized: false });
        get().initializeApp();
    }
}));