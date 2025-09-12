import styles from './styles.module.css';
import arrow from '../../../../assets/images/icons/arrow.svg';

import Card from '../../../../components/Card';

function ListContacts({filteredContacts, onChangeOrderBy, onOpenModalDeleteContact, orderBy }){
    return (
        <div className="listBody">
            <header className={styles.headerList}>
                {filteredContacts.length > 0 && (
                    <button onClick={onChangeOrderBy}>
                    <span>Nome</span>
                    <img src={arrow} className={`${orderBy === 'ASC'? styles.asc : styles.desc}`} alt="arrow up" />
                </button>
                )}
            </header>
            <div className={styles.containerCards}>
                {filteredContacts.map(contact => (
                    <Card 
                        key={contact.id}
                        id={contact.id}
                        name={contact.name}
                        email={contact.email}
                        phone={contact.phone}
                        category={contact.category?.name}
                        onClickDeletedButton={() => onOpenModalDeleteContact(contact)}
                    />
                ))}
            </div>
        </div>
    );
}

export default ListContacts;