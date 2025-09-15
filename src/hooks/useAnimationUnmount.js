import { useEffect, useState, useRef } from "react";

function useAnimationUnmount(visible){

    const [shouldRender, setShoudRender] = useState(visible);
    const animatedRef = useRef(null);

    useEffect(() => {

        function handleAnimationEnd(){
            setShoudRender(false);
        }

        if(visible){
            setShoudRender(true)
        }

        if(!visible && animatedRef.current){
            animatedRef.current.addEventListener('animationend', handleAnimationEnd);
        }

    return () => {
        if(animatedRef.current){
            animatedRef.current.removeEventListener('animationend', handleAnimationEnd);
        }
    }

    }, [visible]);

    return {
        shouldRender,
        animatedRef,
    }

}

export default useAnimationUnmount;
