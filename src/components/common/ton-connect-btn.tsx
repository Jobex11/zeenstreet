import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI  } from '@tonconnect/ui-react';
import { Address } from "@ton/core";
import React from 'react';
import { Button } from '@components/ui/button';

export default function ConnectTonWallet() {
    
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // const userFriendlyAddress = useTonAddress();
    // const rawAddress = useTonAddress(false);

    const handleWalletConnection = useCallback((address: string) => {
        setTonWalletAddress(address);
        console.log("Wallet connected successfully!");
        setIsLoading(false);
    }, []);

    const handleWalletDisconnection = useCallback(() => {
        setTonWalletAddress(null);
        console.log("Wallet disconnected successfully!");
        setIsLoading(false);
    }, []);

    useEffect(() => {
        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                handleWalletConnection(tonConnectUI.account?.address);
            } else {
                handleWalletDisconnection();
            }
        };

        checkWalletConnection();

        const unsubscribe = tonConnectUI.onStatusChange((wallet) => {
            if (wallet) {
                handleWalletConnection(wallet.account.address);
            } else {
                handleWalletDisconnection();
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    const handleWalletAction = async () => {
        if (tonConnectUI.connected) {
            setIsLoading(true);
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };

    const formatAddress = (address: string) => {
        const tempAddress = Address.parse(address).toString();
        return `${tempAddress.slice(0, 4)}...${tempAddress.slice(-4)}`;
    };


    return (
        <React.Fragment>
            {tonWalletAddress ? (
                <div className="flex flex-col items-center">
                    <p className="mb-4">Connected: {formatAddress(tonWalletAddress)}</p>
                    <Button
                        onClick={handleWalletAction}
                        disabled={isLoading}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Disconnect Wallet
                    </Button>
                </div>
            ) : (
                <Button
                    disabled={isLoading}
                    onClick={handleWalletAction}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Connect TON Wallet 
                </Button>
            )}
        </React.Fragment>
    );
}
