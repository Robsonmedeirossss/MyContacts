import styles from './styles.module.css';

function Input({type, placeholder, error, onChange, value, max, disabled}){

    const inputClasses = error ? 
        `${styles.containerInput} ${styles.containerInputError}` 
        : 
        `${styles.containerInput} ${styles.containerInputSucess}`;


    return(
       <div className={inputClasses}>
             <input 
                type={type} 
                placeholder={placeholder} 
                onChange={onChange}
                value={value}
                maxLength={max? max : 80}
                disabled={disabled}
             />
             {error && <small>{error}</small>}
       </div>
    );
}

export default Input;