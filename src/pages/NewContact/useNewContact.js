import addToast from "../../utils/addToast";

import ContactsService from "../../services/ContactsService";

function useNewContact(){
    async function handleCreateContact(contact){
        
        try {
            await ContactsService.createContact(contact);

           addToast({type: 'sucess', text: 'O contato foi cadastrado com sucesso!', duration: 3500});

        } catch (error) {
            addToast({type: 'danger', text: 'Ocorreu um erro ao cadastrar o contato!', duration: 3500});
        }

    }

    return {
        handleCreateContact
    }
}

export default useNewContact;