import { NavLink } from "react-router-dom";
import { HomeIcon, ChartBarIcon, UserIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";


const BottomNavBar = () => {
    const routes = [
        { path: "/", icon: HomeIcon, label: "Home" },
        { path: "/portfolio", icon: ChartBarIcon, label: "Portfolio" },
        { path: "/profile", icon: UserIcon, label: "Profile" },
    ];

    return (
        <motion.nav
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-[calc(100%-2rem)] max-w-md"
        >
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-1 shadow-lg border border-white/20">
                <ul className="flex justify-around items-center">
                    {routes.map((route) => (
                        <li key={route.path} className="relative">
                            <NavLink
                                to={route.path}
                                className={({ isActive }) =>
                                    `flex flex-col items-center px-2 py-1 rounded-lg transition-all duration-200 ${isActive ? "text-white" : "text-white/60"
                                    }`
                                }
                            >
                                {({ isActive }) => (
                                    <>
                                        <route.icon className="h-6 w-6" />
                                        <span className="text-xs mt-1">{route.label}</span>
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-active-indicator"
                                                className="absolute -bottom-1 left-0 right-0 h-1 bg-purple-400 rounded-t-full"
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