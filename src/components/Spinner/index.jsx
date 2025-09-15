import styles from './styles.module.css';

function Spinner({isLoading, isLarge}){
    const stylesSize = `${styles.spinner} ${isLarge? styles.spinnerMax : styles.spinnerMin }`;
    return(
        isLoading && (
            <div className={stylesSize}></div>
        )
    );
}

export default Spinner;
