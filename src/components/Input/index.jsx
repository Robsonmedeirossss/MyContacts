import styles from './styles.module.css';

function Input({type, placeholder, error, onChange, value, ...rest}){

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
             />
             {error && <small>{error}</small>}
       </div>
    );
}

export default Input;