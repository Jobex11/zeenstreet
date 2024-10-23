

// import store from '@/lib/store'
import React from 'react'
// import { Provider } from "react-redux"
import { Toaster } from "sonner"

interface ProvideProps {
    children: React.ReactNode
}

export default function ReduxProvider({ children }: ProvideProps) {
    return (
        // <Provider store={store}>
        <>
            <Toaster richColors expand={false} position='top-right' />
            {children}
        </>
        // </Provider>
    )
}
