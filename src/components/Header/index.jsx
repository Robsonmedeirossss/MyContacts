import logo from '../../assets/images/logo.svg';

import styles from './styles.module.css';

function Header(){
    return(
        <header className={styles.header}>
            <img src={logo} alt="MyContacts" />
        </header>
    );
}

export default Header;