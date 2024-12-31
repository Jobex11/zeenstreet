import { ShareToStoryParams } from '@/global'
import { useState, useEffect, useCallback } from 'react'

interface TelegramWebAppData {
    isAvailable: boolean
    version: string
    platform: string
    viewportHeight: number
    viewportStableHeight: number
    isClosingConfirmationEnabled: boolean
    isVerticalSwipesEnabled: boolean
    isExpanded: boolean
    isFullscreen: boolean
    headerColor: string
    backgroundColor: string
    bottomBarColor: string
}

export function useTelegramWebApp() {
    const [webAppData, setWebAppData] = useState<TelegramWebAppData>({
        isAvailable: false,
        version: '',
        platform: '',
        viewportHeight: 0,
        viewportStableHeight: 0,
        isClosingConfirmationEnabled: false,
        isVerticalSwipesEnabled: false,
        isExpanded: false,
        isFullscreen: false,
        headerColor: '',
        backgroundColor: '',
        bottomBarColor: '',
    })

    useEffect(() => {
        const tg = window.Telegram?.WebApp

        if (tg) {
            const updateWebAppData = () => {
                setWebAppData({
                    isAvailable: true,
                    version: tg.version,
                    platform: tg.platform,
                    viewportHeight: tg.viewportHeight,
                    viewportStableHeight: tg.viewportStableHeight,
                    isClosingConfirmationEnabled: tg.isClosingConfirmationEnabled,
                    isVerticalSwipesEnabled: tg.isVerticalSwipesEnabled,
                    isExpanded: tg.isExpanded,
                    isFullscreen: tg.isFullscreen,
                    headerColor: tg.headerColor,
                    backgroundColor: tg.backgroundColor,
                    bottomBarColor: tg.bottomBarColor,
                })
            }

            updateWebAppData()

            tg.onEvent('viewportChanged', updateWebAppData)
            tg.onEvent('themeChanged', updateWebAppData)

            return () => {
                tg.offEvent('viewportChanged', updateWebAppData)
                tg.offEvent('themeChanged', updateWebAppData)
            }
        }
    }, [])



    const expandApp = useCallback(() => {
        window.Telegram?.WebApp?.expand()
    }, [])

    const requestFullscreen = useCallback(() => {
        window.Telegram?.WebApp?.requestFullscreen()
    }, [])

    const exitFullscreen = useCallback(() => {
        window.Telegram?.WebApp?.exitFullscreen()
    }, [])

    const addToHomeScreen = useCallback(() => {
        window.Telegram?.WebApp?.addToHomeScreen()
    }, [])

    const checkHomeScreenStatus = useCallback((callback?: (isAdded: boolean) => void) => {
        window.Telegram?.WebApp?.checkHomeScreenStatus(callback)
    }, [])

    const shareToStory = useCallback((mediaUrl: string, params?: ShareToStoryParams) => {
        window.Telegram?.WebApp?.shareToStory(mediaUrl, params);
    }, []);

    const isVersionAtLeast = useCallback((version: string) => {
        return window.Telegram?.WebApp?.isVersionAtLeast(version) || false
    }, [])

    return {
        ...webAppData,
        expandApp,
        requestFullscreen,
        exitFullscreen,
        addToHomeScreen,
        checkHomeScreenStatus,
        shareToStory,
        isVersionAtLeast,
    }
}
