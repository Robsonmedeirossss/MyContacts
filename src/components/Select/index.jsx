import styles from './styles.module.css';

function Select({placeholder, error, onChange, ...rest}){
    return(
       <div className={styles.containerSelect}>
            <select placeholder={placeholder} onChange={onChange}>
                <option value="instagram">Instagram</option>
                <option value="instagram">Linkedin</option>
                <option value="instagram">WhatsApp</option>
                <option value="instagram">Discord</option>
            </select>
             {error && <small>Campo inválido</small>}
       </div>
    );
}

export default Select;