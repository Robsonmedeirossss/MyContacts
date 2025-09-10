import { useState, useEffect } from "react";

import Input from "../Input";
import Button from "../Button";
import Spinner from "../Spinner";

import isEmailValid from '../../utils/isEmailValid';
import formatPhone from "../../utils/formatPhone";
import useErrors from "../../hooks/useErrors";
import CategoriesService from "../../services/CategoriesService";

import styles from './styles.module.css';
import useSafeAsyncState from "../../hooks/useSafeAsyncState";
import useIsMounted from "../../hooks/useIsMounted";


function Form({buttonLabel, onSubmit, contact = {}, formType}){

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
            setCategory(contact.category_id || '');
        }
    }, [contact]);

    const { errors, addError, removeErrorByFieldName, getErrorMessageByFieldName } = useErrors();

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
            const { categories } = await CategoriesService.getCategories();
            
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

    useEffect(() => {
        loadCategories();
    }, [])

    const isFormValid = Boolean((name && errors.length === 0));

    return(
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
            <Input 
                type="text" 
                placeholder="Nome*"
                value={name} 
                onChange={handleNameChange}
                error={getErrorMessageByFieldName('name')}
                disabled={isSubmiting}
            />
            <Input 
                type="email"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                error={getErrorMessageByFieldName('email')}
                disabled={isSubmiting}
            />
            <Input
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={handlePhoneChange}
                max="15"
                disabled={isSubmiting}
            />
            <div className={styles.containerSelect}>
                <select value={categoryId} onChange={handleCategoryChange} disabled={isLoadingCategories || isSubmiting}>
                    <option value="">Sem categoria</option>
                    {categoriesList.map(categoryObject => (
                        <option
                            key={categoryObject.id}
                            value={categoryObject.id}
                        >
                        {categoryObject.name}
                        </option>
                    ))}
                </select>
            </div>

            <Button disabled={!isFormValid || isSubmiting} isLoading={isSubmiting}>{buttonLabel}</Button>

        </form>
    )
}

export default Form;