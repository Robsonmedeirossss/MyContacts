import Input from "../Input";
import Button from "../Button";

import useContactForm from "./useContactForm";

import styles from './styles.module.css';
import Spinner from "../Spinner";



function Form({buttonLabel, onSubmit, contact = {}, formType}){

    const { 
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
     } = useContactForm(onSubmit, contact, formType)


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
                <Spinner isLoading={isLoadingCategories} isLarge={false} />
            </div>

            <Button disabled={!isFormValid || isSubmiting} isLoading={isSubmiting}>{buttonLabel}</Button>

        </form>
    )
}

export default Form;