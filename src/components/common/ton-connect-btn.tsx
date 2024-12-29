import { useState, useEffect, useCallback } from 'react';
import { useTonConnectUI } from '@tonconnect/ui-react';
import { Address } from "@ton/core";
import React from 'react';
import { Button } from '@components/ui/button';
import { IoWallet } from "react-icons/io5";
// import { toast } from "sonner"
import { Drawer, DrawerContent, DrawerDescription, DrawerTitle, DrawerTrigger } from '@components/ui/drawer';
import { useInView } from "react-intersection-observer";

export default function ConnectTonWallet() {

    const [pingVisible, setPingVisible] = useState(true);
    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    // const userFriendlyAddress = useTonAddress();
    // const rawAddress = useTonAddress(false);

    const handleWalletConnection = useCallback((address: string) => {
        setTonWalletAddress(address);
        console.log("Wallet connected successfully!");
        // toast.success("Wallet connected successfully!");
        setIsLoading(false);
    }, []);

    const handleWalletDisconnection = useCallback(() => {
        setTonWalletAddress(null);
        console.log("Wallet disconnected successfully!");
        // toast.error("Wallet disconnected successfully!");
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
        return `${tempAddress.slice(0, 6)}...${tempAddress.slice(-6)}`;
    };


    const { ref } = useInView({
        triggerOnce: true, // Trigger only once
        onChange: (visible) => {
            if (visible) setPingVisible(false);
        },
    });

    return (
        <React.Fragment>
            {tonWalletAddress ? (
                <Drawer>
                    <DrawerTrigger className='flex flex-1 w-full'>
                        <Button className="relative shadow-lg flex-1 min-w-full">
                            <IoWallet color="white" />
                            {pingVisible && (
                                <div
                                    className="bg-orange-500 rounded-full h-2 w-2 absolute top-0 right-0 animate-ping"
                                />
                            )}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent ref={ref} className="bg-[#1f1d26] border-none py-5 px-5 min-h-[40%] flex flex-col items-center space-y-4 md:space-y-6">
                        <IoWallet size={50} color='white' />
                        <DrawerTitle className="text-white text-center text-lg md:text-xl font-semibold work-sans">
                            {formatAddress(tonWalletAddress)}
                        </DrawerTitle>

                        <DrawerDescription className="text-white text-center text-sm md:text-base py-2 max-w-md work-sans">
                            Now wait, play the games, get rewards, perform tasks, and await our return 🚀
                        </DrawerDescription>

                        <Button
                            onClick={handleWalletAction}
                            disabled={isLoading}
                            className="flex items-center work-sans bg-red-500 hover:bg-red-700 text-white text-xs md:text-sm work-sans rounded-full py-2 px-4 space-x-2"
                        >
                            <IoWallet color="white" />
                            <span>Disconnect Wallet</span>
                        </Button>
                    </DrawerContent>
                </Drawer>
            ) : (

                <Button
                    disabled={isLoading}
                    onClick={handleWalletAction}
                    className="relative shadow-lg w-full flex-1 work-sans bg-orange-500 hover:bg-orange-600 text-white"
                >
                    <span>Connect wallet</span>
                    <IoWallet color="white" />
                </Button>
            )}
        </React.Fragment>
    );
}
