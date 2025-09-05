import iconSucess from '../../../assets/images/icons/check-circle.svg';
import iconDanger from '../../../assets/images/icons/x-circle.svg';

import styles from './styles.module.css';


function ToastMessage({type = 'default', text}){
    const types = ['default', 'sucess', 'danger'];

    const stylesVariants = types.includes(type) 
     ? `${styles[type]}`
     : `${styles.default}`; 

    return(
        <div className={`${styles.toastMessage} ${stylesVariants}`}>
            {type === 'sucess' && <img src={iconSucess} alt="Sucess icon" />}
            {type === 'danger' && <img src={iconDanger} alt="Error icon" />}
            <strong>{text}</strong>
        </div>
    );
}

export default ToastMessage;