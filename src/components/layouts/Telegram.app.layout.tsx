import { Button } from "@components/ui/button";
import { LazyLoadImage } from "react-lazy-load-image-component";
import zeenstreetLogo from "@assets/images/icons/zenstreet_logo.png";
import { useGetUsersByIdQuery } from '@hooks/redux/users';
import { useTelegramWebApp } from "@hooks/useTelegramWebapp";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/hooks/redux/slices/usersSlice";
import { useGetUserSharesQuery } from "@/hooks/redux/shares";
import avatarImg from "@assets/images/icons/users_avatar.svg";
import { Fragment, PropsWithChildren, useEffect, useState } from "react";
import { useGetTelegramId } from "@hooks/getTelegramId"

export default function TelegramWrapper({ children }: PropsWithChildren) {

    const [isTelegram, setIsTelegram] = useState(true);
    const { telegramId } = useGetTelegramId();
    const [telegramUsername, setTelegramUsername] = useState<string | null>(null);
    const [telegramImage, setTelegramImage] = useState<string | null>(null);
    const { closeApp } = useTelegramWebApp();
    const dispatch = useDispatch();

    const { data: user, isSuccess, isFetching } = useGetUsersByIdQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    const { data: shares, } = useGetUserSharesQuery(telegramId ?? "", {
        skip: !telegramId,
        refetchOnReconnect: true,
        refetchOnFocus: true,
        refetchOnMountOrArgChange: true,
    });

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        setIsTelegram(typeof window !== "undefined" && tg?.initDataUnsafe?.user?.id !== undefined);

        if (tg) {
            tg.ready();
            const user = tg.initDataUnsafe?.user;

            if (user) {
                setTelegramUsername(user.username ?? null);
                setTelegramImage(user.photo_url ?? null);

                // Configure Telegram UI
                tg.setHeaderColor("#292734");
                tg.setBottomBarColor("#000000");
                tg.disableVerticalSwipes();

                if (tg?.BackButton) {
                    tg.BackButton[location.pathname !== "/" ? "show" : "hide"]();
                    tg.onEvent("backButtonClicked", () => window.history.back());
                }
            }
        }

        // Cleanup on unmount
        return () => {
            if (tg?.BackButton) {
                tg.BackButton.hide();
                tg.offEvent("backButtonClicked", () => { });
            }
        };
    }, []);

    useEffect(() => {
        if (!isFetching && isSuccess && (!user || !user.user)) {
            closeApp();
        }
    }, [isFetching, isSuccess, user, closeApp]);

    useEffect(() => {
        if (user?.user) {
            dispatch(
                setUserDetails({
                    username: telegramUsername ?? "",
                    accountName: user?.user?.accountName,
                    shares: shares?.shares,
                    telegram_id: telegramId ?? "",
                    photo_url: telegramImage ?? avatarImg,
                })
            );
        }
    }, [dispatch, user, telegramId, telegramUsername, telegramImage, shares?.shares]);

    if(isTelegram) {
        return <Fragment>{children}</Fragment>
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

