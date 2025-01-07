import { Fragment, useEffect, useState } from "react";
import { Button } from "@components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import zeenstreetLogo from "@assets/images/icons/zenstreet_logo.png";
import { useGetUsersByIdQuery } from '@hooks/redux/users';
import { useTelegramWebApp } from "@hooks/useTelegramWebapp"


interface TelegramWrapperProps {
    children: React.ReactNode;
}


export default function TelegramWrapper({ children }: TelegramWrapperProps) {
    const [isTelegram, setIsTelegram] = useState(true);
    const [telegramId, setTelegramId] = useState<string | null>(null);
    const { closeApp } = useTelegramWebApp()

    const { data: user, isSuccess, isFetching } = useGetUsersByIdQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        setIsTelegram(
            typeof window !== "undefined" && tg?.initDataUnsafe?.user?.id !== undefined
        );

        if (tg) {
            // Initialize Telegram WebApp settings
            tg?.ready();
            setTelegramId(tg?.initDataUnsafe?.user?.id ?? null);

            if (tg.headerColor !== "#FFFFFF") {
                tg.setHeaderColor("#292734");
            }
            if (tg.bottomBarColor !== "#000000") {
                tg.setBottomBarColor("#000000");
            }

            if (tg.isVerticalSwipesEnabled) {
                tg.disableVerticalSwipes();
            }

            // if (!tg.isClosingConfirmationEnabled) {
            //     tg.enableClosingConfirmation();
            // }

            if (tg?.BackButton) {
                if (window.location.pathname !== "/") {
                    tg.BackButton.show();

                    tg.onEvent("backButtonClicked", () => {
                        window.history.back();
                    });
                } else {
                    tg.BackButton.hide();
                }
            }
        }

        // Clean up when the component unmounts or when the location changes
        return () => {
            if (tg?.BackButton) {
                tg.BackButton.hide();
                tg.offEvent("backButtonClicked", () => { });
            }
        };
    }, []);

    useEffect(() => {
        if (!isFetching && isSuccess && !user && !user?.user) {
            closeApp(); //close the app if not a user
            console.log("User", user)
        }
    }, [isFetching, isSuccess, user, closeApp]);


    if (isTelegram) {
        return <Fragment>{children}</Fragment>;
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-blue-600 p-4">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full text-center">
                <div className="mb-6 flex items-center justify-center">
                    <LazyLoadImage
                        effect="blur"
                        src={zeenstreetLogo}
                        alt="Ravegenie Logo"
                        className="object-contain h-32 w-32"
                    />
                </div>
                <h1 className="text-3xl font-bold mb-4 text-blue-600 work-sans">Oops! Telegram App Required</h1>
                <p className="text-gray-600 mb-6 work-sans">
                    This app is designed to work within the Telegram environment. Please open it using the Telegram app for the best experience.
                </p>
                <Button
                    onClick={() => window.location.href = "https://t.me/RaveGenie_Bot?start=6880808269"}
                    className="bg-blue-500 work-sans hover:bg-blue-600 text-white font-bold py-6 px-10 rounded-full transition duration-300"
                >
                    Open in Telegram
                </Button>
            </div>
        </div>
    );
}

