import styles from './styles.module.css';

import magnifierQuestion from '../../assets/images/icons/magnifier-question.svg';

import Loader from '../../components/Loader';
import Modal from '../../components/Modal';
import SearchInput from './components/SearchInput';


import useHome from './useHome';
import HeaderContacts from './components/HeaderContacts';
import EmptyBox from './components/EmptyBox';
import HasError from './components/HasError';
import ListContacts from './components/ListContacts';
import EmptyFilteredContacts from './components/EmptyFilteredContacts.jsx';

function Home(){
  
    const {
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
        isFilteredContactEmpty,
        
    } = useHome();

    return(
        <>
            <Loader isLoading={isLoading} />  
            
            <section className={styles.contacts}>
            
                {hasContacts && <SearchInput onChangeSearchItem={handleChangeSearchItem} /> }

                <HeaderContacts 
                    hasContacts={hasContacts} 
                    qtyOfFilteredContacts={filteredContacts.length} 
                    hasError={hasError}
                />

                {isListEmpty && <EmptyBox />}

                {hasError && <HasError onTryAgain={handleTryAgain}/>}

                {hasContacts && (
                    <ListContacts 
                        filteredContacts={filteredContacts} 
                        onChangeOrderBy={handleChangeOrderBy} 
                        onOpenModalDeleteContact={handleOpenModalDeleteContact}
                        orderBy={orderBy}    
                    />
                )}

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

                {isFilteredContactEmpty && <EmptyFilteredContacts searchItem={searchItem}/> }

            </section>
        </>
    );
}

export default Home;