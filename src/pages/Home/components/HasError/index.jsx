import styles from './styles.module.css';
import sad from '../../../../assets/images/icons/sad.svg';
import Button from '../../../../components/Button';

function HasError({onTryAgain}){
    return (
        <div className={`${styles.containerHasError}`}>
            <img src={sad} alt="Sad icon" />
            <div>   
                <strong>Ocorreu um erro ao obter os seus contatos!</strong>
                <Button onClick={onTryAgain}>Tentar novamente</Button>
            </div>
        </div>
    );
}

export default HasError;