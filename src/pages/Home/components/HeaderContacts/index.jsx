import styles from './styles.module.css';
import { Link } from 'react-router-dom';

function HeaderContacts({hasContacts, qtyOfFilteredContacts, hasError}){

    const conditionalStyle = `${styles.headerContacts} ${hasError? styles.headerError : (hasContacts > 0 ? '' : styles.headerNoHasContacts)}`;

    return(
        <>
            <div className={conditionalStyle}>
                {hasContacts && (
                    <strong>{qtyOfFilteredContacts === 1 
                        ? `${qtyOfFilteredContacts} contato` 
                        : `${qtyOfFilteredContacts} contatos`}
                    </strong>
                )}
            <Link to="/new">Novo Contato</Link>
            </div>              
            <hr className={styles.line}/>
        </>
    );
}

export default HeaderContacts;