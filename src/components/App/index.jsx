import { BrowserRouter } from 'react-router-dom';

import Header from '../Header';
import AppRoutes from '../../Routes';
import ToastContainer from '../Toasts/ToastContainer';

import styles from './styles.module.css';


function App(){
    return(
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <ToastContainer />
            <main className={styles.container}>
                <Header />
                <AppRoutes />
            </main>
        </BrowserRouter>
    );
}

export default App;