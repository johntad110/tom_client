/* eslint-disable @typescript-eslint/no-empty-object-type */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */

// This object contains the data of the Mini App user.
export interface IWebAppUser {
    id: number;
    is_bot?: boolean;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
    is_premium?: true;
    added_to_attachment_menu?: true;
    allows_write_to_pm?: true;
    photo_url?: string;
}

/**
 * The `window.Telegram.WebApp` object will have  the following fields.
 */
export interface IWebApp {
    initData: string;
    initDataUnsafe: IWebAppInitData;
    version: string;
    platform: string;
    colorScheme: 'light' | 'dark';
    themeParams: IThemeParams;
    isActive: boolean;
    isExpanded: boolean;
    viewportHeight: number;
    viewportStableHeight: number;
    headerColor: string;
    backgroundColor: string;
    bottomBarColor: string;
    isClosingConfirmationEnabled: boolean;
    isVerticalSwipesEnabled: boolean;
    isFullscreen: boolean;
    isOrientationLocked: boolean;
    safeAreaInset: ISafeAreaInset;
    contentSafeAreaInset: IContentSafeAreaInset;
    BackButton: IBackButton;
    MainButton: IBackButton;
    SecondaryButton: IBackButton;
    SettingsButton: ISettingsButton;
    HapticFeedback: IHapticFeedback;
    CloudStorage: ICloudStorage;
    BiometricManager: IBiometricManager;
    Accelerometer: IAccelerometer;
    DeviceOrientation: IDeviceOrientation;
    Gyroscope: IGyroscope;
    LocationManager: ILocationManager;
    isVersionAtLeast: (version: any) => boolean;
    setHeaderColor: (color: any) => void;
    setBackgroundColor: (color: any) => void;
    setBottomBarColor: (color: any) => void;
    enableClosingConfirmation: () => void;
    disableClosingConfirmation: () => void;
    enableVerticalSwipes: () => void;
    disableVerticalSwipes: () => void;
    requestFullscreen: () => void;
    exitFullscreen: () => void;
    lockOrientation: () => void;
    unlockOrientation: () => void;
    addToHomeScreen: () => void;
    checkHomeScreenStatus: ([callback]: any[]) => void;
    onEvent: (eventType: any, eventHandler: any) => void;
    offEvent: (eventType: any, eventHandler: any) => void;
    sendData: (data: any) => void;

    closeScanQrPopup: () => void;

    readTextFromClipboard: ([callback]: any[]) => void;
    requestWriteAccess: ([callback]: any[]) => void;
    requestContact: ([callback]: any[]) => void;
    ready: () => void;
    expand: () => void;
    close: () => void;
}

/**
 * This object contains data that is transferred to the Mini App
 * when it is opened. It is empty if the Mini App was launched 
 * from a keyboard button or from inline mode. 
 * */
export interface IWebAppInitData {
    query_id?: string;
    user?: IWebAppUser;
    receiver?: IWebAppUser;
    chat?: IWebAppChat;
    chat_type?: string;
    chat_instance?: string;
    start_param?: string;
    can_send_after?: number;
    auth_date: number;
    hash: string;
    signature: string;
}

export interface IThemeParams {
    bg_color?: string	//Optional. Background color in the #RRGGBB format.
    text_color?: string	//Optional. Main text color in the #RRGGBB format.
    hint_color?: string	//Optional. Hint text color in the #RRGGBB format.
    link_color?: string	//Optional. Link color in the #RRGGBB format.
    button_color?: string	//Optional. Button color in the #RRGGBB f.
    button_text_color?: string	//Optional. Button text color in the #RRGGBB format.
    secondary_bg_color?: string	//Optional. Bot API 6.1+ Secondary background color in the #RRGGBB format.
    header_bg_color?: string	//Optional. Bot API 7.0+ Header background color in the #RRGGBB format.
    bottom_bar_bg_color?: string	//Optional. Bot API 7.10+ Bottom background color in the #RRGGBB format.
    accent_text_color?: string	//Optional. Bot API 7.0+ Accent text color in the #RRGGBB format.
    section_bg_color?: string	//Optional. Bot API 7.0+ Background color for the section in the #RRGGBB format. It is recommended to use this in conjunction with secondary_bg_color.
    section_header_text_color?: string	//Optional. Bot API 7.0+ Header text color for the section in the #RRGGBB format.
    section_separator_color?: string	//Optional. Bot API 7.6+ Section separator color in the #RRGGBB format.
    subtitle_text_color?: string	//Optional. Bot API 7.0+ Subtitle text color in the #RRGGBB format.
    destructive_text_color?: string	//Optional. Bot API 7.0+ Text color for destructive actions in the #RRGGBB format.
}


export interface IBackButton {
    isVisible: boolean;
    onClick: (callback: Function) => object;
    offClick: (callback: Function) => object;
    show: () => object;
    hide: () => object;

}

export interface ILocationManager {
    isInited: boolean;
    isLocationAvailable: boolean;
    isAccessRequested: boolean;
    isAccessGranted: boolean;
    init: (callback?: Function) => ILocationManager;
    getLocation: (callback: Function) => ILocationManager;
    openSettings: Function; // Note that this method can be called only in response to user interaction with the Mini App interface (e.g., a click inside the Mini App or on the main button).
}

export interface ISafeAreaInset { }
export interface IContentSafeAreaInset { }
export interface IBottomButton { }
export interface ISettingsButton { }
export interface IHapticFeedback { }
export interface ICloudStorage { }
export interface IBiometricManager { }
export interface IAccelerometer { }
export interface IDeviceOrientation { }
export interface IGyroscope { }
export interface IWebAppChat { }