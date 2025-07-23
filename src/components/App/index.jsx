import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';
import Routes from '../../Routes';

import styles from './styles.module.css';

function App(){
    return(
        <BrowserRouter>
            <main className={styles.container}>
                <Header />
                <Routes />
            </main>
        </BrowserRouter>
    );
}

export default App;