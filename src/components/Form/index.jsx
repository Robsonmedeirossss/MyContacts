import { useState } from "react";

import Input from "../Input";
import Select from "../Select";
import Button from "../Button";

import isEmailValid from '../../utils/isEmailValid';
import isPhoneValid from "../../utils/isPhoneValid";

import styles from './styles.module.css';

function Form({buttonLabel}){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [category, setCategory] = useState('');
    const [errors, setErrors] = useState([]);

    function handleSubmit(event){
        event.preventDefault();

        if(errors.length){
            return alert('Erros');
        }
        console.log({name, email, phone, category})
    }

    function handleNameChange(event){
        setName(event.target.value);

        if(!event.target.value){
            setErrors(prevState => (
                [...prevState, { field: 'name', error: 'Nome é obrigatório' }]
            ))
        }else{
            setErrors(prevState => (
                prevState.filter(error => (
                    error.field !== 'name'
                ))
            ))
        }
    }

    function handleEmailChange(event){

        const newEmailValue = event.target.value;

        setEmail(newEmailValue);

        if(newEmailValue && !isEmailValid(newEmailValue)){
            const errorAlreadyExist = errors.find(error => (
                error.field === 'email'
            ));

            if(errorAlreadyExist){
                return;
            }

            setErrors(prevState => (
                [...prevState, { field: 'email', error: 'E-mail inválido' }]
            ))
        }else{
            setErrors(prevState => (
                prevState.filter(error => (
                    error.field !== 'email'
                ))
            ))
        }
    }

    function handlePhoneChange(event){

        const newPhoneValue = event.target.value;
        
        setPhone(newPhoneValue);

        if(newPhoneValue && !isPhoneValid(newPhoneValue)){
            const errorAlreadyExist = errors.find(error => (
                error.field === 'phone'
            ));

            if(errorAlreadyExist) return;

            setErrors(prevState => (
                [...prevState, { field: 'phone', error: 'Telefone inválido' }]
            ))
        }else{
            setErrors(prevState => (
                prevState.filter(error => (
                    error.field !== 'phone'
                ))
            ))
        }
    }

    function handleCategoryChange(event){
        setCategory(event.target.value);
        console.log(event.target.value);
    }

    function getErrorMessageByFieldMessage(fieldName){
        return errors.find(error => (
            error.field === fieldName
        ))?.error
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            {console.log(errors)}
            <Input 
                type="text" 
                placeholder="Nome"
                value={name} 
                onChange={handleNameChange}
                error={getErrorMessageByFieldMessage('name')}
            />
            <Input 
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
                error={getErrorMessageByFieldMessage('email')}
            />
            <Input
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={handlePhoneChange}
                error={getErrorMessageByFieldMessage('phone')}
            />
            <Select 
                placeholder="Nome" 
                value={category} 
                onChange={handleCategoryChange}
            />
            <Button>{buttonLabel}</Button>
        </form>
    )
}

export default Form;