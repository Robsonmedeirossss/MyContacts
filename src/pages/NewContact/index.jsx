import FormHeader from "../../components/FormHeader";
import Form from "../../components/Form";
import addToast from "../../utils/addToast";

import ContactsService from "../../services/ContactsService";

function NewContact(){

    async function handleCreateContact(contact){
        
        try {
            await ContactsService.createContact(contact);

           addToast({type: 'sucess', text: 'O contato foi cadastrado com sucesso!', duration: 3500});

        } catch (error) {
            addToast({type: 'danger', text: 'Ocorreu um erro ao cadastrar o contato!', duration: 3500});
        }

    }

    return(
       <>
            <FormHeader title="Novo contato" />
            <Form buttonLabel="Cadastrar" onSubmit={handleCreateContact} formType="create"/>
       </>
    );
}

export default NewContact;