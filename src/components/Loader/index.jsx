import { createPortal } from "react-dom";

import styles from './styles.module.css';

function Loader(){
    return(
        createPortal(
            <div className={styles.overlay}>
                <div className={styles.loader}></div>
            </div>,
            document.getElementById('loader-root')
        )
    );
}

export default Loader;