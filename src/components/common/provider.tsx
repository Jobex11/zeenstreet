import { store } from '@lib/store'
import React, { PropsWithChildren } from 'react'
import { Provider } from "react-redux"
import { Toaster } from "sonner"


export default function ReduxProvider({ children }: PropsWithChildren) {
    return (
        <Provider store={store}>
            <Toaster richColors expand={false} position='top-right' />
            {children}
        </Provider>
    )
}
