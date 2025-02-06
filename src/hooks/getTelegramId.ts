import { useEffect, useState } from "react";

export function useGetTelegramId() {
    const [telegramId, setTelegramId] = useState<string | null>("6880808269");

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



