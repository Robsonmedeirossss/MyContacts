import FormHeader from "../../components/FormHeader";
import Form from "../../components/Form";

import ContactsService from "../../services/ContactsService";

import { useEffect } from "react";

function EditContact(){
    
    useEffect(() => {
        async function getContactById(){
            const json = await ContactsService.getContact("6b202cd8-bd55-4d9a-a98b-2e8a52fecf12");
            console.log(json);
        }

        getContactById();
    }, []);

    return(
        <>
            <FormHeader title="Editar contato" />
            <Form buttonLabel="Editar" />
        </>
    );
}

export default EditContact;