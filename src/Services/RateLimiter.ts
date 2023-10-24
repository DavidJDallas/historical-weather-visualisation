import { useState, useEffect} from 'react';

type Callback = () => Promise<void>;

export const useRateLimiter = (limit: number, interval: number) => {

    const [queue, setQueue] = useState<Callback[]>([]);
    const [activeRequests, setActiveRequests] = useState<number>(0);

    useEffect(() => {
        if(activeRequests < limit && queue.length > 0){
            const execute = queue[0];
            setActiveRequests((prev) => prev+1);
            execute().finally(() => {
                setQueue((prevQueue) => prevQueue.slice(1));
                setActiveRequests((prev) => prev-1);
                setTimeout(() => {}, interval);
            });
        }
    }, [queue, activeRequests, limit, interval])

    const enqueue = (callback: Callback) => {
        setQueue((prevQueue) => [...prevQueue, callback])
    }

    return {enqueue};

}