import { Outlet } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import { useTelegramStore } from "../stores/telegramStore";
import { useEffect } from "react";


const RootLayout = () => {
    const initTelegram = useTelegramStore(state => state.init);

    useEffect(() => {
        initTelegram();
    }, [initTelegram])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <main className="pb-20 px-4 max-w-3xl mx-auto">
                <Outlet />
            </main>
            <BottomNavBar />
        </div>
    );
};

export default RootLayout;