import { useEffect, useState } from 'react';

/**
 * A custom React hook that asynchronously initializes a value.
 *
 * This hook is useful when you need to fetch or compute a value asynchronously
 * when a component mounts or when its dependencies change, and you want to
 * store that value in the component's state.
 *
 * @template T The type of the value to be initialized.
 * @param {() => Promise<T>} func An asynchronous function that returns the value to be initialized.
 * This function will be called inside `useEffect`.
 * @param {any[]} [deps=[]] An optional array of dependencies. The `func` will be re-executed
 * if any of these dependencies change. If no dependencies are provided,
 * the `func` will run only once after the initial render.
 * @returns {T | undefined} The initialized value. It will be `undefined` until the
 * asynchronous function completes.
 *
 * @example
 * ```typescript
 * import React from 'react';
 * import { useAsyncInitialize } from './useAsyncInitialize';
 *
 * interface User {
 * id: number;
 * name: string;
 * }
 *
 * async function fetchUserData(): Promise<User> {
 * // Simulate an API call
 * return new Promise(resolve => {
 * setTimeout(() => {
 * resolve({ id: 1, name: 'John Doe' });
 * }, 1000);
 * });
 * }
 *
 * function UserProfile() {
 * const user = useAsyncInitialize(fetchUserData);
 *
 * if (!user) {
 * return <div>Loading user data...</div>;
 * }
 *
 * return (
 * <div>
 * <h1>User Profile</h1>
 * <p>ID: {user.id}</p>
 * <p>Name: {user.name}</p>
 * </div>
 * );
 * }
 *
 * export default UserProfile;
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useAsyncInitialize<T>(func: () => Promise<T>, deps: any[] = []) {
    const [state, setState] = useState<T | undefined>();
    useEffect(() => {
        // Immediately invoked asynchronous function to handle the promise
        (async () => {
            setState(await func());
        })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps); // The effect re-runs when 'deps' change

    return state;
}