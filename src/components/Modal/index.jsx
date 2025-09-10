import styles from './styles.module.css';

import Button from '../Button'; 
import ReactPortal from '../ReactPortal';

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

    if(!visible){
        return null;
    }

    const stylesVariant = type === 'danger'
        ? `${styles.danger}`
        : '';

    return (
        <ReactPortal containerId="modal-root">
            <div className={styles.overlay}>
                <div className={`${styles.boxModal} ${stylesVariant}`}>
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