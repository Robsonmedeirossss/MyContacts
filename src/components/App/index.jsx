import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';
import Routes from '../../Routes';
import ToastContainer from '../Toasts/ToastContainer';

import styles from './styles.module.css';

import '../../lib/EventManager';

function App(){
    return(
        <>
            <ToastContainer />
            <BrowserRouter>
                <main className={styles.container}>
                    <Header />
                    <Routes />
                </main>
            </BrowserRouter>
        </>
    );
}

export default App;