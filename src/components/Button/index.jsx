import styles from './styles.module.css';

import Spinner from '../Spinner';

function Button({children, variant = 'primary', disabled, onClick, isLoading}){

    const buttonClasses = disabled 
    ? `${styles.button} ${styles.disabled}`
    :`${styles.button} ${styles[variant]}`
    
    return(
        <button 
            type="submit"
            onClick={onClick}
            className={buttonClasses}
            disabled={disabled || isLoading}
        >
            {isLoading? <Spinner  isLoading={isLoading} isLarge={false}/> : children}
        </button>
    );
} 

export default Button;