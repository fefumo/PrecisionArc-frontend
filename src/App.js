import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './services/store';
import WelcomePage from './components/WelcomePage';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Main from './Main';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/welcomepage" replace />} />
                    <Route path="/welcomepage" element={<WelcomePage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path='/mainpage' element={<Main />} />
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
