import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useUserStore } from '../stores/userStore';
import { useEffect } from 'react';

export const useWalletConnection = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const { updateWalletState } = useUserStore();

    useEffect(() => {
        updateWalletState({
            isConnected: !!wallet,
            walletAddress: wallet?.account.address || null,
            isLoading: false
        });
    }, [wallet, updateWalletState]);

    const connect = () => tonConnectUI.openModal();
    const disconnect = () => tonConnectUI.disconnect();

    return {
        connect,
        disconnect,
        walletAddress: wallet?.account.address,
        isConnected: !!wallet,
        isLoading: false
    };
};