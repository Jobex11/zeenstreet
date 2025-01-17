import { createStore } from '@lib/store'
import { PropsWithChildren, useState, useEffect } from 'react'
import { Provider } from "react-redux"
import { Toaster } from "sonner"



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
            <Toaster richColors expand={false} position='top-right' />
            {children}
        </Provider>
    )
}
