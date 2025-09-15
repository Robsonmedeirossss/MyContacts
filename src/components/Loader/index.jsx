import styles from './styles.module.css';

import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";
import useAnimationUnmount from '../../hooks/useAnimationUnmount';

function Loader({isLoading}){

    const { shouldRender, animatedRef } = useAnimationUnmount(isLoading);

    if(!shouldRender) return null;

    const stylesVariantUnmounting = !isLoading 
        ? `${styles.overlay} ${styles.overlayUnmounting}`
        : `${styles.overlay}`
    
    return(
        <ReactPortal containerId="loader-root">
            <div className={stylesVariantUnmounting} ref={animatedRef}>
                <Spinner isLoading={isLoading} isLarge={true}/>
            </div>
        </ReactPortal>
    );
}

export default Loader;