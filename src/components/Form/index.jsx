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
        setEmail(event.target.value);

        if(event.target.value && !isEmailValid(email)){
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
        setPhone(event.target.value);

        if(event.target.value && !isPhoneValid(phone)){
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

    return(
        <form className={styles.form}>
            {console.log(errors)}
            <Input 
                type="text" 
                placeholder="Nome"
                value={name} 
                onChange={handleNameChange}
            />
            <Input 
                type="text"
                placeholder="Email"
                value={email}
                onChange={handleEmailChange}
            />
            <Input
                type="text"
                placeholder="Telefone"
                value={phone}
                onChange={handlePhoneChange}
            />
            <Select placeholder="Nome"/>
            <Button>{buttonLabel}</Button>
        </form>
    )
}

export default Form;