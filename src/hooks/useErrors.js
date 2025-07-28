import { useState } from "react";

function useErrors(){

    const [errors, setErrors] = useState([]);
    
    function addError({ field, error }){
        
        const errorAlreadyExist = errors.find(error => (
            error.field === field
        ))

        if (errorAlreadyExist) return;

        setErrors(prevState => (
            [...prevState, {field, error}]
        ))
    }

    function removeErrorByFieldName(fieldName){
        setErrors(prevState => (
            prevState.filter(error => (
                error.field !== fieldName
            ))
        ))
    }

    function getErrorMessageByFieldName(fieldName){
        return errors.find(error => (
            error.field === fieldName
        )).error
    }  

    return { 
        addError, 
        removeErrorByFieldName, 
        getErrorMessageByFieldName 
    }
}

export default useErrors;