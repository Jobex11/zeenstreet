import { createStore } from '@lib/store'
import { PropsWithChildren } from 'react'
import { Provider } from "react-redux"
import { Toaster } from "sonner"
import { MdOutlineMoodBad } from "react-icons/md";
import { PiConfettiLight } from "react-icons/pi";
import { useGetTelegramId } from "@hooks/getTelegramId"

export default function ReduxProvider({ children }: PropsWithChildren) {
    const { telegramId } = useGetTelegramId();

    const { store } = createStore(telegramId ?? "");
    return (
        <Provider store={store}>
            <Toaster richColors
                expand={false}
                visibleToasts={2}
                position='top-right' icons={{
                    success: <PiConfettiLight size={26} />,
                    error: <MdOutlineMoodBad size={30} />
                }} />
            {children}
        </Provider>
    )
}
