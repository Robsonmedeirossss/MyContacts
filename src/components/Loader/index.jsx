import styles from './styles.module.css';

import Spinner from "../Spinner";
import ReactPortal from "../ReactPortal";

function Loader({isLoading}){
    if(!isLoading) return null;
    
    return(
        <ReactPortal containerId="loader-root">
            <div className={styles.overlay}>
                <Spinner isLoading={isLoading} isLarge={true}/>
            </div>
        </ReactPortal>
    );
}

export default Loader;