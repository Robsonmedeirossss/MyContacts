import { useState, useEffect } from "react";

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";
import useSafeAsyncState from "../../hooks/useSafeAsyncState";
import useIsMounted from "../../hooks/useIsMounted";
   

function useContactForm(onSubmit, contact, formType){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [categoryId, setCategory] = useState('');
    const [categoriesList, setCategoriesList] = useSafeAsyncState([]);
    const [isLoadingCategories, setIsLoadingCategories] = useSafeAsyncState(true);
    const [isSubmiting, setIsSubmiting] = useState(false);
    const isMounted = useIsMounted();

    useEffect(() => {
        if(contact.id){
            setName(contact.name || '');
            setEmail(contact.email || '');
            setPhone(formatPhone(contact.phone) || '');
            setCategory(contact.category.id || '');
        }
    }, [contact]);

    const { errors, addError, removeErrorByFieldName, getErrorMessageByFieldName } = useErrors();


    function handleNameChange(event){
        setName(event.target.value);

        if(!event.target.value){
            addError({field: 'name', error: 'Nome é obrigatório'})
        }else{
            removeErrorByFieldName('name');
        }
    }

    function handleEmailChange(event){

        const newEmailValue = event.target.value;

        setEmail(newEmailValue);

        if(newEmailValue && !isEmailValid(newEmailValue)){
            addError({field: 'email', error: 'Digite um email válido'})
        }else{
            removeErrorByFieldName('email');
        }
    }

    function handlePhoneChange(event){
        setPhone(formatPhone(event.target.value));
    }

    function handleCategoryChange(event){
        setCategory(event.target.value);
    }

    async function loadCategories(){
        setIsLoadingCategories(true);
        try {
            const categories = await CategoriesService.getCategories();
            
            if(isMounted()){
                setCategoriesList(categories);
            }
        } catch{

        }finally{
            if(isMounted){
                setIsLoadingCategories(false);
            }
        }
    }

        async function handleSubmit(event){
            event.preventDefault();

            setIsSubmiting(true);

            await onSubmit({name, email, phone, categoryId});

            setIsSubmiting(false);

            if(formType === "create"){
                setName('');
                setEmail('');
                setPhone('');
                setCategory('');
            }
        }

    useEffect(() => {
        loadCategories();
    }, [])

    const isFormValid = Boolean((name && errors.length === 0));

    return {
        handleSubmit,
        handleNameChange,
        isSubmiting,
        name,
        email,
        handleEmailChange,
        phone,
        handlePhoneChange,
        categoryId,
        handleCategoryChange,
        isLoadingCategories,
        categoriesList,
        isFormValid,
        getErrorMessageByFieldName,
    }
}

export default useContactForm;