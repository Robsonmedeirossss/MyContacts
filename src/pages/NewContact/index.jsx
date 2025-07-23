import FormHeader from "../../components/FormHeader";
import Form from "../../components/Form";

function NewContact(){
    return(
       <>
            <FormHeader title="Novo contato" />
            <Form buttonLabel="Cadastrar"/>
       </>
    );
}

export default NewContact;