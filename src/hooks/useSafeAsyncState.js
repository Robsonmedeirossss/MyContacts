import { useCallback, useState } from "react";
import useIsMounted from "./useIsMounted";

function useSafeAsyncState(initialValue){
    const [state, setState] = useState(initialValue);
    const isMounted = useIsMounted();

    const setSafeAsyncState = useCallback((data) => {
        if(isMounted()){
            setState(data)
        }
    }, []);

    return [state, setSafeAsyncState];
}

export default useSafeAsyncState;