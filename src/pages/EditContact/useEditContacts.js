import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import ContactsService from "../../services/ContactsService";
import addToast from "../../utils/addToast";
import useIsMounted from "../../hooks/useIsMounted";


function useEditContact(){
    const [contact, setContact] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const isMounted = useIsMounted();

    const { id } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        async function loadContact(){
            try {
                
                const contact = await ContactsService.getContactById(id);

                if(isMounted()){
                    setContact(contact);
                    setIsLoading(false);
                }

            } catch {
                if(isMounted()){
                    navigate('/');
                    addToast({
                        type: 'danger',
                        text: 'Contato não encontrado'
                    });
                }
            }
        }

        loadContact();
    }, []);

    async function handleSubmit(contact){

        try {
            const contactUpdated = await ContactsService.updateContactById(contact, id);
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

    return {
        isLoading,
        contact,
        handleSubmit,
    }
}

export default useEditContact;