import { useState, useEffect, useRef } from 'react';
import { useNow } from './useNow';

export const useRetryTimer = (retryDelay: number | null, resetDelay: () => void) => {
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const now = useNow();
    const endTimeRef = useRef<number>(0);

    useEffect(() => {
        if (retryDelay && retryDelay > 0) {
            endTimeRef.current = Date.now() + retryDelay;
            setTimeLeft(Math.ceil(retryDelay / 1000));
        }
    }, [retryDelay]);

    useEffect(() => {
        if (endTimeRef.current === 0) return;
        
        const remaining = endTimeRef.current - now.getTime();
        
        if (remaining <= 0) {
            setTimeLeft(0);
            resetDelay();
            endTimeRef.current = 0;
        } else {
            setTimeLeft(Math.ceil(remaining / 1000));
        }
    }, [now, resetDelay]);

    return timeLeft;
};