import styles from './styles.module.css';

import magnifierQuestion from '../../../../assets/images/icons/magnifier-question.svg';

function EmptyFilteredContacts({ searchItem }){
    return(
        <div className={styles.containerNoFilteredContacts}>
            <img src={magnifierQuestion} alt="Icone magnifier question" />
            <span>Nenhum resultado foi encontrado para <strong>”{searchItem}”</strong>.</span>
        </div>
    );
}

export default EmptyFilteredContacts;