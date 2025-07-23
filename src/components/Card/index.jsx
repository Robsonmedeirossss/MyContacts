import styles from './styles.module.css';

import edit from '../../assets/images/icons/edit.svg';
import trash from '../../assets/images/icons/trash.svg';

import { Link } from 'react-router-dom';

function Card(){
    return(
        <div className={styles.card}>
            <div className={styles.info}>
                <div className={styles.infoName}>
                    <strong>Robson Medeiros</strong>
                    <span>Instagram</span>
                </div>
                <span>robsonmedeiros125@gmail.com</span>
                <span>(85) 99718 8216</span>
            </div>
            <div className={styles.actions}>
                <Link to="/edit/123">
                    <img src={edit} alt="edit icon" />
                </Link>
                <button>
                    <img src={trash} alt="trash icon" />
                </button>
            </div>
        </div>
    );
}

export default Card;