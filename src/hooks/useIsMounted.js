import { useCallback, useEffect, useRef } from "react";

function useIsMounted(){

    const isMounted = useRef(false);

    useEffect(() => {
        isMounted.current = true;

        return () => {
            isMounted.current = false;
        }
    }, []);

    const getIsMounted = useCallback(() => {
        return isMounted.current;
    })

    return getIsMounted;
}

export default useIsMounted;