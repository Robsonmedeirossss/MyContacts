import { createPortal } from 'react-dom';

import styles from './styles.module.css';

import Button from '../Button'; 

function Modal(){
    return (
        createPortal(<div className={styles.overlay}>
            <div className={styles.boxModal}>
                <h2>Tem certeza que deseja remover o contato ”Mateus Silva”?</h2>
                <p>Esta ação não poderá ser desfeita!</p>
                <footer>
                    <button className={styles.cancelButton}>Cancelar</button>
                    <Button variant='danger'>Deletar</Button>
                </footer>
            </div>
    </div>,
    document.getElementById('modal-root'))
    )
}

export default Modal;