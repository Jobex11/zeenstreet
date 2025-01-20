import { useEffect, useState } from "react";

export function useGetTelegramId() {
    const [telegramId, setTelegramId] = useState<string | null>(null);

    // useEffect(() => {
    //     const tg = window.Telegram?.WebApp;
    //     if (tg) {
    //         tg.ready();
    //         const user = tg.initDataUnsafe?.user;

    //         if (user) {
    //             setTelegramId(user.id ?? null);
    //         }
    //     }
    // }, [])

    useEffect(() => {
        if (window.Telegram && window.Telegram.WebApp) {
            const tgData = window.Telegram.WebApp.initDataUnsafe;
            if (tgData && tgData.user && tgData.user.id) {
                setTelegramId(tgData.user.id.toString());
            }
        }
    }, []);
    return { telegramId }
}



