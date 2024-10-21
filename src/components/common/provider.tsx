

// import store from '@/lib/store'
import React from 'react'
// import { Provider } from "react-redux"
import { Toaster } from "sonner"
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

interface ProvideProps {
    children: React.ReactNode
}

export default function ReduxProvider({ children }: ProvideProps) {
    return (
        // <Provider store={store}>
        <>
            <ProgressBar
                height="2px"
                color="#D25804"
                options={{ showSpinner: false }}
                shallowRouting
            />
            <Toaster richColors expand={false} position='top-right' />
            {children}
        </>
        // </Provider>
    )
}
