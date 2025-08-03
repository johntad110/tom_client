import { Outlet } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";
import NetworkBanner from "../components/NetworkBanner";


const RootLayout = () => {
    return (
        <div className="min-h-screen bg-gray-900 text-white">
            <NetworkBanner />
            <main className="pb-20 px-4 max-w-3xl mx-auto">
                <Outlet />
            </main>
            <BottomNavBar />
        </div>
    );
};

export default RootLayout;