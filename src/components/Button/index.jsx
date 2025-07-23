import styles from './styles.module.css';

function Button({children, variant = 'primary'}){

    const buttonClasses = `${styles.button} ${styles[variant]}`

    return(
        <button type="submit" className={buttonClasses}>
            {children}
        </button>
    );
} 

export default Button;