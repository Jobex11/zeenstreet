import { createStore } from '@lib/store'
import { PropsWithChildren, useState, useEffect } from 'react'
import { Provider } from "react-redux"
import { Toaster } from "sonner"
import { MdOutlineMoodBad } from "react-icons/md";
import { PiConfettiLight } from "react-icons/pi";

export default function ReduxProvider({ children }: PropsWithChildren) {
    const [telegramId, setTelegramId] = useState<string | null>(null);

    useEffect(() => {
        const tg = window.Telegram?.WebApp;
        const user = tg.initDataUnsafe?.user;
        if (user) {
            setTelegramId(user.id ?? null);
        }
    }, [])

    const { store } = createStore(telegramId ?? "");
    return (
        <Provider store={store}>
            <Toaster richColors
                expand={false}
                closeButton
                visibleToasts={2}
                position='top-right' icons={{
                    success: <PiConfettiLight size={25} />,
                    error: <MdOutlineMoodBad size={25} />
                }} />
            {children}
        </Provider>
    )
}
