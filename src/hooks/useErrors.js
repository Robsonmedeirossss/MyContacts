import { useState } from "react";

function useErrors(){

    const [errors, setErrors] = useState([]);
    
    function setError({ field, error }){
        
        const errorAlreadyExist = errors.find(error => (
            error.field === fieldName
        ))

        if (errorAlreadyExist) return;

        setErrors(prevState => (
            [...prevState, {field, error}]
        ))
    }

    function removeErrorByFieldName(fieldName){

    }

    function getErrorMessageByFieldName(fieldName){

    }  

    return { 
        setError, 
        removeErrorByFieldName, 
        getErrorMessageByFieldName 
    }
}

export default useErrors;