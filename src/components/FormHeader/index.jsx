import arrow from '../../assets/images/icons/arrow.svg';

import styles from './styles.module.css';

import { Link } from 'react-router-dom';

function FormHeader({title}){
    return(
        <header className={styles.header}>
            <Link to="/">
                <img src={arrow} alt="arrow back" />
                <span>Voltar</span>
            </Link>
            <h2>{title}</h2>
        </header>
    );
}

export default FormHeader;