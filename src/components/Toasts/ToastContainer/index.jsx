import { useState, useEffect, useCallback } from 'react';

import styles from './styles.module.css';

import ToastMessage from '../ToastMessage';
import { EventToast } from '../../../utils/addToast';

function ToastContainer(){

    const [toasts, setToasts] = useState([])

    function handleAddToast({type, text, duration}){

        setToasts(prevState => (
            [...prevState, {
                id: Math.random(),
                type,
                text,
                duration
            }]
        ))
    }

    useEffect(() => {
        EventToast.addEvent('addtoast', handleAddToast);

        return () => {
            EventToast.removeListener('addtoast', handleAddToast);
        }

    }, []);

    const handleRemoveToast = useCallback( (id) => {
        setToasts(prevState => {
            const newState = prevState.filter(toast => (
                toast.id !== id
            ))

            return newState;
        })
    }, []);

    return(
        <div className={styles.toastContainer}>
            {toasts.map(toast => (
                <ToastMessage 
                    key={toast.id}
                    toast={toast}    
                    onRemoveToast={handleRemoveToast}           
                />
            ))}
        </div>
    );
}

export default ToastContainer;