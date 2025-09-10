import { useEffect } from 'react';
import iconSucess from '../../../assets/images/icons/check-circle.svg';
import iconDanger from '../../../assets/images/icons/x-circle.svg';

import styles from './styles.module.css';


function ToastMessage({toast: {id, type = 'default', text, duration}, onRemoveToast}){
    const types = ['default', 'sucess', 'danger'];

    const stylesVariants = types.includes(type) 
     ? `${styles[type]}`
     : `${styles.default}`; 

     function removeToast(){
        onRemoveToast(id)
     }


     useEffect(() => {
        setTimeout(() => {
            onRemoveToast(id);
        }, duration || 4000);
     }, []);

    return(
        <div className={`${styles.toastMessage} ${stylesVariants}`} onClick={removeToast} role='button'>
            {type === 'sucess' && <img src={iconSucess} alt="Sucess icon" />}
            {type === 'danger' && <img src={iconDanger} alt="Error icon" />}
            <strong>{text}</strong>
        </div>
    );
}

export default ToastMessage;