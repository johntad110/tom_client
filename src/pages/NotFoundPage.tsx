import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaceFrownIcon, HomeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import { useTelegramStore } from "../stores/telegramStore";

function NotFoundPage() {
  const { webApp } = useTelegramStore();
  const theme = webApp?.themeParams;

  const funnyMessages = [
    "This page went to buy milk... and never came back 🥛",
    "Even our AI is scratching its head on this one 🤖",
    "404: Reality not found. Try again in a parallel universe 🌌",
    "This page is on a coffee break. A very long one ☕",
    "We looked everywhere. Even behind the couch. Nothing. 🛋️",
    "This URL must be playing hide and seek. And winning. 🙈"
  ];

  const randomMessage = funnyMessages[Math.floor(Math.random() * funnyMessages.length)];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: theme?.bg_color }}
    >
      <div className="text-center max-w-md mx-auto">
        {/* Animated Icon */}
        <motion.div
          initial={{ rotate: 0, scale: 0 }}
          animate={{ rotate: 360, scale: 1 }}
          transition={{
            rotate: { duration: 1, ease: "easeInOut" },
            scale: { duration: 0.5 }
          }}
          className="mb-6"
        >
          <div className="w-20 h-20 mx-auto rounded-full flex items-center justify-center"
            style={{ backgroundColor: theme?.secondary_bg_color }}>
            <FaceFrownIcon className="w-10 h-10" style={{ color: theme?.button_color }} />
          </div>
        </motion.div>

        {/* Error Code */}
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-6xl font-bold mb-2"
          style={{ color: theme?.text_color }}
        >
          404
        </motion.h1>

        {/* Funny Message */}
        <motion.p
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-lg mb-6 opacity-80"
          style={{ color: theme?.hint_color }}
        >
          {randomMessage}
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-3 justify-center"
        >
          <Link
            to="/"
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: theme?.button_color,
              color: theme?.button_text_color
            }}
          >
            <HomeIcon className="w-5 h-5" />
            Take me home!
          </Link>

          <button
            onClick={() => window.location.reload()}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all hover:scale-105"
            style={{
              backgroundColor: theme?.secondary_bg_color,
              color: theme?.text_color,
              border: `1px solid ${theme?.section_separator_color}`
            }}
          >
            <ArrowPathIcon className="w-5 h-5" />
            Try again
          </button>
        </motion.div>

        {/* Easter egg for developers */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="text-xs mt-8 opacity-50"
          style={{ color: theme?.hint_color }}
        >
          Pro tip: The back button usually works too 😉
        </motion.p>
      </div>
    </motion.div>
  );
}

export default NotFoundPage;