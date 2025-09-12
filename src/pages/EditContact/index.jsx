import FormHeader from "../../components/FormHeader";
import Form from "../../components/ContactForm";


import Loader from "../../components/Loader";
import useEditContact from "./useEditContacts";

function EditContact(){
   
    const { isLoading, contact, handleSubmit } = useEditContact();

    return(
        <>
            <Loader isLoading={isLoading}/>
            <FormHeader title={isLoading? 'Carregando...' : `Editar ${contact.name}`} />
            <Form buttonLabel="Editar" contact={contact} onSubmit={handleSubmit} formType="edit"/>
        </>
    );
}

export default EditContact;