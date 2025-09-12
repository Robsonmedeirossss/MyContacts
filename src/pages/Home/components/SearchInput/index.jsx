import styles from './styles.module.css';

function SearchInput({ onChangeSearchItem }){
    return(
        <input 
            type="text"  
            className={styles.search}
            placeholder='Pesquise pelo nome...'
            onChange={onChangeSearchItem}
        />
    )
}

export default SearchInput;