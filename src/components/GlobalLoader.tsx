import { useAppStatusStore } from "../stores/appStatusStore";
import { useTelegramStore } from "../stores/telegramStore";
import { ScaleLoader } from "react-spinners";

export const GlobalLoader = () => {
    const { initialized, errors, retryInitialization } = useAppStatusStore();
    const { webApp } = useTelegramStore()

    if (initialized) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4"
                style={{ backgroundColor: webApp?.themeParams.bg_color }}>
                {/* The loading indicator should only be shown if we don't have error */}
                {(!errors.telegram && !errors.auth && !errors.tonClient) && <ScaleLoader color={webApp?.themeParams.hint_color} />}

                {(errors.telegram || errors.auth || errors.tonClient) && (
                    <div className="p-4 rounded-lg mb-4 w-full text-gray-400 flex flex-col items-center">
                        <h3 className="text-sm mb-2 text-center">sth ain't working.🤔</h3>
                        <h3 className="text-sm mb-2 text-center">🤷‍♂️ idk why, but let's Retry.</h3>
                        {/* {errors.auth && <p>• Failed to authenticate</p>}
                        {errors.telegram && <p>• Failed to connect to Telegram</p>}
                        {errors.tonClient && <p>• Failed to connect to TON network</p>} */}

                        {/* We will show this button if we have telegram error.
                        Because having telegram error means we don't have a webApp object. 
                        And if we don't have a webApp object the `MainButton` cannot be shown.
                        But if we do have `webApp`, we are using the `MainButton` for retry in the 
                        `appStatusStore` error handling section. */}
                        {errors.telegram && (
                            <button
                                onClick={() => retryInitialization()}
                                className="w-full text-white mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                            >Retry</button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};
