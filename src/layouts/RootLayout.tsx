import { Outlet, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import NetworkBanner from "../components/NetworkBanner";
import { useAppStatusStore } from "../stores/appStatusStore";
import { useEffect } from "react";
import { useTelegramStore } from "../stores/telegramStore";


const RootLayout = () => {
    const navigate = useNavigate();
    const { forwardUser, initialized } = useAppStatusStore();
    const { webApp } = useTelegramStore();
    const theme = webApp?.themeParams;

    useEffect(() => {
        if (initialized && forwardUser.forward) {
            const url = forwardUser.action !== null
                ? `/market-detail/${forwardUser.forwardTo}?action=${forwardUser.action}`
                : `/market-detail/${forwardUser.forwardTo}`;
            navigate(url);

            useAppStatusStore.getState().setForwardNavigation(null);
        }
    }, [initialized, forwardUser, navigate])

    return (
        <div className="min-h-screen bg-gray-900- bg-black- text-white" style={{ backgroundColor: theme?.bg_color }}>
            <NetworkBanner />
            <main className="pb-20 pt-5 max-w-3xl mx-auto">
                <Outlet />
            </main>
            <BottomNavBar />
        </div>
    );
};

export default RootLayout;