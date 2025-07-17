import { create } from "zustand";

type TelegramUser = {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    photo_url?: string;
    is_premium?: boolean;
    auth_date?: number;
    hash?: string;
};

type TelegramStore = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webApp: any | null;
    user: TelegramUser | null;
    init: () => void;
    backButton: {
        show: () => void;
        hide: () => void;
        onClick: (callback: () => void) => void;
    };
};

export const useTelegramStore = create<TelegramStore>((set) => ({
    webApp: null,
    user: null,

    init: () => {
        const checkWebApp = (attempt = 0) => {
            console.log(`checkWebApp attempt ${attempt}.`)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const tgWebApp = (window as any).Telegram?.WebApp;

            if (tgWebApp) {
                console.log('Got tgWebApp', tgWebApp.initDataUnsafe?.user);
                tgWebApp.ready();
                set({
                    webApp: tgWebApp,
                    user: tgWebApp.initDataUnsafe?.user
                });
            } else if (attempt < 3) {
                setTimeout(() => checkWebApp(attempt + 1), 300);
            }
        };

        checkWebApp();

    },

    backButton: {
        show: () => useTelegramStore.getState().webApp?.BackButton.show(),
        hide: () => useTelegramStore.getState().webApp?.BackButton.hide(),
        onClick: (callback) => {
            const webApp = useTelegramStore.getState().webApp;
            webApp?.BackButton.onClick(callback);
        }
    }
}));