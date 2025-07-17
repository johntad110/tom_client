import { Outlet } from "react-router-dom";
import BottomNavBar from "../components/BottomNavBar";


const RootLayout = () => {
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