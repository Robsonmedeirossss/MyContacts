import { useState, useEffect, useMemo, useCallback } from 'react';

import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import arrow from '../../assets/images/icons/arrow.svg';
import Card from '../../components/Card';
import sad from '../../assets/images/icons/sad.svg';
import emptyBox from '../../assets/images/icons/empty-box.svg';
import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';

import Loader from '../../components/Loader';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

import toast from '../../utils/addToast';

import ContactsService from '../../services/ContactsService';
import addToast from '../../utils/addToast';

function Home(){
    const [contacts, setContacts] = useState([]);
    const [orderBy, setOrderBy] = useState('ASC');
    const [searchItem, setSearchItem] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [contactBeingDeleted, setContactBeingDeleted] = useState(null);
    const [modalDeleteIsVisible, setModalDeleteIsVisible] = useState(false);
    const [isLoadingDeleteContact, setIsLoadingDeleteContact] = useState(false);
    const filteredContacts = useMemo(() => contacts.filter(contact => (
            contact.name.toUpperCase().includes(searchItem.toUpperCase())
        )), [contacts, searchItem]);

        const loadContacts = useCallback(async () => {
            
            setIsLoading(true);

            try {
                const { contacts } = await ContactsService.listContacts(orderBy);
                setContacts(contacts);
                setHasError(false);
            } catch (error) {
                console.log('Erro:', error);
                setHasError(true);
            }finally{
                setIsLoading(false);
            }
        }
        , [orderBy]);

    useEffect(() => {
        loadContacts();

    }, [orderBy, loadContacts]);

    function handleChangeOrderBy(){
        setOrderBy(prevState => (
            prevState === 'ASC'
            ? 'DESC'
            : 'ASC'
        ))
    }

    function handleChangeSearchItem(event){
        setSearchItem(event.target.value);
    }

    function handleTryAgain(){
        loadContacts();
    }

    function handleOpenModalDeleteContact(contact){
        setModalDeleteIsVisible(true);
        setContactBeingDeleted(contact);
    }

    function handleCancelModalButton(){
        setModalDeleteIsVisible(false);
    }

    async function handleDeleteContact(){
        try {
            setIsLoadingDeleteContact(true);

            await ContactsService.deleteContactById(contactBeingDeleted.id);

            setIsLoadingDeleteContact(false);

            setContacts(prevState => (
                prevState.filter(contact => contact.id !== contactBeingDeleted.id)
            ));
            
            setContactBeingDeleted(null);
            handleCancelModalButton();
            addToast({
                type: 'sucess',
                text: 'Contato deletado com sucesso'
            })
        } catch (error) {
            addToast({
                type: 'danger',
                text: 'Erro ao deletar o contato'
            })
        }
    }

    const hasContacts = !hasError && contacts.length > 0;

    return(
        <>
            <Modal
                title={`Tem certeza que deseja remover o contato ${contactBeingDeleted?.name}`}
                type='danger'
                visible={modalDeleteIsVisible}
                labelCancelButton="Cancelar"
                labelConfirmButton="Deletar"
                onClickCancel={handleCancelModalButton}
                onClickConfirm={handleDeleteContact}
                isLoading={isLoadingDeleteContact}
            >
                Essa ação não poderá ser desfeita
            </Modal>
            
            <Loader isLoading={isLoading} />  
            <section className={styles.contacts}>
            
               
                {hasContacts &&(
                    <input 
                        type="text"  
                        className={styles.search}
                        placeholder='Pesquise pelo nome...'
                        onChange={handleChangeSearchItem}
                    />
                ) }
               
                <div className={`${styles.headerContacts} ${hasError? styles.headerError : (contacts.length > 0 ? '' : styles.headerNoHasContacts)}`}>
                    {hasContacts && (
                        <strong>{filteredContacts.length === 1 ? `${filteredContacts.length} contato` : `${filteredContacts.length} contatos`}</strong>
                    )}
                    <Link to="/new">Novo Contato</Link>
                </div>   
                
                <hr className={styles.line}/>

                {(contacts.length < 1 && !hasError && !isLoading) && (
                    <div className={styles.containerEmptyBox}>
                        <img src={emptyBox} alt="Icon empty box" />
                        <p>Você ainda não tem nenhum contato cadastrado!
                        Clique no botão <strong>”Novo contato”</strong> acima para cadastrar 
                        o seu primeiro</p>
                    </div>
                )}

                {hasError && (
                    <div className={`${styles.containerHasError}`}>
                        <img src={sad} alt="Sad icon" />
                        <div>   
                            <strong>Ocorreu um erro ao obter os seus contatos!</strong>
                            <Button onClick={handleTryAgain}>Tentar novamente</Button>
                        </div>
                    </div>
                )}

                {hasContacts && (
                <div className="listBody">
                    <header className={styles.headerList}>
                        {filteredContacts.length > 0 && (
                            <button onClick={handleChangeOrderBy}>
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
                                category={contact.category_name}
                                onClickDeletedButton={() => handleOpenModalDeleteContact(contact)}
                            />
                        ))}
                    </div>
                </div>)}

                {(filteredContacts < 1 && !hasError && hasContacts) && (
                    <div className={styles.containerNoFilteredContacts}>
                        <img src={magnifierQuestion} alt="Icone magnifier question" />
                        <span>Nenhum resultado foi encontrado para <strong>”{searchItem}”</strong>.</span>
                    </div>
                )}
            </section>
        </>
    );
}

export default Home;