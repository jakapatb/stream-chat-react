import { useCallback, useEffect, useRef, useState } from 'react';
// todo: provide start timestamp
export const useTimeElapsed = ({ startOnMount } = {}) => {
    const [secondsElapsed, setSecondsElapsed] = useState(0);
    const updateInterval = useRef();
    const startCounter = useCallback(() => {
        updateInterval.current = setInterval(() => {
            setSecondsElapsed((prev) => prev + 1);
        }, 1000);
    }, []);
    const stopCounter = useCallback(() => {
        clearInterval(updateInterval.current);
    }, []);
    useEffect(() => {
        if (!startOnMount)
            return;
        updateInterval.current = setInterval(() => {
            setSecondsElapsed((prev) => prev + 1);
        }, 1000);
        return () => {
            stopCounter();
        };
    }, [startOnMount, stopCounter]);
    return {
        secondsElapsed,
        startCounter,
        stopCounter,
    };
};
