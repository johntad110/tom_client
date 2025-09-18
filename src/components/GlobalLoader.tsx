import { useAppStatusStore } from "../stores/appStatusStore";
import { useTelegramStore } from "../stores/telegramStore";
import { ScaleLoader } from "react-spinners";
import { useEffect, useState } from "react";

export const GlobalLoader = () => {
    const { initialized, errors, retryInitialization, initializationProgress, initializationStage } = useAppStatusStore();
    const { webApp } = useTelegramStore()
    const [animatedProgress, setAnimatedProgress] = useState(0);

    useEffect(() => {
        const timer = setTimeout(() => { setAnimatedProgress(initializationProgress); }, 100);
        return () => clearTimeout(timer);
    }, [initializationProgress]);

    if (initialized) return null;

    return (
        <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-4"
                style={{ backgroundColor: webApp?.themeParams.bg_color }}>

                {(!errors.telegram && !errors.auth && !errors.tonClient) && (
                    <div className="w-full max-w-xs mb-6">
                        <div className="text-xs text-center mb-2 text-gray-400">
                            {initializationStage}
                        </div>
                        <div
                            className="w-full h-2 rounded-full overflow-hidden"
                            style={{ backgroundColor: webApp?.themeParams.secondary_bg_color || '#f3f4f6' }}
                        >
                            <div
                                className="h-full transition-all duration-500 ease-out rounded-full"
                                style={{
                                    width: `${animatedProgress}%`,
                                    background: `linear-gradient(90deg, 
                                        ${webApp?.themeParams.button_color || '#2481cc'}, 
                                        ${webApp?.themeParams.button_color || '#2481cc'}80)`
                                }}
                            />
                        </div>
                        <div className="text-xs text-center mt-1 text-gray-400">
                            {Math.round(animatedProgress)}%
                        </div>
                    </div>
                )}

                {(!errors.telegram && !errors.auth && !errors.tonClient) && <ScaleLoader color={webApp?.themeParams.hint_color} />}

                {(errors.telegram || errors.auth || errors.tonClient) && (
                    <div className="p-4 rounded-lg mb-4 w-full text-gray-400 flex flex-col items-center">
                        <h3 className="text-sm mb-2 text-center">sth ain't working.🤔</h3>
                        <h3 className="text-sm mb-2 text-center">🤷‍♂️ idk why, but let's Retry.</h3>

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
