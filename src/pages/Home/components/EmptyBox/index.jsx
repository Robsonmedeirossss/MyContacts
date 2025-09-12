import emptyBox from '../../../../assets/images/icons/empty-box.svg';

import styles from './styles.module.css';

function EmptyBox(){
    return(
        <div className={styles.containerEmptyBox}>
            <img src={emptyBox} alt="Icon empty box" />
            <p>Você ainda não tem nenhum contato cadastrado!
            Clique no botão <strong>”Novo contato”</strong> acima para cadastrar 
            o seu primeiro</p>
        </div>
    );
}

export default EmptyBox;