declare global {
  interface Window {
    Telegram: {
      WebApp: {
        initDataUnsafe: {
          user: {
            id: string;
            first_name: string;
            last_name?: string;
            username?: string;
            photo_url?: string;
          };
        };
        //to handle more functionalities(tasks, user experience)
        version: string;
        platform: string;
        colorScheme: string;
        viewportHeight: number;
        viewportStableHeight: number;
        isClosingConfirmationEnabled: boolean;
        isVerticalSwipesEnabled: boolean;
        isExpanded: boolean;
        isFullscreen: boolean;
        headerColor: string;
        backgroundColor: string;
        bottomBarColor: string;
        BackButton;
        isVersionAtLeast: (version: string) => boolean;
        expand: () => void;
        requestFullscreen: () => void;
        exitFullscreen: () => void;
        addToHomeScreen: () => void;
        checkHomeScreenStatus: (callback?: (isAdded: boolean) => void) => void;
        shareToStory: (mediaUrl: string, params?: object) => void;
        onEvent: (eventType: string, eventHandler: () => void) => void;
        offEvent: (eventType: string, eventHandler: () => void) => void;
        ready: () => void;
        setBottomBarColor: (color: string) => void;
        setHeaderColor: (color: string) => void;
        enableClosingConfirmation: () => void;
        disableClosingConfirmation: () => void;
        enableVerticalSwipes: () => void;
        disableVerticalSwipes: () => void;
      };
    };
  }
}

export {};