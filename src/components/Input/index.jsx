import styles from './styles.module.css';

function Input({type, placeholder, error, onChange, ...rest}){
    return(
       <div className={styles.containerInput}>
             <input type={type} placeholder={placeholder} onChange={onChange}/>
             {error && <small>Campo inválido</small>}
       </div>
    );
}

export default Input;