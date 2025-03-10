import { useState, useEffect, useCallback } from "react";
import { useTonConnectUI } from "@tonconnect/ui-react";
import { Address } from "@ton/core";
import React from "react";
import { Button } from "@components/ui/button";
import { IoWallet } from "react-icons/io5";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerTitle,
    DrawerTrigger,
} from "@components/ui/drawer";
import { useInView } from "react-intersection-observer";
import {
    useConnectWalletMutation,
    useDisconnectWalletMutation,
    useGetUsersByIdQuery,
} from "@/hooks/redux/users";
import { useGetTelegramId } from "@/hooks/getTelegramId";
import { toast } from "sonner";
import walletImage from "@assets/images/icons/wallet_icon.png"
import { triggerErrorVibration } from "@/lib/utils";

export default function ConnectTonWallet() {

    const [tonConnectUI] = useTonConnectUI();
    const [tonWalletAddress, setTonWalletAddress] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [pingVisible, setPingVisible] = useState(true);
    const [connectWallet] = useConnectWalletMutation();
    const [disconnectWallet] = useDisconnectWalletMutation();
    const { telegramId } = useGetTelegramId();
    const { data: user } = useGetUsersByIdQuery(telegramId, {
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
        refetchOnReconnect: true,
    })

    console.log("User", user?.user?.walletAddress)

    const handleWalletConnection = useCallback(
        async (address: string, isInitialLoad = false) => {
            setTonWalletAddress(user?.user?.walletAddress);
            setIsLoading(false);

            if (telegramId) {
                try {
                    await connectWallet({ telegram_id: telegramId, walletAddress: address }).unwrap();
                    if (!isInitialLoad) {
                        toast.success("Wallet connected successfully!", {
                            className: "text-xs work-sans py-3"
                        });
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.error("Failed to connect wallet:", error);
                    toast.error(error?.data?.error || error?.data?.message || "Failed to connect wallet!", {
                        className: "text-xs work-sans py-3"
                    });
                    triggerErrorVibration()
                }
            }
        },
        [connectWallet, telegramId, user?.user?.walletAddress]
    );

    const handleWalletDisconnection = useCallback(
        async (isInitialLoad = false) => {
            setTonWalletAddress(null);
            setIsLoading(false);

            if (telegramId) {
                try {
                    await disconnectWallet({ telegram_id: telegramId }).unwrap();
                    if (!isInitialLoad) {
                        toast.success("Wallet disconnected successfully!", {
                            className: "text-xs work-sans py-3"
                        });
                    }
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                } catch (error: any) {
                    console.error("Failed to disconnect wallet:", error);
                    toast.error(error?.data?.error || error?.data?.message || "Failed to disconnect wallet!", {
                        className: "text-xs work-sans py-3"
                    });
                }
            }
        },
        [disconnectWallet, telegramId]
    );


    useEffect(() => {
        let firstLoad = true; // Track initial page load

        const checkWalletConnection = async () => {
            if (tonConnectUI.account?.address) {
                await handleWalletConnection(tonConnectUI.account?.address, firstLoad);
            } else {
                await handleWalletDisconnection(firstLoad);
            }
            firstLoad = false; // Prevent toasts from showing after the first load
        };

        checkWalletConnection();

        const unsubscribe = tonConnectUI.onStatusChange(async (wallet) => {
            if (wallet) {
                await handleWalletConnection(wallet.account.address, false); 
            } else {
                await handleWalletDisconnection(false);
            }
        });

        return () => {
            unsubscribe();
        };
    }, [tonConnectUI, handleWalletConnection, handleWalletDisconnection]);

    // Handles wallet connect/disconnect action
    const handleWalletAction = async () => {
        setIsLoading(true);

        if (tonConnectUI.connected) {
            await tonConnectUI.disconnect();
        } else {
            await tonConnectUI.openModal();
        }
    };

    // Format wallet address
    const formatAddress = (address: string) => {
        const tempAddress = Address.parse(address).toString();
        return `${tempAddress.slice(0, 6)}...${tempAddress.slice(-6)}`;
    };

    const { ref } = useInView({
        triggerOnce: true,
        onChange: (visible) => {
            if (visible) setPingVisible(false);
        },
    });

    return (
        <React.Fragment>
            {tonWalletAddress ? (
                <Drawer>
                    <DrawerTrigger className="flex flex-1 w-full">
                        <Button className="relative shadow-lg flex-1 min-w-full bg-orange-500 hover:bg-orange-600">
                            <IoWallet color="white" />
                            {formatAddress(tonWalletAddress)}
                            {pingVisible && (
                                <div className="bg-orange-500 rounded-full h-2 w-2 absolute top-0 right-0 animate-ping" />
                            )}
                        </Button>
                    </DrawerTrigger>
                    <DrawerContent
                        ref={ref}
                        className="bg-[#1f1d26] border-none pb-5 pt-2 px-5 min-h-fit flex flex-col items-center md:space-y-6"
                    >
                        <div className="relative">
                            <img src={walletImage} loading="lazy" alt="wallet image" className="h-24 w-24 object-contain object-center" />
                            <div
                                className={
                                    "absolute z-20 bg-transparent h-full w-full top-0 bottom-0"
                                }
                            />
                        </div>
                        <DrawerTitle className="text-white text-center text-lg md:text-xl font-semibold work-sans">
                            {formatAddress(tonWalletAddress)}
                        </DrawerTitle>

                        <DrawerDescription className="text-white text-center text-sm md:text-base py-2 max-w-md work-sans">
                            Now wait, play the games, get rewards, perform tasks, and await our return 🚀
                        </DrawerDescription>

                        <Button
                            onClick={handleWalletAction}
                            disabled={isLoading}
                            className="flex items-center min-w-full work-sans bg-red-500 hover:bg-red-700 text-white text-xs md:text-sm work-sans rounded-full py-2 px-4 space-x-2"
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
                    <span>Connect Wallet</span>
                    <IoWallet color="white" />
                </Button>
            )}
        </React.Fragment>
    );
}
