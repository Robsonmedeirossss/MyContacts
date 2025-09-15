import styles from './styles.module.css';

import Button from '../Button'; 
import ReactPortal from '../ReactPortal';
import useAnimationUnmount from '../../hooks/useAnimationUnmount';

function Modal({
    title,
    children, 
    type = 'default', 
    visible, 
    labelCancelButton,
    labelConfirmButton,
    onClickConfirm, 
    onClickCancel,
    isLoading,
    }){

    const { shouldRender, animatedRef } = useAnimationUnmount(visible);

    const stylesVariant = type === 'danger'
        ? `${styles.danger}`
        : '';

    const stylesVariantOverlay = visible 
        ? `${styles.overlay}` 
        : `${styles.overlay} ${styles.overlayUnmounting}`;
    
    const boxModalStyles = visible
        ? `${styles.boxModal} ${stylesVariant}`
        : `${styles.boxModal} ${stylesVariant} ${styles.boxModalUnmounting}`;

    if(!shouldRender) return null;

    return (
        <ReactPortal containerId="modal-root">
            <div className={stylesVariantOverlay} ref={animatedRef}>
                <div className={boxModalStyles}>
                <h2>{title}</h2>
                {children}
                <footer>
                    <button 
                        className={styles.cancelButton} 
                        onClick={onClickCancel}
                        disabled={isLoading}
                    >
                        {labelCancelButton}
                    </button>
                    <Button 
                        variant={type} 
                        onClick={onClickConfirm}
                        isLoading={isLoading}
                    >
                        {labelConfirmButton}
                    </Button>
                </footer>
                </div>
            </div>
        </ReactPortal>
    )
}

export default Modal;