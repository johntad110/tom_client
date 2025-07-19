import { useEffect, useState } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsyncInitialize<T>(func: () => Promise<T>, deps: any[] = []) {
    const [state, setState] = useState<T | undefined>();
    useEffect(() => {
        (async () => {
            setState(await func());
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps);

    return state;
}