import { createPortal } from "react-dom";

import styles from './styles.module.css';

import Spinner from "../Spinner";

function Loader({isLoading}){
    if(!isLoading) return null;
    
    return(
        createPortal(
            <div className={styles.overlay}>
                <Spinner isLoading={isLoading} isLarge={true}/>
            </div>,
            document.getElementById('loader-root')
        )
    );
}

export default Loader;