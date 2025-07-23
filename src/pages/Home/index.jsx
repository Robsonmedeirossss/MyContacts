import { Link } from 'react-router-dom';

import styles from './styles.module.css';

import arrow from '../../assets/images/icons/arrow.svg';
import Card from '../../components/Card';

function Home(){
    return(
        <>
            <section className={styles.contacts}>
                <input 
                    type="text"  
                    className={styles.search}
                    placeholder='Pesquise pelo nome...'
                />
                <div className={styles.headerContacts}>
                    <strong>3 contatos</strong>
                    <Link to="/new">Novo Contato</Link>
                </div>   
                <hr className={styles.line}/>
                <div className="listBody">
                    <header className={styles.headerList}>
                        <button>
                            <span>Nome</span>
                            <img src={arrow} alt="arrow up" />
                        </button>
                    </header>
                    <div className={styles.containerCards}>
                        <Card />
                        <Card />
                        <Card />
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;