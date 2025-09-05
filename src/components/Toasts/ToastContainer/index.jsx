import { useState, useEffect } from 'react';

import styles from './styles.module.css';

import ToastMessage from '../ToastMessage';

function ToastContainer(){

    const [toasts, setToasts] = useState([])

    function handleAddToast(event){
        const { type, text } = event.detail;

        setToasts(prevState => (
            [...prevState, {
                id: Math.random(),
                type,
                text,
            }]
        ))
    }

    useEffect(() => {
        document.addEventListener('addtoast', handleAddToast);

        return () => {
            document.removeEventListener('addtoast', handleAddToast)
        }

    }, []);

    return(
        <div className={styles.toastContainer}>
            {toasts.map(toast => (
                <ToastMessage 
                    key={toast.id}
                    type={toast.type}
                    text={toast.text}                
                />
            ))}
        </div>
    );
}

export default ToastContainer;