import { useThemeStore } from "../stores/themeStore";

export const useTheme = () => {
    const { colors, isDark, version, getColor} = useThemeStore();

    return {
        colors, 
        isDark,
        version,
        getColor,

        // Convenience methods
        bgColor: colors.bg_color,
        textColor: colors.text_color,
        buttonColor: colors.button_color,
        buttonTextColor: colors.button_text_color,
    };
};