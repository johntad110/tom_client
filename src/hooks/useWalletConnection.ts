import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { useUserStore } from '../stores/userStore';
import { useEffect } from 'react';
import config from '../config';

export const useWalletConnection = () => {
    const [tonConnectUI] = useTonConnectUI();
    const wallet = useTonWallet();
    const { updateWalletState, token } = useUserStore();

    useEffect(() => {
        updateWalletState({
            isConnected: !!wallet,
            walletAddress: wallet?.account.address || null,
            isLoading: false
        });

        if (wallet?.account.address && token) {
            updateWalletAddress(wallet.account.address, token);
        }
    }, [wallet, updateWalletState, token]);

    useEffect(() => {
        const unsubscribe = tonConnectUI.onStatusChange(
            (walletInfo) => {
                if (walletInfo && token) { updateWalletAddress(walletInfo.account.address, token) }
                else if (!walletInfo && token) { /* To-Do: Wallet disconnected - notify backend */ }
            }
        );

        return () => unsubscribe();
    }, [tonConnectUI, token]);

    const updateWalletAddress = async (address: string, authToken: string) => {
        try {
            const response = await fetch(`${config.api.baseUrl}${config.api.endpoints.updateWallet}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({ walletAddress: address })
            });

            if (!response.ok) {
                throw new Error('Failed to update wallet address');
            }

            console.log('Wallet address updated successfully');
        } catch (error) {
            console.error('Error updating wallet address:', error);
        }
    };

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