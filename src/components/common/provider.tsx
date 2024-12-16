import { store } from '@lib/store'
import React from 'react'
import { Provider } from "react-redux"
import { Toaster } from "sonner"
// import { TonConnectUIProvider } from '@tonconnect/ui-react';
interface ProvideProps {
    children: React.ReactNode
}

export default function ReduxProvider({ children }: ProvideProps) {
    return (
        <Provider store={store}>
            <Toaster richColors expand={false} position='top-right' />
            {/* <TonConnectUIProvider manifestUrl="https://violet-traditional-rabbit-103.mypinata.cloud/ipfs/QmXwxwb4Dr9AJKCk4CMZiH4GQNG518hEzbdPnA7cGNi8tv"> */}
                {children}
            {/* </TonConnectUIProvider> */}
        </Provider>
    )
}
