import { useEffect, useRef } from "react";
import { useAppStatusStore } from "../stores/appStatusStore";
import "./GlobalLoader.css";

export const GlobalLoader = () => {
    const { initialized, errors, retryInitialization } = useAppStatusStore();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        const bubbles: any[] = [];
        const numBubbles = 20;

        // Resize canvas to fill screen
        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resize();
        window.addEventListener("resize", resize);

        // Initialize bubbles
        for (let i = 0; i < numBubbles; i++) {
            bubbles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: 30 + Math.random() * 30,
                dx: (Math.random() - 0.5) * 1.5,
                dy: (Math.random() - 0.5) * 1.5,
                opacity: 0.2 + Math.random() * 0.5,
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let bubble of bubbles) {
                ctx.beginPath();
                ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
                ctx.shadowColor = "rgba(255,0,255,0.5)";
                ctx.shadowBlur = 20;
                ctx.arc(bubble.x, bubble.y, bubble.r, 0, Math.PI * 2);
                ctx.fill();

                // Update position
                bubble.x += bubble.dx;
                bubble.y += bubble.dy;

                // Bounce off edges
                if (bubble.x - bubble.r < 0 || bubble.x + bubble.r > canvas.width)
                    bubble.dx *= -1;
                if (bubble.y - bubble.r < 0 || bubble.y + bubble.r > canvas.height)
                    bubble.dy *= -1;
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    if (initialized) return null;

    return (
        <div className="fixed inset-0 z-50">
            <canvas ref={canvasRef} className="absolute inset-0 z-0" />

            <div className="absolute inset-0 z-10 bg-gray-900/70 backdrop-blur-md flex flex-col items-center justify-center p-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
                <h2 className="text-white text-xl font-semibold mb-2">Loading App</h2>
                <p className="text-gray-500 mb-6 text-center">
                    Initializing all required services...
                </p>

                {(errors.telegram || errors.auth || errors.tonClient) && (
                    <div className="bg-red-900/50 p-4 rounded-lg mb-4 max-w-md text-gray-400">
                        <h3 className="font-medium mb-2">Initialization Error</h3>
                        {errors.auth && <p>• Failed to authenticate</p>}
                        {errors.telegram && <p>• Failed to connect to Telegram</p>}
                        {errors.tonClient && <p>• Failed to connect to TON network</p>}

                        <button
                            onClick={() => retryInitialization()}
                            className="text-white mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg transition-colors"
                        >
                            Retry
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};
