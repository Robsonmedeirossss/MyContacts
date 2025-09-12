import { useState, useEffect, useMemo, useCallback } from 'react';

import ContactsService from '../../services/ContactsService';
import addToast from '../../utils/addToast';

function useHome(){
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
                const contacts = await ContactsService.listContacts(orderBy);
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
    const isListEmpty = contacts.length < 1 && !hasError && !isLoading;

    return {    
        contactBeingDeleted,
        modalDeleteIsVisible,
        handleCancelModalButton,
        handleDeleteContact,
        isLoadingDeleteContact,
        isLoading,
        hasError,
        filteredContacts,
        handleChangeOrderBy,
        orderBy,
        handleOpenModalDeleteContact,
        hasContacts,
        contacts,
        handleChangeSearchItem,
        handleTryAgain,
        searchItem,
        isListEmpty,

    }
}

export default useHome;