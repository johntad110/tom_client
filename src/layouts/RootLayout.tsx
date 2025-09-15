import { Outlet, useNavigate } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import NetworkBanner from "../components/NetworkBanner";
import { useAppStatusStore } from "../stores/appStatusStore";
import { useEffect } from "react";


const RootLayout = () => {
    const navigate = useNavigate();
    const { forwardUser, initialized } = useAppStatusStore();

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
        <div className="min-h-screen bg-gray-900- bg-black- text-white">
            <NetworkBanner />
            <main className="pb-20 pt-5 max-w-3xl mx-auto">
                <Outlet />
            </main>
            <BottomNavBar />
        </div>
    );
};

export default RootLayout;