import { create } from "zustand";
import { useTelegramStore } from "./telegramStore";

interface ThemeColors {
    bg_color?: string;
    text_color?: string;
    hint_color?: string;
    link_color?: string;
    button_color?: string;
    button_text_color?: string;
    secondary_bg_color?: string;
    header_bg_color?: string;
    bottom_bar_bg_color?: string;
    accent_text_color?: string;
    section_bg_color?: string;
    section_header_text_color?: string;
    section_separator_color?: string;
    subtitle_text_color?: string;
    destructive_text_color?: string;
}

interface ThemeStore {
    colors: ThemeColors;
    version: string;
    isDark: boolean;
    isInitialized: boolean;
    init: () => void;
    updateTheme: (newColors: ThemeColors) => void;
    getColor: (key: keyof ThemeColors, fallback?: string) => string;
}

// Default fallback colors (light theme)
const DEFAULT_COLORS: ThemeColors = {
    bg_color: "#ffffff",
    text_color: "#000000",
    hint_color: "#999999",
    link_color: "#2481cc",
    button_color: "#40a7e3",
    button_text_color: "#ffffff",
    secondary_bg_color: "#f1f1f1",
    header_bg_color: "#ffffff",
    bottom_bar_bg_color: "#ffffff",
    accent_text_color: "#2481cc",
    section_bg_color: "#ffffff",
    section_header_text_color: "#000000",
    section_separator_color: "#e0e0e0",
    subtitle_text_color: "#666666",
    destructive_text_color: "#ff3b30",
};

export const useThemeStore = create<ThemeStore>((set, get) => ({
    colors: { ...DEFAULT_COLORS },
    version: "6.0",
    isDark: false,
    isInitialized: false,

    init: () => {
        const webApp = useTelegramStore.getState().webApp;
        if (!webApp) {
            console.warn("ThemeStore: Telegram WebApp not available");
            return;
        }

        // Get version from WebApp
        const version = webApp.version || "6.0";

        // Get initial theme params
        const themeParams = webApp.themeParams || {};

        // Determine if dark theme
        const isDark = webApp.colorScheme === "dark";

        // Apply theme with version-aware fallbacks
        const colors = getVersionAwareColors(themeParams, version, isDark);

        set({
            colors,
            version,
            isDark,
            isInitialized: true,
        });

        // Apply CSS variables immediately
        applyThemeToCSS(colors);

        // Listen for theme changes
        webApp.onEvent("themeChanged", () => {
            const newThemeParams = webApp.themeParams || {};
            const newIsDark = webApp.colorScheme === "dark";
            const newColors = getVersionAwareColors(newThemeParams, version, newIsDark);

            set({
                colors: newColors,
                isDark: newIsDark,
            });

            applyThemeToCSS(newColors);
        });

        console.log("ThemeStore: Initialized with version", version);
    },

    updateTheme: (newColors: ThemeColors) => {
        const currentColors = get().colors;
        const updatedColors = { ...currentColors, ...newColors };

        set({ colors: updatedColors });
        applyThemeToCSS(updatedColors);
    },

    getColor: (key: keyof ThemeColors, fallback?: string) => {
        const colors = get().colors;
        return colors[key] || fallback || DEFAULT_COLORS[key] || "#000000";
    },
}));

// Helper function to get version-aware colors
function getVersionAwareColors(
    themeParams: any,
    version: string,
    _isDark: boolean
): ThemeColors {
    const colors: ThemeColors = { ...DEFAULT_COLORS };

    // Always available in all versions
    const basicKeys: (keyof ThemeColors)[] = [
        "bg_color", "text_color", "hint_color", "link_color",
        "button_color", "button_text_color"
    ];

    basicKeys.forEach(key => {
        if (themeParams[key]) {
            colors[key] = themeParams[key];
        }
    });

    // Version 6.1+ features
    if (compareVersions(version, "6.1") >= 0) {
        if (themeParams.secondary_bg_color) {
            colors.secondary_bg_color = themeParams.secondary_bg_color;
        }
    }

    // Version 7.0+ features
    if (compareVersions(version, "7.0") >= 0) {
        const v7Keys: (keyof ThemeColors)[] = [
            "header_bg_color", "accent_text_color", "section_bg_color",
            "section_header_text_color", "subtitle_text_color", "destructive_text_color"
        ];

        v7Keys.forEach(key => {
            if (themeParams[key]) {
                colors[key] = themeParams[key];
            }
        });
    }

    // Version 7.6+ features
    if (compareVersions(version, "7.6") >= 0) {
        if (themeParams.section_separator_color) {
            colors.section_separator_color = themeParams.section_separator_color;
        }
    }

    // Version 7.10+ features
    if (compareVersions(version, "7.10") >= 0) {
        if (themeParams.bottom_bar_bg_color) {
            colors.bottom_bar_bg_color = themeParams.bottom_bar_bg_color;
        }
    }

    return colors;
}

// Helper function to apply theme to CSS
function applyThemeToCSS(colors: ThemeColors) {
    const root = document.documentElement;

    Object.entries(colors).forEach(([key, value]) => {
        if (value) {
            root.style.setProperty(`--tg-theme-${key.replace(/_/g, '-')}`, value);
        }
    });
}

// Helper function to compare versions
function compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const part1 = parts1[i] || 0;
        const part2 = parts2[i] || 0;

        if (part1 > part2) return 1;
        if (part1 < part2) return -1;
    }

    return 0;
}