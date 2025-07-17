import { useTelegramStore } from '../stores/telegramStore';

export const useTelegram = () => {
  const { webApp, user, backButton } = useTelegramStore();
  
  return {
    webApp,
    user,
    backButton,
    initData: webApp?.initData,
    initDataUnsafe: webApp?.initDataUnsafe
  };
};