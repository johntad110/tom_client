import { NavLink, useLocation } from "react-router-dom";
import { HomeIcon, ChartBarIcon, UserIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import { useTelegramStore } from "../stores/telegramStore";


const BottomNavBar = () => {
    const { webApp } = useTelegramStore();
    const location = useLocation();

    const hiddenPaths = ["/market-detail/"];
    const shouldHide = hiddenPaths.some(path => location.pathname.includes(path));

    if (shouldHide) {
        return null;
    }

    const routes = [
        { path: "/", icon: HomeIcon, label: "Home" },
        { path: "/portfolio", icon: ChartBarIcon, label: "Portfolio" },
        { path: "/profile", icon: UserIcon, label: "Profile" },
    ];

    const theme = webApp?.themeParams || {};
    const navBgColor = theme.bg_color || "#ffffff";
    const textColor = theme.text_color || "#000000";
    const activeTextColor = theme.text_color || theme.accent_text_color || "#007aff";

    return (
        <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 w-full"
            style={{ backgroundColor: navBgColor }}
        >
            <div className="p-1">
                <ul className="flex justify-around items-center">
                    {routes.map((route) => (
                        <li key={route.path} className="relative flex-1">
                            <NavLink
                                to={route.path}
                                className={({ isActive }) =>
                                    `flex flex-col items-center px-2 py-3 rounded-lg transition-all duration-200 ${isActive ? "text-white" : "text-white/60"}`
                                }
                                style={({ isActive }) => ({
                                    color: isActive ? activeTextColor : textColor
                                })}
                            >
                                {({ isActive }) => (
                                    <>
                                        <route.icon className="h-6 w-6" />
                                        <span className="text-xs mt-1">{route.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active-indicator"
                                                className="absolute -bottom-1 left-0 right-0 h-1 bg-purple-400 rounded-t-full"
                                                style={{ backgroundColor: activeTextColor }}
                                                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                            />
                                        )}
                                    </>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
        </motion.nav>
    );
};

export default BottomNavBar;