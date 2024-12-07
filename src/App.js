import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/store';
import MainPage from './MainPage';
import WelcomePage from './WelcomePage';
import PrivateRoute from './components/PrivateRoute';
import RegisterForm from './components/RegisterForm';

function App() {
    return (
        <Provider store={store}> {/* Оборачиваем приложение в Provider */}
            <Router>
                <Routes>
                    <Route path="/" element={<WelcomePage />} />
                    <Route path='/register' element = {<RegisterForm/>} />
                    <Route path="/main" element={
                        <PrivateRoute>
                            <MainPage />
                        </PrivateRoute>
                    } />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
