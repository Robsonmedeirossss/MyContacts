import FormHeader from "../../components/FormHeader";
import Form from "../../components/ContactForm";
import useNewContact from "./useNewContact";

function NewContact(){

    const { handleCreateContact } = useNewContact();

    return(
       <>
            <FormHeader title="Novo contato" />
            <Form buttonLabel="Cadastrar" onSubmit={handleCreateContact} formType="create"/>
       </>
    );
}

export default NewContact;