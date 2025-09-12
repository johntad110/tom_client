import { useState } from 'react';

interface CopyToClipboardProps {
    text: string;
    children: React.ReactNode;
    onCopy?: () => void;
}

const CopyToClipboard = ({ text, children, onCopy }: CopyToClipboardProps) => {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            setIsCopied(true);
            onCopy?.();
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            setIsCopied(true);
            onCopy?.();
            setTimeout(() => setIsCopied(false), 2000);
        }
    };

    return (
        <button onClick={handleCopy} className="relative">
            {children}
            {isCopied && (
                <div className="absolute -top-8 -left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                    Copied!
                </div>
            )}
        </button>
    );
};

export default CopyToClipboard;