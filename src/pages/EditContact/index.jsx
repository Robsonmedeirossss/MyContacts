import { useEffect, useState } from "react";
import FormHeader from "../../components/FormHeader";
import Form from "../../components/Form";

import { useParams, useHistory } from "react-router-dom";

import ContactsService from "../../services/ContactsService";
import addToast from "../../utils/addToast";
import Loader from "../../components/Loader";
import useIsMounted from "../../hooks/useIsMounted";

function EditContact(){

    const [contact, setContact] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useIsMounted();

    const { id } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function loadContact(){
            try {
                
                const { contact } = await ContactsService.getContactById(id);

                if(isMounted()){
                    setContact(contact);
                    setIsLoading(false);
                }

            } catch {
                if(isMounted()){
                    history.push('/');
                    addToast({
                        type: 'danger',
                        text: 'Contato não encontrado'
                    })
                }
             }
        }

        loadContact();
    }, []);

    async function handleSubmit({name, phone, email, categoryId}){
        const newDataUser = {
            name,
            phone, 
            email,
            category_id: categoryId
        }

        console.log(newDataUser)

        try {
            const { contactUpdated } = await ContactsService.updateContactById(newDataUser, id);
            setContact(contactUpdated);
            
            addToast({
                type: 'sucess',
                text: 'Contato editado com sucesso!'
            })

        } catch (error) {
            addToast({
                type: 'danger',
                text: 'Contato não encontrado!'
            })
        }
    }

    return(
        <>
            <Loader isLoading={isLoading}/>
            <FormHeader title={isLoading? 'Carregando...' : `Editar ${contact.name}`} />
            <Form buttonLabel="Editar" contact={contact} onSubmit={handleSubmit} formType="edit"/>
        </>
    );
}

export default EditContact;